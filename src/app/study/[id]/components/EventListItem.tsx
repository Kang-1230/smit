"use client";
import { useState } from "react";
import { Tables } from "../../../../../database.types";
import { useDeleteCalendarEvent } from "../hooks/useCalendar";
import CreateEventForm from "./CreateEventForm";
import Image from "next/image";
import PencilLined from "../../../../../public/icons/PencilLined.svg";
import XSmall from "../../../../../public/icons/XSmall.svg";

const EventListItem = ({
  event,
  managerId,
  sessionId,
  calendarData,
}: {
  event: Tables<"calendar">;
  managerId: string | undefined;
  sessionId: string | undefined;
  calendarData: Tables<"calendar">[];
}) => {
  const [isEdit, setIsEdit] = useState(false);

  // 일정 삭제
  const { mutate: deleteEvent } = useDeleteCalendarEvent(
    event.study_id,
    event.event_date,
  );

  // 삭제 버튼
  const handleDelete = () => {
    const isConfirmed = window.confirm("해당 일정을 삭제하시겠습니까?");
    if (isConfirmed) {
      deleteEvent(event.calendar_id);
    }
  };

  // 전체일정에서 수정중인 일정 제외한 리스트
  const existTimeWithoutEdit = calendarData?.filter(
    (data) => data.calendar_id !== event.calendar_id,
  );

  return (
    <>
      {!isEdit ? (
        <div className="h-[141px] m-[25px] p-5 self-stretch rounded-[20px] bg-secondary-800 relative">
          <div className="flex items-center gap-1">
            <p className="text-white title-20-m">{`${event.start_time.slice(
              0,
              -3,
            )} - ${event.end_time.slice(0, -3)}`}</p>{" "}
            {managerId === sessionId && (
              <Image
                onClick={() => setIsEdit(true)}
                src={PencilLined}
                alt="edit"
                width={16}
                height={16}
                className="cursor-pointer"
              />
            )}
          </div>
          <p className="text-secondary-300 body-14-r mt-5">
            {event.event_description}
          </p>
          <div className="flex flex-col items-end absolute top-3 right-3 gap-2">
            {managerId === sessionId && (
              <div
                onClick={handleDelete}
                className="shrink-0 rounded-[18px] bg-white/20"
              >
                <Image
                  src={XSmall}
                  alt="edit"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <CreateEventForm
          studyId={event.study_id}
          eventDate={event.event_date}
          deleteForm={handleDelete}
          setIsEdit={setIsEdit}
          initialData={{
            calendarId: event.calendar_id,
            description: event.event_description,
            startTime: event.start_time,
            endTime: event.end_time,
          }}
          calendarData={calendarData}
          withoutEditData={existTimeWithoutEdit}
          mode="edit"
        />
      )}
    </>
  );
};

export default EventListItem;
