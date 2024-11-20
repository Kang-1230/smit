"use client";
import { useState } from "react";
import ScrollPicker from "@/components/common/ScrollPicker";
import { Tables } from "../../../../../database.types";
import { useToast } from "@/hooks/useToast";
import Image from "next/image";

interface WebSelectTimeProps {
  onTimeSelect: (time: string) => void;
  onClose: () => void;
  eventStart: string;
  eventEnd: string;
  selectingType: "start" | "end";
  calendarData: Tables<"calendar">[] | undefined;
  withoutEditData?: Tables<"calendar">[];
  mode: "create" | "edit";
  isWebCalender: boolean;
}

const WebSelectTime = ({
  onTimeSelect,
  onClose,
  eventStart,
  eventEnd,
  selectingType,
  calendarData,
  withoutEditData,
  mode,
  isWebCalender,
}: WebSelectTimeProps) => {
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const { showToast, ToastComponent } = useToast();

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

    if (
      (mode === "create" && checkTimeExist(selectedMinutes)) ||
      (mode === "edit" && checkTimeExistWithoutEdit(selectedMinutes))
    ) {
      showToast("등록된 일정 중 겹치는 시간이 있습니다");
      return;
    }

    if (selectingType === "start" && eventEnd) {
      const endMinutes = convertTimeToMinutes(eventEnd);
      if (selectedMinutes >= endMinutes) {
        showToast("시작 시간이 종료 시간보다 늦을 수 없습니다.");
        return;
      }
    }

    if (selectingType === "end" && eventStart) {
      const startMinutes = convertTimeToMinutes(eventStart);
      if (selectedMinutes <= startMinutes) {
        showToast("종료 시간이 시작 시간보다 빠를 수 없습니다.");
        return;
      }
    }

    onTimeSelect(selectedTime);
    onClose();
  };

  return (
    <div className="hidden w-full items-center justify-center xl:flex">
      <ToastComponent style="darkgray" position="webCalendar" />
      {/* 시간 선택 */}
      <ScrollPicker
        options={hours}
        handleScroll={handleHourScroll}
        selectedItem={selectedHour}
        isWebCalender={isWebCalender}
      />
      <span className="mx-4 text-xl font-bold">:</span>
      {/* 분 선택 */}
      <ScrollPicker
        options={minutes}
        handleScroll={handleMinuteScroll}
        selectedItem={selectedMinute}
        isWebCalender={isWebCalender}
      />
      <div
        onClick={handleConfirm}
        className="absolute right-[84px] rounded-full bg-white p-[3px]"
      >
        <Image src={"/icons/Check.svg"} alt="check" width={18} height={18} />
      </div>
    </div>
  );
};

export default WebSelectTime;
