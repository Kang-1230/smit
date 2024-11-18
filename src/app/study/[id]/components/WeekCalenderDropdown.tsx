import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import DownArrow from "../../../../../public/icons/DownArrowInMyStudy.svg";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

const month = [
  { id: 1, name: "1월", enMonth: "January" },
  { id: 2, name: "2월", enMonth: "February" },
  { id: 3, name: "3월", enMonth: "March" },
  { id: 4, name: "4월", enMonth: "April" },
  { id: 5, name: "5월", enMonth: "May" },
  { id: 6, name: "6월", enMonth: "June" },
  { id: 7, name: "7월", enMonth: "July" },
  { id: 8, name: "8월", enMonth: "August" },
  { id: 9, name: "9월", enMonth: "September" },
  { id: 10, name: "10월", enMonth: "October" },
  { id: 11, name: "11월", enMonth: "November" },
  { id: 12, name: "12월", enMonth: "December" },
];

export default function WeekCalenderDropdown({
  setDropdownOpen,
  dropdownOpen,
}: {
  setDropdownOpen: Dispatch<SetStateAction<boolean>>;
  dropdownOpen: boolean;
}) {
  const [selectedMonth, setSelectedMonth] = useState(month[0]);

  return (
    <Listbox value={selectedMonth} onChange={setSelectedMonth}>
      <h2 className="body-16-m relative mt-[-1.00px] w-fit whitespace-nowrap text-secondary-700">
        {selectedMonth.enMonth}
      </h2>
      <ListboxButton onClick={() => setDropdownOpen(dropdownOpen)}>
        <Image className="h-[16px] w-[16px]" src={DownArrow} alt="DownArrow" />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        className="flex w-[73px] flex-col rounded-[8px] text-center [box-shadow:0_2px_10px_rgba(30,30,30,0.25)]"
      >
        {month.map((month) => (
          <ListboxOption
            key={month.id}
            value={month}
            className="bg-white"
            onClick={() => setSelectedMonth(month)}
          >
            {month.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
