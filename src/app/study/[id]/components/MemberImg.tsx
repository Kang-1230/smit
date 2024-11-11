import Image from "next/image";
import { Tables } from "../../../../../database.types";

const MemberImg = ({ user }: { user: Tables<"user"> }) => {


  return (
    <div className="relative h-11 w-11">
      <Image
        src={user.profile_img ? user.profile_img : "https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/profile_img/default"} // 기본 이미지 설정
        alt={`${user.name}-img`}
        fill
        priority={true}
        className="rounded-full border-[1px] border-white object-cover"
      />
    </div>
  );
};

export default MemberImg;
