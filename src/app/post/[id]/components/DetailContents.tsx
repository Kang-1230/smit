import {
  fetchStudyApplyList,
  fetchStudyInfo,
  fetchUserInfo,
} from "@/utils/supabase/supabase-server";
import EditButton from "./EditButton";
import { Tables } from "../../../../../database.types";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

type Contents = {
  id: string;
  postData: Tables<"post">;
};

const DetailContents = async ({ id, postData }: Contents) => {
  const studyData = await fetchStudyInfo(postData.study_id);
  const applyData = await fetchStudyApplyList(postData.study_id);
  const userData = await fetchUserInfo(postData.user_id);
  const dateOnly = postData?.post_createtime.slice(0, 10) || "날짜 정보 없음";
  const applyNumber = applyData ? applyData.length : 0;
  const serverClient = createClient();

  // 프로필 이미지
  const profileImg = serverClient.storage
    .from("profile_img")
    .getPublicUrl(userData?.profile_img ?? "default").data.publicUrl;

  if (!studyData || !applyData || !userData) {
    return <div>정보를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div>
      <section>
        <div className="flex justify-between relative">
          <h1 className="text-[20px]">{postData.post_name}</h1>
          <EditButton postId={id} userId={postData.user_id} />
        </div>
        <span>{studyData.study_category}</span>
        <div className="flex items-center">
          <Image
            src={`${profileImg}?t=${Date.now()}`}
            alt="유저 이미지"
            width={40}
            height={40}
            className="rounded-full border aspect-square object-cover mr-[8px]"
          />
          <span>{userData.name}</span>
          <span className="ml-[11px]">{dateOnly}</span>
        </div>
        <span>
          모집 인원 {applyNumber} / {studyData.study_max_people}
        </span>
        <br />
        <span>모집 기간 {studyData.study_period}</span>
        <br />
        <span>스터디 이름 {studyData.study_name}</span>
      </section>
      <main>
        <p className="whitespace-pre">{postData.post_contents}</p>
      </main>
    </div>
  );
};

export default DetailContents;
