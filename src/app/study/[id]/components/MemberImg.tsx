import Image from "next/image";
import { Tables } from "../../../../../database.types";

const MemberImg = ({ user }: { user: Tables<"user"> }) => {
  return (
    <div className="relative h-12 w-12 rounded-full overflow-hidden border-[1px] border-white">
      <Image
  src={user.profile_img} // 기본 이미지 설정
  alt={`${user.name}-img`}
  priority={true}
  width={48}
  height={48}
  className="object-cover w-full h-full"
        
      />
    </div>
  );
};

export default MemberImg;
