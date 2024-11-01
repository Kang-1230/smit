import { useEffect, useState } from "react";
import { Tables } from "../../database.types";
import browserClient from "@/utils/supabase/client";
import { usePublicUser } from "./useUserProfile";
import { useQueryClient } from "@tanstack/react-query";

const getTime = (date: Date) => {
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  return hours + ":" + minutes + ":" + seconds;
};

export const useStudyTimer = (studyId: string, userId: string | undefined) => {
  const [currentSchedule, setCurrentSchedule] =
    useState<Tables<"calendar"> | null>(null);
  const [timerState, setTimerState] = useState<Tables<"timer"> | null>(null);
  const [isWithinTimeRange, setIsWithinTimeRange] = useState(false);
  const [time, setTime] = useState(0);
  const today = new Date().toISOString().split("T")[0];
  const { data: user = null } = usePublicUser();
  const queryClient = useQueryClient();

  // 오늘의 스터디 일정 조회
  const fetchTodaySchedule = async () => {
    const { data: schedule } = await browserClient
      .from("calendar")
      .select("*")
      .eq("study_id", studyId)
      .eq("event_date", today)
      .single();
    if (schedule) {
      setCurrentSchedule(schedule);
      return schedule;
    } else {
      return null;
    }
  };

  // timer 상태 세팅
  const fetchTimerState = async () => {
    if (userId) {
      const { data: timer } = await browserClient
        .from("timer")
        .select("*")
        .eq("study_id", studyId)
        .eq("user_id", userId)
        .eq("date", today)
        .single();
      // 정보가 있으면 타이머 넣고
      if (timer) {
        setTimerState(timer);
        return timer;
        // 없으면 새로 만들어서 넣기
      } else {
        const { data: newTimer }: { data: Tables<"timer"> | null } =
          await browserClient
            .from("timer")
            .insert({
              study_id: studyId,
              user_id: userId,
              accumulated_time: 0,
              is_running: false,
              date: today,
            })
            .select()
            .single();
        setTimerState(newTimer);
        return newTimer;
      }
    }
    return null;
  };

  // 시간 범위 체크 함수
  const checkTimeRange = (schedule: Tables<"calendar">) => {
    if (!schedule) return false;

    // 현재 시간을 hh:mm:ss 형태로 구하는 함수
    const now = getTime(new Date());

    // 시작시간, 종료시간 사이인지 비교
    return schedule.start_time <= now && now < schedule.end_time;
  };

  // 경과 시간을 계산하는 함수
  const calculateElapsedTime = (
    lastStartTime: string | null,
    accumulatedTime: number,
  ) => {
    if (!lastStartTime) return accumulatedTime;

    // UTC 시간을 기준으로 시간차 계산
    const start = Date.parse(lastStartTime);
    const now = Date.now();
    return accumulatedTime + Math.floor((now - start) / 1000);
  };

  // 초기화 및 실시간 업데이트
  useEffect(() => {
    // 타이머 초기화
    const initializeTimer = async () => {
      const schedule = await fetchTodaySchedule();
      // 오늘 스터디 일정이 없으면 아무것도 실행되지 않음
      if (!schedule) return;

      // DB에서 timer 정보 가져오기
      const timer = await fetchTimerState();

      // 지금이 스터디 시간인지 확인 후 상태에 저장
      const isValid = checkTimeRange(schedule);
      setIsWithinTimeRange(isValid);

      // 타이머 정보가 있으면 타이머 세팅
      if (timer) {
        // 실행 중이 아닐 때만 elapsed time 계산
        if (!timer.is_running) {
          setTime(timer.accumulated_time);
        }
        setTimerState(timer);
      }
    };

    initializeTimer();

    // 실시간 구독 설정
    const subscription = browserClient
      .channel(`timer_${studyId}_${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "timer",
          filter: `study_id=eq.${studyId} AND user_id=eq.${userId} AND date=eq.${today}`,
        },
        (payload) => {
          if (payload.new) {
            const newTimer = payload.new as Tables<"timer">;
            setTimerState(newTimer);
          }
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [studyId, userId]);

  // 타이머 시작, 정지 할 때 시간 올라가도록
  useEffect(() => {
    if (!isWithinTimeRange || !currentSchedule) return;

    if (!timerState?.is_running) return;

    const timeCheckInterval = setInterval(() => {
      const isValid = checkTimeRange(currentSchedule);
      setIsWithinTimeRange(isValid);
      if (!isValid) {
        updateTimerState("pause");
      }
    }, 1000);

    const timerInterval = setInterval(() => {
      const totalElapsed = calculateElapsedTime(
        timerState.last_start,
        timerState.accumulated_time,
      );
      setTime(totalElapsed);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(timeCheckInterval);
    };
  }, [timerState?.is_running, currentSchedule]);

  // 타이머 상태 업데이트
  const updateTimerState = async (action: "start" | "pause") => {
    const now = new Date().toISOString();
    if (!currentSchedule || !timerState) return;

    if (action === "start") {
      await browserClient.from("timer").upsert({
        ...timerState,
        is_running: true,
        last_start: now,
      });
      setTimerState({ ...timerState, is_running: true, last_start: now });
      return;
    } else if (action === "pause") {
      // 현재까지 경과 시간을 계산
      const elapsedSinceStart = calculateElapsedTime(timerState.last_start, 0);

      // 최종 누적 시간을 업데이트
      const newAccumulatedTime =
        timerState.accumulated_time + elapsedSinceStart;

      await browserClient.from("timer").upsert({
        ...timerState,
        is_running: false,
        last_start: null,
        accumulated_time: newAccumulatedTime,
        last_paused: now,
      });

      setTimerState({
        ...timerState,
        is_running: false,
        last_start: null,
        accumulated_time: newAccumulatedTime,
        last_paused: now,
      });
      if (user) {
        await browserClient.from("user").upsert({
          ...user,
          study_time: user.study_time + elapsedSinceStart,
        });
        queryClient.invalidateQueries({ queryKey: ["user", "public"] });
      }
      return;
    }
  };

  const handleStart = () => updateTimerState("start");
  const handlePause = () => updateTimerState("pause");

  return {
    time,
    isRunning: timerState?.is_running,
    isWithinTimeRange,
    currentSchedule,
    handleStart,
    handlePause,
  };
};
