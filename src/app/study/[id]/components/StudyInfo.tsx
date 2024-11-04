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
import MultiCarousel from "@/components/home/MultiCarousel";

export type profileInfo = {
  user_id: string;
  profile_img: string;
};

const StudyInfo = ({ studyId }: { studyId: string }) => {
  // 스터디 정보
  const [studyInfo, setStudyInfo] = useState<Tables<"study">>();
  // 스터디 유저 정보
  const [userInfo, setUserInfo] = useState<profileInfo[]>([]);

  // 스터디 정보
  const { mutate: getStundyInfo } = useMutation({
    mutationFn: () => fetchStudyInfo(studyId),
    onSuccess: (data) => {
      if (data !== null) {
        // 스터디 정보 설정
        setStudyInfo(data);
        // 스터디 유저 정보 설정 1
        setUserInfo([{ user_id: data.study_manager, profile_img: "" }]);
      }
    },
    onError: () => {
      alert("스터디 정보를 가져오지 못했습니다.");
    },
  });

  // 스터디에 소속된 유저 설정
  const { mutate: getUserInfo } = useMutation({
    mutationFn: () => fetchStudyApplyUserId(studyId),
    onSuccess: async (data) => {
      if (data !== null) {
        const userIds = [
          userInfo[0].user_id,
          ...data.map((item) => item.user_id),
        ];

        //스터디 생성자와 소속 그룹 인원의 userId 배열 생성
        const userData = await fetchUsersImgUrl(userIds);

        const userImgData = userData?.map((item) => {
          return browserClient.storage
            .from("profile_img")
            .getPublicUrl(item.profile_img).data.publicUrl;
        });

        // userData userImgData 둘 다 존재 시
        if (userData && userImgData) {
          // 스터디 유저 정보 설정 2
          const newUserInfo = userData.map((item, index) => ({
            user_id: item.id,
            profile_img: userImgData[index],
          }));

          setUserInfo(newUserInfo);
        } else {
          console.log("가져오는 과정에서 에러니?");
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

  return (
    <div className="flex flex-col justify-center items-center gap-2 p-3">
      <h1 className="text-3xl font-bold text-white">{studyInfo?.study_name}</h1>
      <p className="text-[#cccccc] text-sm font-normal">
        {studyInfo?.study_description}
      </p>
      {/* <MultiCarousel> */}
      <div className="flex justify-center items-center p-3">
        {userInfo.map((item) => {
          return (
            <Image
              src={item.profile_img}
              width={30}
              height={30}
              alt="userImg"
              key={item.user_id}
              className="rounded-full"
              layout="fixed"
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
      {/* </MultiCarousel> */}
    </div>
  );
};

export default StudyInfo;
