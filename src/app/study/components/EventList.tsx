"use client";

import { useCalendarByStudy } from "../[id]/hooks/useCalendar";
import EventListCard from "./EventListCard";

const EventList = ({
  studyId,
  eventDate,
}: {
  studyId: string;
  eventDate: string;
}) => {
  const { data, isLoading, isError } = useCalendarByStudy(studyId, eventDate);

  if (isLoading) {
    return <div>일정을 불러오는 중...</div>;
  }

  if (isError) {
    return <div>일정을 불러오는데 실패했습니다.</div>;
  }

  return (
    <div>
      {data?.map((event) => (
        <EventListCard key={event.calendar_id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
