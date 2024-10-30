"use client";
import { useState } from "react";
import TimePicker from "./TimePicker";
const buttonClass = "p-2.5 flex-1 rounded-xl bg-[#8D8D8D]";

interface SelecTimeProps {
  onTimeSelect: (time: string) => void;
  onClose: () => void;
}

const SelectTime = ({ onTimeSelect, onClose }: SelecTimeProps) => {
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");

  const hours = [...Array(24)].map((_, i) => i.toString().padStart(2, "0"));
  const minutes = [...Array(60)].map((_, i) => i.toString().padStart(2, "0"));

  const handleHourScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / 40);
    setSelectedHour(hours[index] || "00");
  };

  const handleMinuteScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / 40);
    setSelectedMinute(minutes[index] || "00");
  };

  const handleConfirm = () => {
    onTimeSelect(`${selectedHour}:${selectedMinute}`);
    onClose();
  };

  const convertTimeFormat = (timeStr: string): string => {
    const [h, m] = timeStr.split(":").map(Number);
    return `${h >= 12 ? "오후" : "오전"} ${h % 12 || 12}시 ${m}분`;
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center w-full h-full bg-black/70 z-50"
    >
      <div
        className="w-full m-6 h-[258px] bg-white rounded-2xl flex items-center justify-center p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <section className="w-full">
          <p className="text-center text-xl font-medium border-b-2 pb-2">
            {convertTimeFormat(`${selectedHour}:${selectedMinute}`)}
          </p>
          <div className="flex justify-center items-center">
            {/* 시간 선택 */}
            <TimePicker
              time={hours}
              handleTimeScroll={handleHourScroll}
              selectedTime={selectedHour}
            />
            <span className="text-xl font-bold mx-4">:</span>
            {/* 분 선택 */}
            <TimePicker
              time={minutes}
              handleTimeScroll={handleMinuteScroll}
              selectedTime={selectedMinute}
            />
          </div>
          <div className="flex justify-center items-center gap-2 text-white mt-4">
            <button onClick={onClose} className={buttonClass}>
              취소
            </button>
            <button onClick={handleConfirm} className={buttonClass}>
              확인
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SelectTime;
