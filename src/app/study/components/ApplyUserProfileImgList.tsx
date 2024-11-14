import browserClient from "@/utils/supabase/client";
import { JoinPersonWithManager } from "./MyStudyList";
import { getJoinedStudyPeopleList } from "@/utils/supabase/supabase-client";
import Image from "next/image";
import { useEffect, useState } from "react";

const ApplyUserProfileImgList = ({ studyId }: { studyId: string }) => {
  const [profileUrls, setProfileUrls] = useState<string[]>([]);

  //studyid 바뀔 때 마다 이미지 불러오게
  useEffect(() => {
    const fetchData = async () => {
      try {
        const joinedUserId = await getJoinedStudyPeopleList(studyId);
        if (!joinedUserId) {
          setProfileUrls([]);
          return;
        }

        const memberUrls: string[] = joinedUserId?.map(
          (item: JoinPersonWithManager) => {
            return getProfileImgUrl(item.user.id);
          },
        );

        if (joinedUserId[0]?.study?.study_manager) {
          const managerUrl = getProfileImgUrl(
            joinedUserId[0].study.study_manager,
          );
          memberUrls.unshift(managerUrl);
        }

        setProfileUrls(memberUrls);
      } catch (error) {
        console.error("Error fetching data :", error);
        setProfileUrls([]);
      }
    };
    fetchData();
  }, [studyId]);

  //이미지 프로필 불러오기(user당 하나)
  const getProfileImgUrl = (user_Id: string) => {
    return browserClient.storage
      .from("profile_img")
      .getPublicUrl(user_Id ?? "default").data.publicUrl;
  };

  return (
    <div className="absolute flex w-[287px] items-center justify-between">
      <div className="relative inline-flex flex-[0_0_auto] items-center">
        {/* //map 돌려서 프로필 이미지 여러 개 불러오기 */}
        {profileUrls.map((url, index) => (
          <Image
            key={index}
            alt="profileImg"
            className="relative -ml-2.5 h-9 w-9 rounded-full object-cover"
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
    </div>
  );
};

export default ApplyUserProfileImgList;
