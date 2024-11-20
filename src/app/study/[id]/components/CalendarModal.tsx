"use client";
import { format } from "date-fns-tz";
import { ko } from "date-fns/locale";
import EventList from "./EventList";
import { Tables } from "../../../../../database.types";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface CalendarModalProps {
  studyId: string;
  selectedDate?: string;
  isModalOpen?: boolean;
  studyData: Tables<"study"> | null;
}

const CalendarModal = ({
  studyId,
  selectedDate,
  isModalOpen,
  studyData,
}: CalendarModalProps) => {
  const router = useRouter();
  const pathname = usePathname();
  if (!isModalOpen || !selectedDate) return null;

  const handleClose = () => {
    router.replace(pathname);
  };

  const formatDateToMixed = (dateStr: string) => ({
    monthWithDay: `${format(new Date(dateStr), "MMMM")} ${format(
      new Date(dateStr),
      "d",
    )}`,
    weekday: format(new Date(dateStr), "EEEE", { locale: ko }),
  });

  const { monthWithDay, weekday } = formatDateToMixed(selectedDate);

  return (
    <div
      className={`fixed inset-0 z-30 ${isModalOpen && "h-screen overflow-hidden"} flex h-screen w-screen flex-col overflow-auto bg-[#F8F8FA] xl:absolute xl:left-[calc(50%+228px)] xl:top-[244px] xl:h-[900px] xl:w-[388px] xl:rounded-[20px]`}
    >
      <header className="fixed left-0 right-0 top-[30.5px] z-50 bg-[#F8F8FA] xl:static xl:z-auto xl:mt-4">
        <div className="mx-[13px] flex h-10 items-center justify-between">
          <div className="flex gap-1">
            <Image
              src={"/icons/CalenderMonthGray.svg"}
              alt="calendar"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span className="body-14-r text-secondary-300">일정잡기</span>
          </div>
          <button
            onClick={handleClose}
            className="h-10 w-10 rounded-full bg-[#5A5A5A] p-[10px]"
          >
            <Image
              src={"/icons/XMediumWhite.svg"}
              alt="close"
              width={24}
              height={24}
            />
          </button>
        </div>
      </header>
      <div className="relative pt-[34px] xl:pt-0">
        <section className="mx-6 mt-[40px] flex items-center text-black xl:mt-1">
          <h1 className="title-24-b">{monthWithDay}</h1>
          <div className="mx-2 h-[22px] w-[1px] border-l border-secondary-300" />
          <span className="text-[15px]">{weekday}</span>
        </section>
        <main>
          <EventList
            studyId={studyId}
            eventDate={selectedDate}
            managerId={studyData?.study_manager}
          />
        </main>
      </div>
    </div>
  );
};

export default CalendarModal;
