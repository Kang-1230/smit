"use client";
import {
  fetchStudyApplyUserId,
  fetchStudyInfo,
  fetchUsersImgUrl,
} from "@/utils/supabase/supabase-server";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Tables } from "../../../../../database.types";
import Image from "next/image";
import browserClient from "@/utils/supabase/client";

export type profileInfo = {
  user_id: string;
  profile_img: string;
};

const StudyInfo = ({ studyId }: { studyId: string }) => {
  const [studyInfo, setStudyInfo] = useState<Tables<"study"> | null>(null);
  const [userInfo, setUserInfo] = useState<profileInfo[]>([]);

  const { mutate: getStundyInfo } = useMutation({
    mutationFn: () => fetchStudyInfo(studyId),
    onSuccess: (data) => {
      if (data) {
        setStudyInfo(data);
        setUserInfo([{ user_id: data.study_manager, profile_img: "" }]);
      }
    },
    onError: () => {
      alert("스터디 정보를 가져오지 못했습니다.");
    },
  });

  const { mutate: getUserInfo } = useMutation({
    mutationFn: () => fetchStudyApplyUserId(studyId),
    onSuccess: async (data) => {
      if (data) {
        const userIds = [
          userInfo[0].user_id,
          ...data.map((item) => item.user_id),
        ];

        const userData = await fetchUsersImgUrl(userIds);

        const userImgData = userData?.map((item) => {
          return browserClient.storage
            .from("profile_img")
            .getPublicUrl(item.profile_img).data.publicUrl;
        });

        if (userData && userImgData) {
          const newUserInfo = userData.map((item, index) => ({
            user_id: item.id,
            profile_img: userImgData[index],
          }));

          setUserInfo(newUserInfo);
        }
      }
    },
    onError: () => {
      alert("유저 프로필 정보를 가져오지 못했습니다.");
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      await getStundyInfo();
      await getUserInfo();
    };

    fetchData();
  }, []);

  if (!studyInfo) {
    return <div>로딩 중...</div>; // 데이터가 없을 때 로딩 UI
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2 p-3">
      <h1 className="text-3xl font-bold">{studyInfo.study_name}</h1>
      <p className="text-sm font-normal">{studyInfo.study_description}</p>
      <div className="flex justify-center items-center p-3">
        {userInfo.map((item) => {
          return (
            <Image
              src={item.profile_img || "/defaultProfileImg.png"} // 기본 이미지 설정
              width={30}
              height={30}
              alt="userImg"
              key={item.user_id}
              className="rounded-full"
              onClick={() =>
                alert(
                  `그룹 페이지 Modal 기능 진행 중입니다. 잠시 후 서비스 하겠습니다. ` +
                    item.user_id,
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default StudyInfo;
