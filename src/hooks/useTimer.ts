import { useEffect, useState } from "react";
import { Tables } from "../../database.types";
import browserClient from "@/utils/supabase/client";
import { usePublicUser } from "./useUserProfile";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { getTime, getToday, timeStringToSeconds } from "@/utils/getTime";
import { useTimerState, useTodayCalendar } from "./useTimerQuery";

export const useStudyTimer = (studyId: string) => {
  const [currentSchedule, setCurrentSchedule] =
    useState<Tables<"calendar"> | null>(null);
  const [isWithinTimeRange, setIsWithinTimeRange] = useState(false);
  const [time, setTime] = useState(0);
  const { data: user = null } = usePublicUser();
  const queryClient = useQueryClient();
  const today = getToday(new Date());

  // 오늘의 스터디 일정 조회 쿼리
  const { data: schedules = [] } = useTodayCalendar(studyId, today);

  // 타이머 상태 조회 쿼리
  const { data: timerState } = useTimerState(
    user?.id,
    currentSchedule,
    studyId,
    today,
  );

  // 타이머 업데이트 뮤테이션
  const timerMutation = useMutation({
    mutationFn: async ({
      action,
      currentTimer,
      newAccumulatedTime,
      timeRate,
    }: {
      action: "start" | "pause";
      currentTimer: Tables<"timer">;
      newAccumulatedTime?: number;
      timeRate?: number;
    }) => {
      const now = new Date().toISOString();

      if (action === "start") {
        return browserClient.from("timer").upsert({
          ...currentTimer,
          is_running: true,
          last_start: now,
        });
      } else {
        return browserClient.from("timer").upsert({
          ...currentTimer,
          is_running: false,
          last_start: null,
          accumulated_time: newAccumulatedTime,
          last_paused: now,
          time_rate: timeRate,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timer", studyId, user?.id] });
    },
  });

  // 유저 스터디 시간 업데이트 뮤테이션
  const userTimeMutation = useMutation({
    mutationFn: async (elapsedTime: number) => {
      if (!user) return;
      return browserClient.from("user").upsert({
        ...user,
        study_time: user.study_time + elapsedTime,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "public"] });
    },
  });

  // 시간 범위 체크 함수
  const checkTimeRange = (schedule: Tables<"calendar">) => {
    if (!schedule) return false;
    const now = getTime(new Date());
    return schedule.start_time <= now && now < schedule.end_time;
  };

  // 경과 시간 계산 함수
  const calculateElapsedTime = (
    lastStartTime: string | null,
    accumulatedTime: number,
  ) => {
    if (!lastStartTime) return accumulatedTime;
    const start = Date.parse(lastStartTime);
    const now = Date.now();
    return accumulatedTime + Math.floor((now - start) / 1000);
  };

  // 현재 일정 찾기 및 초기화
  useEffect(() => {
    const initializeTimer = () => {
      const current = schedules.find(
        (schedule) =>
          schedule.start_time <= getTime(new Date()) &&
          getTime(new Date()) < schedule.end_time,
      );

      if (current) {
        setCurrentSchedule(current);
        const isValid = checkTimeRange(current);
        setIsWithinTimeRange(isValid);

        if (timerState && !timerState.is_running) {
          setTime(timerState.accumulated_time);
        }
      } else {
        setCurrentSchedule(null);
        setTime(0);
        setIsWithinTimeRange(false);
      }
    };

    initializeTimer();
    const interval = setInterval(initializeTimer, 60000);
    return () => clearInterval(interval);
  }, [schedules, timerState]);

  // 타이머 실행 로직
  useEffect(() => {
    if (!isWithinTimeRange || !currentSchedule || !timerState?.is_running)
      return;

    const timeCheckInterval = setInterval(() => {
      const isValid = checkTimeRange(currentSchedule);
      setIsWithinTimeRange(isValid);
      if (!isValid) {
        handlePause();
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

  const handleStart = () => {
    if (!timerState) return;
    timerMutation.mutate({
      action: "start",
      currentTimer: timerState,
    });
  };

  const handlePause = () => {
    if (!timerState || !currentSchedule) return;

    const elapsedSinceStart = calculateElapsedTime(timerState.last_start, 0);
    const newAccumulatedTime = timerState.accumulated_time + elapsedSinceStart;
    const timeRate = Math.floor(
      (timerState.accumulated_time /
        (timeStringToSeconds(currentSchedule.end_time) -
          timeStringToSeconds(currentSchedule.start_time))) *
        100,
    );

    timerMutation.mutate({
      action: "pause",
      currentTimer: timerState,
      newAccumulatedTime,
      timeRate,
    });

    userTimeMutation.mutate(elapsedSinceStart);
  };

  return {
    schedules,
    time,
    isRunning: timerState?.is_running,
    isWithinTimeRange,
    currentSchedule,
    handleStart,
    handlePause,
  };
};
