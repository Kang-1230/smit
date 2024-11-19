// 출석률 표시
"use client";

import Image from "next/image";
import { Tables } from "../../../../../database.types";

const AttendanceRate = ({
  attendee,
  member,
}: {
  attendee: number | null;
  member: Tables<"user">[] | null;
}) => {
  return (
    <div className="relative min-h-[99px] w-full rounded-20 bg-gradient-to-br from-[#8D8D8D] to-[#656565] p-[1px]">
      <div className="relative h-full w-full overflow-hidden rounded-20 bg-secondary-800 text-white">
        <div className="absolute -top-3 left-0 h-12 w-14 rounded-full bg-[rgba(255,153,69,0.3)] blur-xl"></div>
        <div className="h-full w-full rounded-20 bg-gradient-to-b from-[#6d6d6d80] to-[#6b696980] p-4">
          <div className="caption xl:body-14-r flex flex-row items-center text-secondary-200 xl:items-end">
            <div className="relative mr-[4px] h-[16px] w-[16px] xl:h-[20px] xl:w-[20px]">
              <Image src={`/icons/timer/UserLined.svg`} alt="book icon" fill />
            </div>
            출석인원
          </div>
          <p className="title-20-r mt-[14px] text-center">
            <span className="title-20-b">{attendee ? attendee : 0}</span> /{" "}
            {member ? member.length : 1}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceRate;
