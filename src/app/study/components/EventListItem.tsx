import { Tables } from "../../../../database.types";
import { useDeleteCalendarEvent } from "../[id]/hooks/useCalendar";

const EventListItem = ({ event }: { event: Tables<"calendar"> }) => {
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
    <div className="h-[141px] m-[25px] p-5 self-stretch rounded-[20px] bg-[#E0E0E0] relative">
      <p className="mb-5 text-[#666] text-xl font-medium">{`${event.start_time.slice(
        0,
        -3,
      )} - ${event.end_time.slice(0, -3)}`}</p>
      <p>{event.event_description}</p>
      <div className="flex flex-col items-end absolute top-4 right-5 gap-2">
        <button onClick={handleDelete}>X</button>
        <button>✐</button>
      </div>
    </div>
  );
};

export default EventListItem;
