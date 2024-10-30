import { format } from "date-fns-tz";
import { ko } from "date-fns/locale";
import CreateEventForm from "../../components/CreateEventForm";
import EventList from "../../components/EventList";

interface Props {
  params: {
    id: string;
    date: string;
  };
}

const CalendarPage = ({ params }: Props) => {
  const { id, date } = params;

  const formatDateToMixed = (dateStr: string) => ({
    monthWithDay: `${format(new Date(dateStr), "MMMM")} ${format(
      new Date(dateStr),
      "d",
    )}`,
    weekday: format(new Date(dateStr), "EEEE", { locale: ko }),
  });

  const { monthWithDay, weekday } = formatDateToMixed(date);

  return (
    <>
      <header className="m-[25px]">
        <h1 className="text-[24px] font-semibold">{monthWithDay}</h1>
        <span className="text-[15px]">{weekday}</span>
      </header>
      <main>
        <EventList studyId={id} eventDate={date} />
        <CreateEventForm studyId={id} eventDate={date} />
      </main>
    </>
  );
};

export default CalendarPage;
