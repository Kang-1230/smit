import Badge from "@/components/common/Badge";
import Image from "next/image";
import { Tables } from "../../../../database.types";
import { useStudyMember } from "@/hooks/useStudy";

const SelectStudyCard = ({ studyInfo }: { studyInfo: Tables<"study"> }) => {
  const { data: member } = useStudyMember(studyInfo.study_id);

  return (
    <div className="mt-[8px] w-full flex-col justify-center rounded-12 bg-tertiary-75 px-[20px] py-[16px]">
      <div className="mb-[12px] flex items-center">
        <Image
          src={
            studyInfo.study_imgurl ||
            "https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/study_img/default"
          }
          alt="img"
          width={61}
          height={61}
          className="aspect-square rounded-8"
        />
        <div className="ml-[12px] flex w-full flex-col gap-y-[8px] overflow-hidden">
          <p className="body-16-s w-full truncate text-secondary-800">
            이러쿵저러쿵완sdfsdfsdfsdfdaklf;jsd
          </p>
          <div className="flex items-center">
            <Image
              src={`/icons/study/User.svg`}
              alt="user"
              width={14}
              height={14}
              className="mr-[2px]"
            />
            <p className="caption tracking-wider text-secondary-500">
              {member?.length}/{studyInfo.study_max_people}명
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-start gap-x-[4px]">
        {studyInfo &&
          studyInfo.study_category &&
          studyInfo.study_category.map((category, idx) => (
            <Badge
              category={category}
              color="primary"
              idx={idx}
              key={`${studyInfo.study_id}-${category}`}
            />
          ))}
      </div>
    </div>
  );
};

export default SelectStudyCard;
