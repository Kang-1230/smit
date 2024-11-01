import {
  fetchStudyApplyList,
  fetchStudyInfo,
  fetchUserInfo,
} from "@/utils/supabase/supabase-server";
import EditButton from "./EditButton";
import { Tables } from "../../../../../database.types";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { convertUTCToKST } from "@/utils/convertDate";
import LikeCount from "./LikeCount";

type Contents = {
  id: string;
  postData: Tables<"post">;
};

const DetailContents = async ({ id, postData }: Contents) => {
  const studyData = await fetchStudyInfo(postData.study_id);
  const applyData = await fetchStudyApplyList(postData.study_id);
  const userData = await fetchUserInfo(postData.user_id);
  const applyNumber = applyData ? applyData.length : 0;
  const serverClient = createClient();

  // 프로필 이미지
  const profileImg = serverClient.storage
    .from("profile_img")
    .getPublicUrl(userData?.profile_img ?? "default").data.publicUrl;

  if (!studyData || !applyData || !userData) {
    return <div>정보를 불러오는 데 실패했습니다.</div>;
  }

  console.log("프로필 이미지 예시", userData.profile_img);

  return (
    <div className="w-full">
      <section>
        <div className="flex justify-between relative">
          <h1 className="text-[#444] text-xl font-semibold tracking-tight mb-3">
            {postData.post_name}
          </h1>
          <EditButton postId={id} userId={postData.user_id} />
        </div>
        <div>
          {studyData.study_category.map((category) => (
            <span
              className="px-3 py-1 mr-1.5 rounded-2xl bg-[#F2F2F2] text-[#595959] text-xs font-bold tracking-tight"
              key={category}
            >
              {category}
            </span>
          ))}
        </div>
        <div className="flex items-center mt-6">
          <Image
            src={`${profileImg}?t=${Date.now()}`}
            alt="유저 이미지"
            width={27}
            height={27}
            className="rounded-full border aspect-square object-cover mr-[8px]"
          />
          <span>{userData.name}</span>
          <span className="ml-[11px]">
            {convertUTCToKST(postData?.post_createtime).dateOnly}
          </span>
        </div>
        <hr className="mt-3 mb-4" />
        <div className="grid grid-cols-[82px_1fr]">
          <p>모집 인원</p>
          <p>
            {applyNumber} / {studyData.study_max_people}
          </p>
          <p>시작 예정일</p>
          <p> {postData.study_startday}</p>
          <p>스터디 이름</p>
          <p> {studyData.study_name}</p>
        </div>
        <hr className="mt-3 mb-4" />
      </section>
      <main>
        <p className="whitespace-pre-wrap break-words mb-20">
          {postData.post_contents}
        </p>
      </main>
      <div className="flex justify-end border-b-2 pb-2">
        <LikeCount postId={id} />
      </div>
    </div>
  );
};

export default DetailContents;
