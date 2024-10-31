"use client";

import { useState } from "react";
import { useCalendarByStudy } from "../[id]/hooks/useCalendar";
import CreateEventForm from "./CreateEventForm";
import EventListItem from "./EventListItem";

const EventList = ({
  studyId,
  eventDate,
}: {
  studyId: string;
  eventDate: string;
}) => {
  const { data, isLoading, isError } = useCalendarByStudy(studyId, eventDate);
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (isLoading) {
    return <div>일정을 불러오는 중...</div>;
  }

  if (isError) {
    return <div>일정을 불러오는데 실패했습니다.</div>;
  }

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div>
      {data?.map((event) => (
        <EventListItem key={event.calendar_id} event={event} />
      ))}
      {isFormOpen && (
        <CreateEventForm
          studyId={studyId}
          eventDate={eventDate}
          deleteForm={closeForm}
        />
      )}
      {!isFormOpen ? (
        data?.length === 0 ? (
          <div className="h-[117px] bg-[#ECECEC] m-[25px] p-4 flex flex-col justify-center items-center gap-2 flex-shrink-0 rounded-[20px]">
            <span>일정을 등록해보세요</span>
            <button
              onClick={openForm}
              className="w-8 h-8 p-2.5 flex justify-center items-center rounded-full bg-white"
            >
              +
            </button>
          </div>
        ) : (
          <div className="h-[60px] bg-[#ECECEC] m-[25px] p-4 flex flex-col justify-center items-center gap-2 flex-shrink-0 rounded-[20px]">
            <button
              onClick={openForm}
              className="w-8 h-8 p-2.5 flex justify-center items-center rounded-full bg-white"
            >
              +
            </button>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default EventList;
