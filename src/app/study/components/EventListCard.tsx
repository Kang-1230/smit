import { Tables } from "../../../../database.types";

const EventListCard = ({ event }: { event: Tables<"calendar"> }) => {
  return (
    <div className="h-[141px] m-[25px] p-5 self-stretch rounded-[20px] bg-[#E0E0E0] relative">
      <p className="mb-5 text-[#666] text-xl font-medium">{`${event.start_time.slice(
        0,
        -3,
      )} - ${event.end_time.slice(0, -3)}`}</p>
      <p>{event.event_description}</p>
      <div className="flex flex-col items-end absolute top-4 right-5 gap-2">
        <button>X</button>
        <button>✐</button>
      </div>
    </div>
  );
};

export default EventListCard;
