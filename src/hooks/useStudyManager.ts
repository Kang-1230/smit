import { useEffect, useState } from "react";
import { Tables } from "../../database.types";
import browserClient from "@/utils/supabase/client";
import { usePublicUser } from "./useUserProfile";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getTime, getToday, timeStringToSeconds } from "@/utils/getTime";
import { useTimerState, useTodayCalendar } from "./useTimerQuery";
import { fetchAttendanceRate } from "@/utils/supabase/supabase-client";
import { calculateScore } from "@/utils/calculateScore";

// 끝점 좌표 구하는 함수
const getEndpointPosition = (percent: number) => {
  const radian = -(percent / 100) * 360 * (Math.PI / 180);
  return {
    x: 60 + 57 * Math.cos(radian),
    y: 60 + 57 * Math.sin(radian),
  };
};

export const useStudyManager = (
  studyId: string,
  member: Tables<"user">[] | null,
  study: Tables<"study"> | null,
) => {
  const queryClient = useQueryClient();

  // 현재 시간에 해당하는 스케쥴
  const [currentSchedule, setCurrentSchedule] =
    useState<Tables<"calendar"> | null>(null);
  // 현재 시간이 스케쥴 안에 있는지 반환
  const [isWithinTimeRange, setIsWithinTimeRange] = useState(false);
  // 총 경과 시간
  const [time, setTime] = useState(0);
  // 이번 스터디에 받은 점수
  const [studyScore, setStudyScore] = useState(0);
  // 스터디 종료 모달
  const [endModalOpen, setEndModalOpen] = useState(false);

  const [timeRate, setTimeRate] = useState(0);

  // 유저 정보 불러오기
  const { data: user = null } = usePublicUser();

  // 오늘 날짜 계산
  const today = getToday(new Date());
  // 오늘 스케쥴 있는지 없는지
  const { data: todaySchedules = [] } = useTodayCalendar(studyId, today);
  // 스케쥴이 있으면 타이머 가져오기
  const { data: timerState = null } = useTimerState(
    user?.id,
    currentSchedule,
    studyId,
    today,
  );

  // 타이머 관련 함수들
  const checkTimeRange = (schedule: Tables<"calendar">) => {
    if (!schedule) return false;
    const now = getTime(new Date());
    return schedule.start_time <= now && now < schedule.end_time;
  };

  // 경과시간 계산 함수
  const calculateElapsedTime = (
    lastStartTime: string | null,
    accumulatedTime: number,
  ) => {
    if (!lastStartTime) return accumulatedTime;
    const start = Date.parse(lastStartTime);
    const now = Date.now();
    return accumulatedTime + Math.floor((now - start) / 1000);
  };

  // 시간 달성률 그래프 계산
  const circumference = 2 * Math.PI * 57;
  const strokeDashoffset =
    circumference - (timeRate ? timeRate / 100 : 0) * -circumference;
  const endPoint = getEndpointPosition(timeRate ? timeRate : 0);

  // 타이머 상태 갱신하는 뮤테이션
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

  // 개인의 순공시간 더하는 뮤테이션
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

  // 출석 인원 쿼리
  const { data: attendee = null } = useQuery({
    queryKey: ["attendeeList", studyId, today],
    queryFn: () => fetchAttendanceRate(studyId, today),
  });

  // 달성자 리스트 쿼리
  const { data: achieverList = null, refetch: refetchAchievers } = useQuery<
    Tables<"timer">[] | null
  >({
    queryKey: ["achievers", studyId, currentSchedule?.calendar_id],
    queryFn: async () => {
      const { data } = await browserClient
        .from("timer")
        .select("*")
        .eq("calendar_id", currentSchedule?.calendar_id)
        .gte("time_rate", 80);
      return data;
    },
  });

  // 재생
  const handleStart = () => {
    if (!timerState) return;
    timerMutation.mutate({
      action: "start",
      currentTimer: timerState,
    });
  };

  // 일시정지
  const handlePause = () => {
    if (!timerState || !currentSchedule) return;

    const elapsedSinceStart = calculateElapsedTime(timerState.last_start, 0);
    const newAccumulatedTime = timerState.accumulated_time + elapsedSinceStart;

    timerMutation.mutate({
      action: "pause",
      currentTimer: timerState,
      newAccumulatedTime,
      timeRate,
    });

    userTimeMutation.mutate(elapsedSinceStart);
  };

  // 일정 종료
  const handleScheduleEnd = async (schedule: Tables<"calendar">) => {
    try {
      const { data: achievers = null, error } = await refetchAchievers();
      if (error) {
        console.error("Achiever refetch error:", error);
        return;
      }

      // 달성자 리스트 최신으로 갱신하고 점수 계산
      if (member) {
        const score = calculateScore(member.length, achievers, {
          start_time: schedule.start_time,
          end_time: schedule.end_time,
        });
        setStudyScore(score);

        // 달성 점수로 랭킹 점수 업데이트
        if (score > 0 && study) {
          await browserClient
            .from("study")
            .update({ study_score: study?.study_score + score })
            .eq("study_id", studyId);
        }
      }
    } catch (error) {
      console.error("Error updating study score:", error);
    }
  };
  // 현재 일정 찾기 및 초기화
  useEffect(() => {
    const initializeTimer = () => {
      const current = todaySchedules.find(
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

    // 1분마다 초기화 진행해서 현재 일정 찾기
    initializeTimer();
    const interval = setInterval(initializeTimer, 60000);
    return () => clearInterval(interval);
  }, [todaySchedules, timerState]);

  // 타이머 종료 시간 체크
  useEffect(() => {
    if (!currentSchedule) return;

    // 스케줄 종료 시간 체크
    const scheduleEndCheck = setInterval(async () => {
      const now = getTime(new Date());

      // 현재 시간이 스케줄 종료 시간을 지났는지 체크
      if (now >= currentSchedule.end_time) {
        // 1. 타이머가 실행 중이었다면 정지
        if (timerState?.is_running) {
          handlePause();
        }

        // 2. 스케줄 종료 처리 및 점수 계산
        await handleScheduleEnd(currentSchedule);

        // 3. 상태 초기화
        setCurrentSchedule(null);
        setIsWithinTimeRange(false);
        setTime(0);
        setEndModalOpen(true);

        clearInterval(scheduleEndCheck);
      }
    }, 1000);

    return () => clearInterval(scheduleEndCheck);
  }, [currentSchedule]);

  // 타이머 실행 중일 때 경과시간 계산하기
  useEffect(() => {
    if (!isWithinTimeRange || !currentSchedule || !timerState?.is_running)
      return;

    let timerId: NodeJS.Timeout;

    const tick = () => {
      const totalElapsed = calculateElapsedTime(
        timerState.last_start,
        timerState.accumulated_time,
      );
      setTime(totalElapsed);

      // 다음 호출 시간 계산
      const drift = Date.now() % 1000;
      timerId = setTimeout(tick, 1000 - drift);
    };

    tick();

    return () => clearTimeout(timerId);
  }, [timerState?.is_running, currentSchedule, isWithinTimeRange]);

  // 실시간으로 공부 달성률 구하는 부분
  useEffect(() => {
    if (!timerState || !currentSchedule) return;

    const rateInterval = setInterval(() => {
      const timeRate = Math.floor(
        (time /
          (timeStringToSeconds(currentSchedule.end_time) -
            timeStringToSeconds(currentSchedule.start_time))) *
          100,
      );
      setTimeRate(timeRate);
    }, 60000);

    return () => clearInterval(rateInterval);
  }, [time, timerState, currentSchedule]);

  return {
    // 타이머 관련
    time,
    isRunning: timerState?.is_running,
    isWithinTimeRange,
    handleStart,
    handlePause,

    // 상태 관련
    timeRate,
    currentSchedule,
    todaySchedules,
    strokeDashoffset,
    endPoint,
    circumference,
    attendee,
    achieverList,
    timerState,
    studyScore,
    endModalOpen,
    setEndModalOpen,
  };
};
