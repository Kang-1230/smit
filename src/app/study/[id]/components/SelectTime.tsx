"use client";
import { useState } from "react";
import ScrollPicker from "@/components/common/ScrollPicker";
import { Tables } from "../../../../../database.types";
import SelectDateModal from "@/components/common/SelectDateModal";

interface SelecTimeProps {
  onTimeSelect: (time: string) => void;
  onClose: () => void;
  eventStart: string;
  eventEnd: string;
  selectingType: "start" | "end";
  calendarData: Tables<"calendar">[] | undefined;
  withoutEditData?: Tables<"calendar">[];
  mode: "create" | "edit";
}

const SelectTime = ({
  onTimeSelect,
  onClose,
  eventStart,
  eventEnd,
  selectingType,
  calendarData,
  withoutEditData,
  mode,
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

  // 기존 일정의 시간데이터 가공(등록 모드)
  const existTimeRanges = calendarData?.map((event) => ({
    start: convertTimeToMinutes(event.start_time.slice(0, -3)),
    end: convertTimeToMinutes(event.end_time.slice(0, -3)),
  }));

  // 기존 일정의 시간데이터 가공(수정 모드)
  const existTimeRangesWithoutEdit = withoutEditData?.map((event) => ({
    start: convertTimeToMinutes(event.start_time.slice(0, -3)),
    end: convertTimeToMinutes(event.end_time.slice(0, -3)),
  }));

  // 선택된 시간이 이미 존재하는지 확인하는 함수(등록 모드)
  const checkTimeExist = (selectedMinutes: number) => {
    for (const timeRange of existTimeRanges!) {
      if (selectingType === "start") {
        if (
          selectedMinutes === timeRange.start ||
          (selectedMinutes > timeRange.start && selectedMinutes < timeRange.end)
        ) {
          return true;
        }
      } else {
        if (
          selectedMinutes > timeRange.start &&
          selectedMinutes < timeRange.end
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // 선택된 시간이 이미 존재하는지 확인하는 함수(등록 모드)
  const checkTimeExistWithoutEdit = (selectedMinutes: number) => {
    for (const timeRange of existTimeRangesWithoutEdit!) {
      if (selectingType === "start") {
        if (
          selectedMinutes === timeRange.start ||
          (selectedMinutes > timeRange.start && selectedMinutes < timeRange.end)
        ) {
          return true;
        }
      } else {
        if (
          selectedMinutes > timeRange.start &&
          selectedMinutes < timeRange.end
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // 확인&유효성(시작시간 < 종료시간)
  const handleConfirm = () => {
    const selectedTime = `${selectedHour}:${selectedMinute}`;
    const selectedMinutes = convertTimeToMinutes(selectedTime);

    if (mode === "create" && checkTimeExist(selectedMinutes)) {
      alert("등록된 일정 중 겹치는 시간이 있습니다! 확인해주세요!");
      return;
    }

    if (mode === "edit" && checkTimeExistWithoutEdit(selectedMinutes)) {
      alert("등록된 일정 중 겹치는 시간이 있습니다! 확인해주세요!");
      return;
    }

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
    <SelectDateModal
      handleClose={onClose}
      handleConfirm={handleConfirm}
      selectedDate={convertTimeFormat(`${selectedHour}:${selectedMinute}`)}
    >
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
    </SelectDateModal>
  );
};

export default SelectTime;
