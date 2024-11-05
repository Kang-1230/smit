"use client";

import { useState } from "react";
import SelectTime from "./SelectTime";
import {
  useAddCalendarEvent,
  useUpdateCalendarEvent,
} from "../[id]/hooks/useCalendar";
import { Tables } from "../../../../database.types";

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
      <div className="flex flex-col items-center m-[25px] p-5 gap-2 self-stretch rounded-2xl bg-[#ECECEC]">
        <input
          type="text"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          placeholder="메모: 최대 500자까지 작성 가능"
          className="flex justify-center items-center px-4 py-2 gap-2.5 self-stretch rounded-full border border-[#BFBFBF] bg-white"
        />
        <div className="flex justify-center items-center gap-2.5 self-stretch min-w-0">
          <input
            value={eventStart}
            onClick={() => {
              setIsModalOpen(true);
              setActiveInput("start");
            }}
            placeholder="12:00"
            className="flex items-center px-4 py-2 gap-2 flex-1 rounded-full border border-[#BFBFBF] bg-white w-full cursor-pointer"
            readOnly
          />{" "}
          ➔{" "}
          <input
            value={eventEnd}
            onClick={() => {
              setIsModalOpen(true);
              setActiveInput("end");
            }}
            placeholder="15:00"
            className="flex items-center px-4 py-2 gap-2 flex-1 rounded-full border border-[#BFBFBF] bg-white w-full cursor-pointer"
            readOnly
          />
        </div>

        <div className="flex  gap-2 mt-4 self-stretch">
          <button
            onClick={deleteForm}
            className="flex justify-center items-center p-2.5 gap-2.5 flex-1 rounded-lg bg-[#8D8D8D] text-[#FFF]"
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
                  },
                });
              }}
              className="flex justify-center items-center p-2.5 gap-2.5 flex-1 rounded-lg bg-[#8D8D8D] text-[#FFF]"
            >
              적용하기
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
              className="flex justify-center items-center p-2.5 gap-2.5 flex-1 rounded-lg bg-[#8D8D8D] text-[#FFF]"
            >
              적용하기
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
