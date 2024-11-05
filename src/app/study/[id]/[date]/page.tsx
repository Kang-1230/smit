import { format } from "date-fns-tz";
import { ko } from "date-fns/locale";
import EventList from "../../components/EventList";
import { fetchStudyInfo } from "@/utils/supabase/supabase-server";
import BackButton from "../../components/BackButton";

interface Props {
  params: {
    id: string;
    date: string;
  };
}

const CalendarPage = async ({ params }: Props) => {
  const { id, date } = params;
  const studyData = await fetchStudyInfo(id);
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
      <header className="mx-6">
        <BackButton />
        <h1 className="text-[24px] font-semibold">{monthWithDay}</h1>
        <span className="text-[15px]">{weekday}</span>
      </header>
      <main>
        <EventList
          studyId={id}
          eventDate={date}
          managerId={studyData?.study_manager}
        />
      </main>
    </>
  );
};

export default CalendarPage;
