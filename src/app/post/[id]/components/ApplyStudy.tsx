"use client";

import { useSession } from "@/hooks/useUserProfile";
import { applyNewStudy } from "@/utils/supabase/supabase-client";
import { useMutation } from "@tanstack/react-query";
import { Tables } from "../../../../../database.types";

const ApplyStudy = ({ postData }: { postData: Tables<"post"> }) => {
  const { data } = useSession();
  const { mutate: applyStudy } = useMutation({
    mutationFn: applyNewStudy,
  });

  return data?.id !== postData.user_id ? (
    <button
      onClick={() => {
        applyStudy(postData.study_id);
      }}
      className="w-[127px] h-[42px] bg-[#4F4F4F] text-white rounded-full my-5"
    >
      신청하기
    </button>
  ) : (
    <button className="w-[127px] h-[42px] bg-[#DFDFDF] text-white rounded-full my-5 cursor-default">
      신청하기
    </button>
  );
};

export default ApplyStudy;
