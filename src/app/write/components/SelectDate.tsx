"use client";
import { useEffect, useState } from "react";
import ScrollPicker from "@/components/common/ScrollPicker";
import SelectDateModal from "@/components/common/SelectDateModal";

interface Props {
  onConfirm: (date: string | number) => void;
  mode: string;
  selectedDate: string | number | null;
  className?: string;
}

const SelectDate = (props: Props) => {
  //년도 관련

  const currentDate = new Date();

  const [date, setDate] = useState(() => {
    return {
      year: currentDate.getFullYear().toString(),
      month: (currentDate.getMonth() + 1).toString(),
      day: currentDate.getDate().toString(),
    };
  });

  const [isFirst, setIsFirst] = useState<boolean>(true);

  // 년,월,일 옵션
  const yearOption = [...Array(2099 - 2024 + 1)].map((_, i) =>
    (2024 + i).toString(),
  );
  const monthOption = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const [dayOption, setDayOption] = useState<string[]>([]);

  // 인원 수 관련 - 최소 한명은 선택되어야 하기에 일의 자리는 '1'
  const [humanCtn, setHumanCtn] = useState({
    units: "1",
    tens: "0",
  });

  // 인원수 옵션
  const tensOption = ["0", "1"];
  const unitOption =
    humanCtn.tens === "1"
      ? ["0", "1", "2", "3", "4", "5", "6"]
      : ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  // 윤년 계산
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  //년도랑 월 변경에 따른 윤년 날짜 계산
  useEffect(() => {
    if (date.year && date.month) {
      const daysInMonth = getDaysInMonth(Number(date.year), Number(date.month));
      setDayOption(
        [...Array(daysInMonth)].map((_, i) =>
          (i + 1).toString().padStart(1, "0"),
        ),
      );
    }
  }, [date.year, date.month]);

  // 년,월,일 선택 스크롤 이벤트 핸들러
  const handleScroll = (e: React.UIEvent<HTMLDivElement>, type: string) => {
    const container = e.currentTarget;
    let index = Math.round(container.scrollTop / 40);

    switch (type) {
      case "year":
        if (isFirst) {
          index = yearOption.indexOf(date.year); // isFirst일 때는 date.year에 맞는 index로 설정
        }

        if (yearOption[index] !== undefined) {
          setDate((prev) => ({ ...prev, year: yearOption[index] }));
        }
        break;
      case "month":
        if (isFirst) {
          index = monthOption.indexOf(date.month); // isFirst일 때는 date.year에 맞는 index로 설정
        }

        if (monthOption[index] !== undefined) {
          setDate((prev) => ({ ...prev, month: monthOption[index] }));
        }
        break;
      case "day":
        if (isFirst) {
          index = dayOption.indexOf(date.day); // isFirst일 때는 date.year에 맞는 index로 설정
          setIsFirst(false);
        }

        if (dayOption[index] !== undefined) {
          setDate((prev) => ({ ...prev, day: dayOption[index] }));
        }
        break;
      case "tens":
        if (tensOption[index] !== undefined) {
          setHumanCtn((prev) => ({
            ...prev,
            tens: tensOption[index],
          }));
        }
        break;
      case "units":
        if (unitOption[index] !== undefined) {
          setHumanCtn((prev) => ({
            ...prev,
            units: unitOption[index],
          }));
        }
        break;
    }
  };

  return props.mode === "date" ? (
    <SelectDateModal
      handleClose={() =>
        props.onConfirm(`${date.year}년 ${date.month}월 ${date.day}일`)
      }
      handleConfirm={() =>
        props.onConfirm(`${date.year}년 ${date.month}월 ${date.day}일`)
      }
      selectedDate={`${date.year}년 ${date.month}월 ${date.day}일`}
    >
      {/* 년 선택 */}
      <ScrollPicker
        options={yearOption}
        handleScroll={(e) => handleScroll(e, "year")}
        selectedItem={date.year}
      />

      {/* 월 선택 */}
      <ScrollPicker
        options={monthOption}
        handleScroll={(e) => handleScroll(e, "month")}
        selectedItem={date.month}
      />
      {/* 일 선택 */}
      <ScrollPicker
        options={dayOption}
        handleScroll={(e) => handleScroll(e, "day")}
        selectedItem={date.day}
      />
    </SelectDateModal>
  ) : (
    <SelectDateModal
      className={props.className}
      handleClose={() =>
        props.onConfirm(`${Number(humanCtn.tens + humanCtn.units)}`)
      }
      handleConfirm={() =>
        props.onConfirm(`${Number(humanCtn.tens + humanCtn.units)}`)
      }
      selectedDate={`${Number(humanCtn.tens + humanCtn.units)}명`}
    >
      {/*십의 자리 명 수 선택*/}
      <ScrollPicker
        options={tensOption}
        handleScroll={(e) => handleScroll(e, "tens")}
        selectedItem={humanCtn.tens}
      />

      {/*일의 자리-명 수 선택*/}
      <ScrollPicker
        options={unitOption}
        handleScroll={(e) => handleScroll(e, "units")}
        selectedItem={humanCtn.units}
      />
    </SelectDateModal>
  );
};

export default SelectDate;
