import browserClient from "@/utils/supabase/client";
import { JoinPersonWithManager } from "./MyStudyList";
import { getJoinedStudyPeopleList } from "@/utils/supabase/supabase-client";
import Image from "next/image";
import { useEffect, useState } from "react";

const ApplyUserIncludeManagerProfileImgList = ({
  studyId,
}: {
  studyId: string;
}) => {
  const [profileUrls, setProfileUrls] = useState<string[]>([]);

  //studyid 바뀔 때 마다 이미지 불러오게
  useEffect(() => {
    const fetchData = async (studyId: string) => {
      try {
        const joinedUserId = await getJoinedStudyPeopleList(studyId);
        //매니저 프로필 불러오기
        const { data: studyData } = await browserClient
          .from("study")
          .select("study_manager")
          .eq("study_id", studyId)
          .single();

        const memberUrls: string[] = [];
        //매니저 프로필 먼저 넣기
        if (studyData?.study_manager) {
          const managerUrl = getProfileImgUrl(studyData?.study_manager);
          memberUrls.push(managerUrl);
        }
        //매니저를 제외한 userProfile넣기
        if (joinedUserId) {
          const memberProfileUrls = joinedUserId
            .filter((item) => item.user.id !== studyData?.study_manager)
            .map((item: JoinPersonWithManager) => {
              return getProfileImgUrl(item.user.id);
            });
          memberUrls.push(...memberProfileUrls);
        }

        setProfileUrls(memberUrls);
      } catch (error) {
        console.error("Error fetching data :", error);
        setProfileUrls([]);
      }
    };
    fetchData(studyId);
    console.log("프로필 데이터", profileUrls);
  }, [studyId]);

  //이미지 프로필 불러오기(user당 하나)
  const getProfileImgUrl = (user_Id: string) => {
    return browserClient.storage
      .from("profile_img")
      .getPublicUrl(user_Id ?? "default").data.publicUrl;
  };

  return (
    <div className="flex -space-x-[10px] rtl:space-x-reverse">
      {/* //map 돌려서 프로필 이미지 여러 개 불러오기 */}
      {profileUrls.map((url, index) => (
        <Image
          key={index}
          alt="profileImg"
          className={`h-9 w-9 rounded-full object-cover ring-2 ring-white ${index === 0 ? "!ring-primary-50" : ""} hover:z-10`}
          src={url}
          width={50}
          height={50}
          unoptimized
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/profile_img/default?t=2024-10-29T12%3A08%3A32.075Z";
          }}
        />
      ))}
    </div>
  );
};

export default ApplyUserIncludeManagerProfileImgList;
