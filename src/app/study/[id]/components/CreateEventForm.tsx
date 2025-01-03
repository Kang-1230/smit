"use client";

import { useState } from "react";
import SelectTime from "./SelectTime";
import {
  useAddCalendarEvent,
  useUpdateCalendarEvent,
} from "../hooks/useCalendar";
import { Tables } from "../../../../../database.types";
import ArrowRight from "../../../../../public/icons/ArrowRight.svg";
import Image from "next/image";
import Clock from "../../../../../public/icons/Clock.svg";
import AutoResizeTextArea from "./AutoResizeTextArea";
import MyButton from "@/components/common/Button";
import WebSelectTime from "./WebSelectTime";

interface CreateEventFormProps {
  studyId: string;
  eventDate: string;
  closeForm: () => void;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: {
    calendarId: string;
    description: string;
    startTime: string;
    endTime: string;
  };
  calendarData: Tables<"calendar">[] | undefined;
  withoutEditData?: Tables<"calendar">[];
  mode: "create" | "edit";
}

const CreateEventForm = ({
  studyId,
  eventDate,
  closeForm,
  setIsEdit,
  initialData,
  calendarData,
  withoutEditData,
  mode,
}: CreateEventFormProps) => {
  const [eventDescription, setEventDescription] = useState(
    initialData?.description || "",
  );
  const [eventStart, setEventStart] = useState(
    initialData?.startTime.slice(0, -3) || "",
  );
  const [eventEnd, setEventEnd] = useState(
    initialData?.endTime.slice(0, -3) || "",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeInput, setActiveInput] = useState<"start" | "end" | null>(null);

  const handleTimeSelect = (time: string) => {
    if (activeInput === "start") {
      setEventStart(time);
    } else if (activeInput === "end") {
      setEventEnd(time);
    }
  };

  const updateEventData = {
    studyId,
    eventDate,
    eventDescription,
    eventStart,
    eventEnd,
  };

  // 빈값 체크
  const isInputEmpty =
    !eventDescription.trim() || !eventStart.trim() || !eventEnd.trim()
      ? true
      : false;

  // 일정 등록
  const { mutate: addEvent } = useAddCalendarEvent();

  // 일정 수정
  const { mutate: updateEvent } = useUpdateCalendarEvent(updateEventData);

  return (
    <>
      <div className="mx-6 my-5 flex flex-col items-center gap-3 self-stretch rounded-2xl bg-secondary-800 p-5 xl:mx-5 xl:my-4">
        <AutoResizeTextArea
          value={eventDescription}
          onChange={setEventDescription}
        />
        <div className="flex items-center justify-center gap-2.5 self-stretch">
          <div className="relative z-10 w-full">
            <input
              value={eventStart}
              onClick={() => {
                setIsModalOpen(true);
                setActiveInput("start");
              }}
              placeholder="12:00"
              className="flex w-full flex-1 cursor-pointer items-center gap-2 rounded-full bg-secondary-600 py-2 pl-11 pr-4 text-white placeholder-secondary-300 focus:outline-none focus:ring-1 focus:ring-secondary-100"
              readOnly
            />
            <Image
              src={Clock}
              width={13.583}
              height={13.583}
              alt="clock"
              className="absolute left-4 top-[13px] z-20"
            />
          </div>
          <Image src={ArrowRight} alt="arrow" width={20} height={20} />
          <div className="relative z-10 w-full">
            <input
              value={eventEnd}
              onClick={() => {
                setIsModalOpen(true);
                setActiveInput("end");
              }}
              placeholder="15:00"
              className="flex w-full flex-1 cursor-pointer items-center gap-2 rounded-full bg-secondary-600 py-2 pl-11 pr-4 text-white placeholder-secondary-300 focus:outline-none focus:ring-1 focus:ring-secondary-100"
              readOnly
            />
            <Image
              src={Clock}
              width={13.583}
              height={13.583}
              alt="clock"
              className="absolute left-4 top-[13px] z-20"
            />
          </div>
        </div>
        {isModalOpen && (
          <WebSelectTime
            onTimeSelect={handleTimeSelect}
            onClose={() => {
              setIsModalOpen(false);
              setActiveInput(null);
            }}
            eventStart={eventStart}
            eventEnd={eventEnd}
            selectingType={activeInput === "start" ? "start" : "end"}
            calendarData={calendarData}
            withoutEditData={withoutEditData}
            mode={mode}
            isWebCalender={isModalOpen}
          />
        )}
        <div className="mt-2 flex gap-2 self-stretch xl:mt-0">
          <MyButton
            onClick={closeForm}
            style="black-line"
            size="md"
            className="flex-1"
          >
            취소하기
          </MyButton>
          {!initialData ? (
            <MyButton
              onClick={() => {
                addEvent(updateEventData, {
                  onSuccess: () => {
                    setEventDescription("");
                    setEventStart("");
                    setEventEnd("");
                    closeForm();
                  },
                });
              }}
              disabled={isInputEmpty}
              style="orange-fill"
              size="md"
              className="flex-1"
            >
              완료하기
            </MyButton>
          ) : (
            <MyButton
              onClick={() => {
                updateEvent(initialData.calendarId, {
                  onSuccess: () => {
                    if (setIsEdit) {
                      setIsEdit(false);
                    }
                  },
                });
              }}
              style="orange-fill"
              size="md"
              disabled={isInputEmpty}
              className="flex-1"
            >
              완료하기
            </MyButton>
          )}
        </div>
      </div>
      {isModalOpen && (
        <SelectTime
          onTimeSelect={handleTimeSelect}
          onClose={() => {
            setIsModalOpen(false);
            setActiveInput(null);
          }}
          eventStart={eventStart}
          eventEnd={eventEnd}
          selectingType={activeInput === "start" ? "start" : "end"}
          calendarData={calendarData}
          withoutEditData={withoutEditData}
          mode={mode}
        />
      )}
    </>
  );
};

export default CreateEventForm;
