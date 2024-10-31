"use client";
import { useState } from "react";
import ScrollPicker from "@/components/common/ScrollPicker";
const buttonClass = "p-2.5 flex-1 rounded-xl bg-[#8D8D8D]";

interface SelecTimeProps {
  onTimeSelect: (time: string) => void;
  onClose: () => void;
  eventStart: string;
  eventEnd: string;
  selectingType: "start" | "end";
}

const SelectTime = ({
  onTimeSelect,
  onClose,
  eventStart,
  eventEnd,
  selectingType,
}: SelecTimeProps) => {
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");

  // 시간,분 데이터
  const hours = [...Array(24)].map((_, i) => i.toString().padStart(2, "0"));
  const minutes = [...Array(60)].map((_, i) => i.toString().padStart(2, "0"));

  // 시간/분 선택 스크롤 이벤트 핸들러
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

  // 시간을 분으로 변환
  const convertTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // 확인&유효성(시작시간 < 종료시간)
  const handleConfirm = () => {
    const selectedTime = `${selectedHour}:${selectedMinute}`;
    const selectedMinutes = convertTimeToMinutes(selectedTime);

    if (selectingType === "start" && eventEnd) {
      const endMinutes = convertTimeToMinutes(eventEnd);
      if (selectedMinutes >= endMinutes) {
        alert("시작 시간이 종료 시간보다 늦을 수 없습니다! 다시 확인해주세요!");
        return;
      }
    }

    if (selectingType === "end" && eventStart) {
      const startMinutes = convertTimeToMinutes(eventStart);
      if (selectedMinutes <= startMinutes) {
        alert("종료 시간이 시작 시간보다 빠를 수 없습니다! 다시 확인해주세요!");
        return;
      }
    }

    onTimeSelect(selectedTime);
    onClose();
  };

  // 시간 형태 변환(12:00 -> 오전 12시 00분)
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
            <ScrollPicker
              options={hours}
              handleScroll={handleHourScroll}
              selectedItem={selectedHour}
            />
            <span className="text-xl font-bold mx-4">:</span>
            {/* 분 선택 */}
            <ScrollPicker
              options={minutes}
              handleScroll={handleMinuteScroll}
              selectedItem={selectedMinute}
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
