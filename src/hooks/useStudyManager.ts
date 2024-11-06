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

export const useStudyManager = (studyId: string, member: string[] | null) => {
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
    circumference -
    (timerState?.time_rate ? timerState.time_rate / 100 : 0) * -circumference;
  const endPoint = getEndpointPosition(
    timerState?.time_rate ? timerState.time_rate : 0,
  );

  // 뮤테이션들
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
  const { data: achieverList = null } = useQuery<Tables<"timer">[] | null>({
    queryKey: ["achievers", studyId, currentSchedule?.calendar_id],
    queryFn: async () => {
      const { data } = await browserClient
        .from("timer")
        .select("*")
        .eq("calendar_id", currentSchedule?.calendar_id)
        .gte("time_rate", 80);
      return data;
    },
    enabled: !!currentSchedule,
  });

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

  const handleScheduleEnd = async (schedule: Tables<"calendar">) => {
    try {
      // 1. 달성자 목록 새로 가져오기
      await queryClient.invalidateQueries({
        queryKey: ["achievers", studyId, schedule.calendar_id],
      });

      // 2. 새로운 달성자 목록으로 점수 계산
      if (member) {
        const score = calculateScore(member.length, achieverList, {
          start_time: schedule.start_time,
          end_time: schedule.end_time,
        });
        setStudyScore(score);

        // 3. 계산된 점수로 DB 업데이트
        if (score > 0) {
          await browserClient
            .from("study")
            .update({ study_score: score })
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

  // 타이머 실행 중일 때
  useEffect(() => {
    if (!isWithinTimeRange || !currentSchedule || !timerState?.is_running)
      return;

    const timerInterval = setInterval(() => {
      const totalElapsed = calculateElapsedTime(
        timerState.last_start,
        timerState.accumulated_time,
      );
      setTime(totalElapsed);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timerState?.is_running, currentSchedule, isWithinTimeRange]);

  return {
    // 타이머 관련
    time,
    isRunning: timerState?.is_running,
    isWithinTimeRange,
    handleStart,
    handlePause,

    // 상태 관련
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