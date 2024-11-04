"use client";

import { useQuery } from "@tanstack/react-query";
import { Tables } from "../../../../database.types";
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
  });

  return (
    <div className="bg-red-200 h-1/2 rounded-[20px] p-4">
      <p className="text-xs">공부시간 달성률</p>
      <p className="text-xl mt-[14px] text-center">
        {/* 매니저는 applylist에 없어서 +1 해줌 */}
        <span className="font-semibold">
          {achieverList ? achieverList.length : 0}
        </span>
        /{member ? member.length + 1 : 1}
      </p>
    </div>
  );
};

export default GroupRate;
