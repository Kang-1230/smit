"use client";

import { useState } from "react";
import SelectTime from "./SelectTime";
import { useAddCalendarEvent } from "../[id]/hooks/useCalendar";

const CreateEventForm = ({
  studyId,
  eventDate,
  closeForm,
}: {
  studyId: string;
  eventDate: string;
  closeForm: () => void;
}) => {
  const [eventDescription, setEventDescription] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeInput, setActiveInput] = useState<"start" | "end" | null>(null);

  const handleTimeSelect = (time: string) => {
    if (activeInput === "start") {
      setEventStart(time);
    } else if (activeInput === "end") {
      setEventEnd(time);
    }
  };

  // 일정 등록
  const { mutate: addEvent } = useAddCalendarEvent();

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
            onClick={closeForm}
            className="flex justify-center items-center p-2.5 gap-2.5 flex-1 rounded-lg bg-[#8D8D8D] text-[#FFF]"
          >
            삭제하기
          </button>
          <button
            onClick={() => {
              // 빈값 체크
              if (!eventDescription.trim()) {
                alert("일정 정보를 작성해주세요!");
                return;
              }
              addEvent(
                { studyId, eventDate, eventDescription, eventStart, eventEnd },
                {
                  onSuccess: () => {
                    setEventDescription("");
                  },
                },
              );
            }}
            className="flex justify-center items-center p-2.5 gap-2.5 flex-1 rounded-lg bg-[#8D8D8D] text-[#FFF]"
          >
            적용하기
          </button>
        </div>
      </div>
      {isModalOpen && (
        <SelectTime
          onTimeSelect={handleTimeSelect}
          onClose={() => {
            setIsModalOpen(false);
            setActiveInput(null);
          }}
        />
      )}
    </>
  );
};

export default CreateEventForm;
