"use client";

import { Tables } from "../../../../../database.types";

const GroupRate = ({
  member,
  achieverList,
}: {
  achieverList: Tables<"timer">[] | null;
  member: string[] | null;
}) => {
  return (
    <div className="h-1/2 min-w-[128px] rounded-[20px] bg-secondary-50 p-4">
      <div className="caption text-secondary-800">시간 달성인원</div>
      <p className="title-20-r mt-[14px] text-center text-black">
        <span className="title-20-b">
          {achieverList?.length ? achieverList.length : 0}
        </span>{" "}
        / {member ? member.length : 1}
      </p>
    </div>
  );
};

export default GroupRate;
