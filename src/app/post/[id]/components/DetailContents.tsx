import {
  fetchStudyApplyList,
  fetchStudyInfo,
  fetchUserInfo,
} from "@/utils/supabase/supabase-server";
import { Tables } from "../../../../../database.types";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { convertUTCToKST } from "@/utils/convertDate";
import LikeCount from "./LikeCount";
import OpenStudyProfile from "./OpenStudyProfile";
import ContentsEdit from "./ContentsEdit";

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

  const changeDateForm = (dateString: string) => {
    return dateString.replaceAll("-", ".");
  };

  return (
    <div className="w-full">
      <section>
        <h1 className="text-[#444] title-20-b">{postData.post_name}</h1>
        <div className="flex my-2">
          {studyData.study_category.map((category) => (
            <span
              className="px-3 py-1 mr-1.5 rounded-2xl bg-[#F2F2F2] text-[#595959] text-xs font-bold tracking-tight"
              key={category}
            >
              {category}
            </span>
          ))}
        </div>
        <div className="flex items-center mb-4 relative">
          <Image
            src={`${profileImg}?t=${Date.now()}`}
            alt="유저 이미지"
            width={27}
            height={27}
            className="rounded-full border-none aspect-square object-cover mr-2"
          />
          <span className="body-14-m text-secondary-500">{userData.name}</span>
          <span className="body-14-r text-secondary-500 ml-[11px] leading-relaxed tracking-[-0.28px]">
            {convertUTCToKST(postData?.post_createtime).dateOnly}
          </span>
          <ContentsEdit postId={id} userId={postData.user_id} />
        </div>
        <div className="grid grid-cols-[82px_1fr] gap-y-3 min-w-[327px] p-5 rounded-lg bg-c-background mb-[27px] body-14-r ">
          <p className="text-secondary-400">모집 인원</p>
          <p>
            {applyNumber} / {studyData.study_max_people}
          </p>
          <p className="text-secondary-400">시작 예정일</p>
          <p> {changeDateForm(postData.study_startday!)}</p>
          <p className="text-secondary-400">스터디 이름</p>
          <div className="flex items-center">
            <p> {studyData.study_name}</p>
            <OpenStudyProfile userId={postData.user_id} />
          </div>
        </div>
      </section>
      <main>
        <p className="whitespace-pre-wrap break-words min-w-[327px]">
          {postData.post_contents}
        </p>
      </main>
      <LikeCount postId={id} />
    </div>
  );
};

export default DetailContents;
