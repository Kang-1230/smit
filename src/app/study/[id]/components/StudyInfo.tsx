"use client";

import React, { useEffect, useState } from "react";
import { Tables } from "../../../../../database.types";
import browserClient from "@/utils/supabase/client";
import MemberImg from "./MemberImg";

export type profileInfo = {
  user_id: string;
  profile_img: string;
};

const StudyInfo = ({
  study,
  member,
}: {
  study: Tables<"study"> | null;
  member: string[] | null;
}) => {
  const [memberProfile, setMemberProfile] = useState<Tables<"user">[] | null>(
    null,
  );

  useEffect(() => {
    if (member) {
      const getUserProfile = async () => {
        const { data } = await browserClient
          .from("user")
          .select("*")
          .in("id", member);
        setMemberProfile(data);
      };
      getUserProfile();
    }
  }, []);

  if (!study) {
    return <div>로딩 중...</div>; // 데이터가 없을 때 로딩 UI
  }

  return (
    <div className="flex min-w-[327px] flex-col items-center justify-center">
      <h1 className="title-24-b mb-2">{study.study_name}</h1>
      <p className="body-14-r mb-6 text-secondary-200">
        {study.study_description}
      </p>
      <div className="mb-8 flex items-center justify-center gap-x-3">
        {memberProfile?.map((user) => <MemberImg key={user.id} user={user} />)}
      </div>
    </div>
  );
};

export default StudyInfo;
