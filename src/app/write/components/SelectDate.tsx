"use client";
import { useEffect, useState } from "react";
import ScrollPicker from "@/components/common/ScrollPicker";
import SelectDateModal from "@/components/common/SelectDateModal";

interface Props {
  onConfirm: (date: string) => void;
  onClose: () => void;
  mode: string;
}

const SelectDate = (props: Props) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [cnt, setCnt] = useState("");

  // 년,월,일
  const yearOption = Array.from({ length: 2099 - 2024 + 1 }, (_, i) =>
    (2024 + i).toString(),
  );
  const monthOption = Array.from({ length: 13 - 1 }, (_, i) =>
    (1 + i).toString(),
  );
  const [dayOption, setDayOption] = useState<string[]>([]);

  const cntOption = Array.from({ length: 17 - 1 }, (_, i) =>
    (1 + i).toString(),
  );

  useEffect(() => {
    if (year && month) {
      const daysInMonth = getDaysInMonth(Number(year), Number(month));
      const updatedDayOption = [...Array(daysInMonth)].map((_, i) =>
        (i + 1).toString().padStart(1, "0"),
      );
      setDayOption(updatedDayOption);
    }
  }, [year, month]);

  // 년,월,일 선택 스크롤 이벤트 핸들러
  const handleScroll = (e: React.UIEvent<HTMLDivElement>, type: string) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / 40);

    switch (type) {
      case "year":
        setYear(yearOption[index]);
        break;
      case "month":
        setMonth(monthOption[index]);
        break;
      case "day":
        setDay(dayOption[index]);
        break;
      case "cnt":
        setCnt(cntOption[index]);
        break;
    }
  };

  // 윤년 계산
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  return props.mode === "date" ? (
    <SelectDateModal
      handleClose={props.onClose}
      handleConfirm={() => props.onConfirm(`${year}년 ${month}월 ${day}일`)}
      selectedDate={`${year}년 ${month}월 ${day}일`}
    >
      {/* 년 선택 */}
      <ScrollPicker
        options={yearOption}
        handleScroll={(e) => handleScroll(e, "year")}
        selectedItem={year}
      />

      {/* 월 선택 */}
      <ScrollPicker
        options={monthOption}
        handleScroll={(e) => handleScroll(e, "month")}
        selectedItem={month}
      />
      {/* 일 선택 */}
      <ScrollPicker
        options={dayOption}
        handleScroll={(e) => handleScroll(e, "day")}
        selectedItem={day}
      />
    </SelectDateModal>
  ) : (
    <SelectDateModal
      handleClose={props.onClose}
      handleConfirm={() => props.onConfirm(`${cnt}`)}
      selectedDate={`${cnt}명`}
    >
      {/*명 수 선택*/}
      <ScrollPicker
        options={cntOption}
        handleScroll={(e) => handleScroll(e, "cnt")}
        selectedItem={cnt}
      />
    </SelectDateModal>
  );
};

export default SelectDate;
