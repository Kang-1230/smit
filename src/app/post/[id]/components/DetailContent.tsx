import {
  fetchStudyInfo,
  fetchUserInfo,
} from "@/utils/supabase/supabase-server";
import { Tables } from "../../../../../database.types";
import Image from "next/image";
import { convertUTCToKST } from "@/utils/convertDate";
import LikeCount from "./LikeCount";
import EditDetailContent from "./EditDetailContent";
import StudyPostInfo from "./StudyPostInfo";
import ContentBadge from "./ContentBadge";

type DetailContentProps = {
  id: string;
  postData: Tables<"post">;
};

const DetailContent = async ({ id, postData }: DetailContentProps) => {
  const studyData = await fetchStudyInfo(postData.study_id);
  const userData = await fetchUserInfo(postData.user_id);

  if (!studyData || !userData) {
    return <div>정보를 불러오는 데 실패했습니다.</div>;
  }

  const limitedContent = postData.post_contents.slice(0, 80);

  return (
    <div className="w-full">
      <section className="xl:h-[580px]">
        <h1 className="title-20-b xl:title-32-b text-[#444] xl:font-medium">
          {postData.post_name}
        </h1>
        <div className="my-2 flex flex-wrap gap-1">
          {studyData?.study_category.map((item, i) => (
            <ContentBadge key={i} item={item} i={i} />
          ))}
        </div>
        <div className="relative mb-4 flex items-center">
          <Image
            src={userData.profile_img!}
            alt="유저 이미지"
            width={27}
            height={27}
            className="mr-2 aspect-square rounded-full border-none object-cover"
          />
          <span className="body-14-m text-secondary-500">{userData.name}</span>
          <span className="body-14-r ml-[11px] leading-relaxed tracking-[-0.28px] text-secondary-500">
            {convertUTCToKST(postData?.post_createtime).dateOnly}
          </span>
          <EditDetailContent postId={id} userId={postData.user_id} />
        </div>
        <StudyPostInfo postData={postData} studyData={studyData} />
        <main>
          <p className="min-w-[327px] whitespace-pre-wrap break-words pb-[100px]">
            {limitedContent}
          </p>
        </main>
      </section>
      <LikeCount postId={id} />
    </div>
  );
};

export default DetailContent;
