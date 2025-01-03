"use client";

import { useState } from "react";
import { useCalendarByDate } from "../hooks/useCalendar";
import CreateEventForm from "./CreateEventForm";
import EventListItem from "./EventListItem";
import { useSession } from "@/hooks/useUserProfile";
import Image from "next/image";

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
          closeForm={closeForm}
        />
      ))}

      {/* 일반 멤버일 경우 일정이 존재하지 않을때 */}
      {data?.length === 0 && managerId !== sessionData?.id && (
        <div className="body-14-r mx-6 my-5 flex h-[117px] items-center justify-center rounded-[20px] bg-white text-secondary-400 xl:mx-5 xl:my-4">
          정해진 일정이 없습니다.
        </div>
      )}

      {/* 방장만 볼 수 있음 */}
      {isFormOpen && (
        <CreateEventForm
          studyId={studyId}
          eventDate={eventDate}
          closeForm={closeForm}
          calendarData={data}
          mode="create"
        />
      )}
      {managerId === sessionData?.id && !isFormOpen ? (
        data?.length === 0 ? (
          <div
            onClick={openForm}
            className="mx-6 my-5 flex h-[117px] flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-[20px] bg-white p-4 xl:mx-5 xl:my-4"
          >
            <span className="text-secondary-400">일정을 등록해보세요</span>
            <Image
              src={"/icons/PlusSmall.svg"}
              alt="plus"
              width={24}
              height={24}
            />
          </div>
        ) : (
          <div
            onClick={openForm}
            className="mx-6 my-5 flex h-[60px] flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-[20px] bg-white p-4 xl:mx-5 xl:my-4"
          >
            <Image
              src={"/icons/PlusMedium.svg"}
              alt="plus"
              width={24}
              height={24}
            />
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default EventList;
