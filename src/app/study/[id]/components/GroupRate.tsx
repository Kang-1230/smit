"use client";

import { Tables } from "../../../../../database.types";

const GroupRate = ({
  member,
  achieverList,
}: {
  achieverList: Tables<"timer">[] | null;
  member: Pick<Tables<"study_applylist">, "user_id">[] | null;
}) => {
  return (
    <div className="bg-secondary-50 h-1/2 rounded-[20px] p-4 min-w-[128px]">
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
