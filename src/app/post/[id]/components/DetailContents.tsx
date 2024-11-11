import {
  fetchStudyApplyList,
  fetchStudyInfo,
  fetchUserInfo,
} from "@/utils/supabase/supabase-server";
import { Tables } from "../../../../../database.types";
import Image from "next/image";
import { convertUTCToKST } from "@/utils/convertDate";
import LikeCount from "./LikeCount";
import OpenStudyProfile from "./OpenStudyProfile";
import ContentsEdit from "./ContentsEdit";
import CustomButton from "@/components/ui/CustomButton";

type Contents = {
  id: string;
  postData: Tables<"post">;
};

const DetailContents = async ({ id, postData }: Contents) => {
  const studyData = await fetchStudyInfo(postData.study_id);
  const applyData = await fetchStudyApplyList(postData.study_id);
  const userData = await fetchUserInfo(postData.user_id);
  const applyNumber =
    applyData?.filter((apply) => apply.is_approved).length ?? 0;

  if (!studyData || !applyData || !userData) {
    return <div>정보를 불러오는 데 실패했습니다.</div>;
  }

  const changeDateForm = (dateString: string) => {
    return dateString.replaceAll("-", ".");
  };

  return (
    <div className="w-full">
      <section>
        <h1 className="title-20-b text-[#444]">{postData.post_name}</h1>
        <div className="my-2 flex flex-wrap gap-1">
          {studyData?.study_category.map((item, i) => (
            <CustomButton
              text={item}
              size="medium"
              bgColor={i === 0 ? "#BFA28D" : "#FF9945"}
              key={item}
            />
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
          <ContentsEdit postId={id} userId={postData.user_id} />
        </div>
        <div className="body-14-r mb-[27px] grid min-w-[327px] grid-cols-[82px_1fr] gap-y-3 rounded-lg bg-c-background p-5">
          <p className="text-secondary-400">모집 인원</p>
          <p>
            {applyNumber} / {studyData.study_max_people - 1}
          </p>
          <p className="text-secondary-400">시작 예정일</p>
          <p> {changeDateForm(postData.study_startday!)}</p>
          <p className="text-secondary-400">스터디 이름</p>
          <div className="flex items-center">
            <p> {studyData.study_name}</p>
            <OpenStudyProfile
              userId={postData.user_id}
              studyId={postData.study_id}
            />
          </div>
        </div>
      </section>
      <main>
        <p className="min-w-[327px] whitespace-pre-wrap break-words pb-[100px]">
          {postData.post_contents}
        </p>
      </main>
      <LikeCount postId={id} />
    </div>
  );
};

export default DetailContents;
