import { getToday } from "@/utils/getTime";
import {
  addCalenderEvent,
  deleteCalenderEvent,
  fetchCalenderEvent,
  fetchCalenderEventByStudy,
  updateCalendarEvent,
} from "@/utils/supabase/supabase-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 날짜별 캘린더 일정 가져오기
export const useCalendarByDate = (studyId: string, eventDate: string) => {
  return useQuery({
    queryKey: ["calendar", studyId, eventDate],
    queryFn: () => fetchCalenderEvent(studyId, eventDate),
  });
};

// 스터디별 캘린더 일정 가져오기
export const useCalendarByStudy = (studyId: string) => {
  return useQuery({
    queryKey: ["calendar", studyId],
    queryFn: () => fetchCalenderEventByStudy(studyId),
  });
};

// 캘린더 일정 등록
export const useAddCalendarEvent = () => {
  const queryClient = useQueryClient();
  const today = getToday(new Date());
  return useMutation({
    mutationFn: (data: {
      studyId: string;
      eventDate: string;
      eventDescription: string;
      eventStart: string;
      eventEnd: string;
    }) => addCalenderEvent(data),
    onSuccess: (_, { studyId }) => {
      queryClient.invalidateQueries({
        queryKey: ["calendar", studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["schedules", studyId, today],
      });
    },
  });
};

// 캘린더 일정 삭제
export const useDeleteCalendarEvent = (studyId: string, eventDate: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (calendarId: string) => deleteCalenderEvent(calendarId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["calendar", studyId, eventDate],
      });
    },
  });
};

// 캘린더 일정 수정
export const useUpdateCalendarEvent = (data: {
  studyId: string;
  eventDate: string;
  eventDescription: string;
  eventStart: string;
  eventEnd: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (calendarId: string) =>
      updateCalendarEvent(
        calendarId,
        data.eventDescription,
        data.eventStart,
        data.eventEnd,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["calendar", data.studyId, data.eventDate],
      });
    },
  });
};
