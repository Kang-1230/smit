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

interface CreateEventFormProps {
  studyId: string;
  eventDate: string;
  deleteForm: () => void;
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
  deleteForm,
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

  // 일정 등록
  const { mutate: addEvent } = useAddCalendarEvent();

  // 일정 수정
  const { mutate: updateEvent } = useUpdateCalendarEvent(updateEventData);

  return (
    <>
      <div className="m-[25px] flex flex-col items-center gap-3 self-stretch rounded-2xl bg-secondary-800 p-5">
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
              className="flex w-full flex-1 cursor-pointer items-center gap-2 rounded-full bg-secondary-600 py-2 pl-11 pr-4 text-white placeholder-secondary-500"
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
              className="flex w-full flex-1 cursor-pointer items-center gap-2 rounded-full bg-secondary-600 py-2 pl-11 pr-4 text-white placeholder-secondary-500"
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

        <div className="mt-2 flex gap-2 self-stretch">
          <button
            onClick={deleteForm}
            className="flex flex-1 items-center justify-center rounded-[18px] border border-secondary-900 bg-white px-4 py-2 text-secondary-900"
          >
            삭제하기
          </button>
          {!initialData ? (
            <button
              onClick={() => {
                // 빈값 체크
                if (!eventDescription.trim())
                  return alert("일정 내용을 작성해주세요!");
                if (!eventStart.trim() || !eventEnd.trim())
                  return alert("시간을 선택해주세요!");
                addEvent(updateEventData, {
                  onSuccess: () => {
                    setEventDescription("");
                    setEventStart("");
                    setEventEnd("");
                    deleteForm();
                  },
                });
              }}
              className="flex flex-1 items-center justify-center rounded-[18px] bg-primary-50 px-4 py-2 text-white"
            >
              완료하기
            </button>
          ) : (
            <button
              onClick={() => {
                // 빈값 체크
                if (!eventDescription.trim())
                  return alert("일정 내용을 작성해주세요!");
                if (!eventStart.trim() || !eventEnd.trim())
                  return alert("시간을 선택해주세요!");
                updateEvent(initialData.calendarId, {
                  onSuccess: () => {
                    if (setIsEdit) {
                      setIsEdit(false);
                    }
                  },
                });
              }}
              className="flex flex-1 items-center justify-center rounded-[18px] bg-primary-50 px-4 py-2 text-white"
            >
              완료하기
            </button>
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
