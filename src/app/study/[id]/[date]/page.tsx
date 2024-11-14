import { format } from "date-fns-tz";
import { ko } from "date-fns/locale";
import EventList from "../components/EventList";
import { fetchStudyInfo } from "@/utils/supabase/supabase-server";
import BackButton from "../../../../components/common/BackButton";

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
    <div className="h-full w-full bg-[#F8F8FA]">
      <header className="fixed left-0 right-0 top-0 z-50 bg-[#F8F8FA]">
        <div className="relative mx-6 flex h-11 items-center justify-center">
          <BackButton color="#666666" studyId={id} today={date} />
          <span className="body-16-m text-secondary-600">일정잡기</span>
        </div>
      </header>
      <div className="relative pt-[34px]">
        <section className="mx-6 mt-[30px] flex items-center">
          <h1 className="title-24-b">{monthWithDay}</h1>
          <div className="mx-2 h-[22px] w-[1px] border-l border-secondary-300" />
          <span className="text-[15px]">{weekday}</span>
        </section>
        <main>
          <EventList
            studyId={id}
            eventDate={date}
            managerId={studyData?.study_manager}
          />
        </main>
      </div>
    </div>
  );
};

export default CalendarPage;
