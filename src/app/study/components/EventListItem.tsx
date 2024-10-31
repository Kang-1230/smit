"use client";
import { useState } from "react";
import { Tables } from "../../../../database.types";
import { useDeleteCalendarEvent } from "../[id]/hooks/useCalendar";
import CreateEventForm from "./CreateEventForm";

const EventListItem = ({ event }: { event: Tables<"calendar"> }) => {
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

  return (
    <>
      {!isEdit ? (
        <div className="h-[141px] m-[25px] p-5 self-stretch rounded-[20px] bg-[#E0E0E0] relative">
          <p className="mb-5 text-[#666] text-xl font-medium">{`${event.start_time.slice(
            0,
            -3,
          )} - ${event.end_time.slice(0, -3)}`}</p>
          <p>{event.event_description}</p>
          <div className="flex flex-col items-end absolute top-4 right-5 gap-2">
            <button onClick={handleDelete}>X</button>
            <button onClick={() => setIsEdit(true)}>✐</button>
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
        />
      )}
    </>
  );
};

export default EventListItem;
