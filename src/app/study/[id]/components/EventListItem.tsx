"use client";
import { useState } from "react";
import { Tables } from "../../../../../database.types";
import { useDeleteCalendarEvent } from "../hooks/useCalendar";
import CreateEventForm from "./CreateEventForm";
import Image from "next/image";
import PencilLined from "../../../../../public/icons/PencilLined.svg";
import XSmall from "../../../../../public/icons/XSmall.svg";
import useModalOpen from "@/hooks/useModalOpen";
import DeleteModal from "@/components/common/DeleteModal";

interface EventListItemProps {
  event: Tables<"calendar">;
  managerId: string | undefined;
  sessionId: string | undefined;
  calendarData: Tables<"calendar">[];
  closeForm: () => void;
}

const EventListItem = ({
  event,
  managerId,
  sessionId,
  calendarData,
}: EventListItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const { isModalOpen, modalOpen, modalClose } = useModalOpen();

  // 일정 삭제
  const { mutate: deleteEvent } = useDeleteCalendarEvent(
    event.study_id,
    event.event_date,
  );

  // 삭제 버튼
  const handleDelete = () => {
    deleteEvent(event.calendar_id);
  };

  // 전체일정에서 수정중인 일정 제외한 리스트
  const existTimeWithoutEdit = calendarData?.filter(
    (data) => data.calendar_id !== event.calendar_id,
  );

  return (
    <>
      {!isEdit ? (
        <div className="relative mx-6 my-5 h-[141px] self-stretch rounded-[20px] bg-secondary-800 p-5 xl:mx-5 xl:my-4">
          <div className="flex items-center gap-1">
            <p className="title-20-m text-white">{`${event.start_time.slice(
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
          <p className="body-14-r mt-5 text-secondary-300">
            {event.event_description}
          </p>
          <div className="absolute right-3 top-3 flex flex-col items-end gap-2">
            {managerId === sessionId && (
              <div
                onClick={modalOpen}
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
          closeForm={() => setIsEdit(false)}
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
      {isModalOpen && (
        <DeleteModal onClose={modalClose} onDelete={handleDelete} />
      )}
    </>
  );
};

export default EventListItem;
