"use client";

import Image from "next/image";
import { Tables } from "../../../../../database.types";

const GroupRate = ({
  member,
  achieverList,
}: {
  achieverList: Tables<"timer">[] | null;
  member: Tables<"user">[] | null;
}) => {
  return (
    <div className="relative h-full w-full min-w-[128px] rounded-[20px] bg-secondary-50 p-[12px] xl:px-[20px] xl:py-[24px]">
      <div className="caption xl:body-14-r flex flex-row items-center text-secondary-800">
        <div className="relative mr-[4px] h-[16px] w-[16px] xl:h-[20px] xl:w-[20px]">
          <Image src={`/icons/timer/Complete.svg`} alt="book icon" fill />
        </div>
        시간 달성인원
      </div>
      <p className="title-20-r mt-[16px] text-center text-black xl:absolute xl:bottom-[24px] xl:right-[20px]">
        <span className="title-20-b">
          {achieverList?.length ? achieverList.length : 0}
        </span>{" "}
        / {member ? member.length : 1}
      </p>
    </div>
  );
};

export default GroupRate;
