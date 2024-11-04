import { useQuery } from "@tanstack/react-query";
import { Tables } from "../../database.types";
import { fetchTimer } from "@/utils/supabase/supabase-client";
import browserClient from "@/utils/supabase/client";

// 해당 일정에 대한 유저의 타이머 가져오기
export const useTimerState = (
  userId: string | undefined,
  currentSchedule: Tables<"calendar"> | null,
  studyId: string,
  today: string,
) => {
  return useQuery<Tables<"timer">>({
    queryKey: ["timer", studyId, userId, currentSchedule?.calendar_id],
    queryFn: () => fetchTimer(userId, currentSchedule, studyId, today),
    enabled: !!userId && !!currentSchedule,
  });
};

// 오늘 있는 일정 모두 불러오기
export const useTodayCalendar = (studyId: string, today: string) => {
  return useQuery<Tables<"calendar">[]>({
    queryKey: ["schedules", studyId, today],
    queryFn: async () => {
      const { data } = await browserClient
        .from("calendar")
        .select("*")
        .eq("study_id", studyId)
        .eq("event_date", today)
        .order("start_time", { ascending: true });
      return data || [];
    },
  });
};
