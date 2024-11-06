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
    <div className="bg-[#F6F6F4] h-full w-full">
      <header className="mx-6">
        <div className="flex justify-center items-center relative pt-[10px]">
          <BackButton color="#666666" />
          <span className="body-16-s text-secondary-600">일정잡기</span>
        </div>
        <div className="flex items-center mt-[30px]">
          <h1 className="title-24-b">{monthWithDay}</h1>
          <div className="border-l h-[22px] w-[1px] border-secondary-300 mx-2" />
          <span className="text-[15px]">{weekday}</span>
        </div>
      </header>
      <main>
        <EventList
          studyId={id}
          eventDate={date}
          managerId={studyData?.study_manager}
        />
      </main>
    </div>
  );
};

export default CalendarPage;
