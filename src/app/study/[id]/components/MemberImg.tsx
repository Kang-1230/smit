import Image from "next/image";
import { Tables } from "../../../../../database.types";

const MemberImg = ({ user }: { user: Tables<"user"> }) => {
  return (
    <div className="relative h-[48px] w-[48px] overflow-hidden rounded-full xl:h-[40px] xl:w-[40px]">
      <Image
        src={user.profile_img} // 기본 이미지 설정
        alt={`${user.name}-img`}
        priority={true}
        fill
        sizes="48"
        loading="eager"
        className="object-cover"
      />
      <div className="absolute inset-0 rounded-full border-[2px] border-white/50"></div>
    </div>
  );
};

export default MemberImg;
