import {
  addCalenderEvent,
  fetchCalenderEvent,
} from "@/utils/supabase/supabase-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 날짜별 스터디 일정 가져오기
export const useCalendarByStudy = (studyId: string, eventDate: string) => {
  return useQuery({
    queryKey: ["calendar", studyId, eventDate],
    queryFn: () => fetchCalenderEvent(studyId, eventDate),
  });
};

// 캘린더 일정 등록
export const useAddCalendarEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      studyId: string;
      eventDate: string;
      eventDescription: string;
      eventStart: string;
      eventEnd: string;
    }) => addCalenderEvent(data),
    onSuccess: (_, { studyId, eventDate }) => {
      queryClient.invalidateQueries({
        queryKey: ["calendar", studyId, eventDate],
      });
    },
  });
};
