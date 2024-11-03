"use client";

import { useState } from "react";
import { useCalendarByDate } from "../[id]/hooks/useCalendar";
import CreateEventForm from "./CreateEventForm";
import EventListItem from "./EventListItem";
import { useSession } from "@/hooks/useUserProfile";

const EventList = ({
  studyId,
  eventDate,
  managerId,
}: {
  studyId: string;
  eventDate: string;
  managerId: string | undefined;
}) => {
  const { data, isLoading, isError } = useCalendarByDate(studyId, eventDate);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: sessionData } = useSession();

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
        <EventListItem
          key={event.calendar_id}
          event={event}
          managerId={managerId}
          sessionId={sessionData?.id}
          calendarData={data}
        />
      ))}

      {/* 일반 멤버일 경우 일정이 존재하지 않을때 */}
      {data?.length === 0 && managerId !== sessionData?.id && (
        <div className="flex h-[117px] m-6 justify-center items-center rounded-[20px] bg-[#E0E0E0]">
          정해진 일정이 없습니다.
        </div>
      )}

      {/* 방장만 볼 수 있음 */}
      {isFormOpen && (
        <CreateEventForm
          studyId={studyId}
          eventDate={eventDate}
          deleteForm={closeForm}
          calendarData={data}
          mode="create"
        />
      )}
      {managerId === sessionData?.id && !isFormOpen ? (
        data?.length === 0 ? (
          <div className="h-[117px] bg-[#ECECEC] m-[25px] p-4 flex flex-col justify-center items-center gap-2 flex-shrink-0 rounded-[20px]">
            <span>일정을 등록해보세요</span>
            <button
              onClick={openForm}
              className="w-8 h-8 p-2.5 flex justify-center items-center bg-[#ECECEC]"
            >
              +
            </button>
          </div>
        ) : (
          <div className="h-[60px] bg-[#ECECEC] m-[25px] p-4 flex flex-col justify-center items-center gap-2 flex-shrink-0 rounded-[20px]">
            <button
              onClick={openForm}
              className="w-8 h-8 p-2.5 flex justify-center items-center bg-[#ECECEC]"
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
