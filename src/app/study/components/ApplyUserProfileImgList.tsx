import browserClient from "@/utils/supabase/client";
import { JoinPerson } from "./ApplyStudyList";
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

        const urls: string[] = joinedUserId.map((item: JoinPerson) => {
          return getProfileImgUrl(item.user_id);
        });

        setProfileUrls(urls);
      } catch (error) {
        console.error("Error fetching data :", error);
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
    <div className="flex -space-x-4 rtl:space-x-reverse">
      {/* //map 돌려서 프로필 이미지 여러 개 불러오기 */}
      {profileUrls.map((url, index) => (
        <Image
          key={index}
          alt="profileImg"
          className="w-8 h-8 rounded-full dark:border-gray-800 object-cover ring-2 ring-white hover:z-10"
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

export default ApplyUserProfileImgList;
