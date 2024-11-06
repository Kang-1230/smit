"use client";

import { useQuery } from "@tanstack/react-query";
import { Tables } from "../../../../../database.types";
import browserClient from "@/utils/supabase/client";

const GroupRate = ({
  studyId,
  member,
  current,
}: {
  studyId: string;
  today: string;
  member: Pick<Tables<"study_applylist">, "user_id">[] | null;
  current: Tables<"calendar"> | null;
}) => {
  const { data: achieverList } = useQuery({
    queryKey: ["achievers", studyId, current?.calendar_id],
    queryFn: async () => {
      const { data } = await browserClient
        .from("timer")
        .select("*")
        .eq("calendar_id", current?.calendar_id)
        .gte("time_rate", 80);
      return data;
    },
    enabled: !!current,
  });

  return (
    <div className="bg-secondary-50 h-1/2 rounded-[20px] p-4 min-w-[128px]">
      <div className="caption text-secondary-800">시간 달성인원</div>
      <p className="title-20-r mt-[14px] text-center">
        {/* 매니저는 applylist에 없어서 +1 해줌 */}
        <span className="title-20-b">
          {achieverList?.length ? achieverList.length : 0}
        </span>{" "}
        / {member ? member.length + 1 : 1}
      </p>
    </div>
  );
};

export default GroupRate;
