// 출석률 표시
"use client";

import Image from "next/image";

const AttendanceRate = ({
  attendee,
  member,
}: {
  attendee: number | null;
  member: string[] | null;
}) => {
  return (
    <div className="relative min-h-[99px] w-full rounded-20 bg-gradient-to-br from-[#8D8D8D] to-[#656565] p-[1px]">
      <div className="relative h-full w-full overflow-hidden rounded-20 bg-secondary-800 text-white">
        <div className="absolute -top-3 left-0 h-12 w-14 rounded-full bg-[rgba(255,153,69,0.3)] blur-xl"></div>
        <div className="h-full w-full rounded-20 bg-gradient-to-b from-[#6d6d6d80] to-[#6b696980] p-4">
          <div className="caption flex flex-row items-center text-secondary-200">
            <Image
              src={`/icons/timer/UserLined.svg`}
              alt="book icon"
              width={16}
              height={16}
              className="mr-1"
            />
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
