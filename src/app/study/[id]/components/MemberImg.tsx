import Image from "next/image";
import { Tables } from "../../../../../database.types";

const MemberImg = ({ user }: { user: Tables<"user"> }) => {
  return (
    <div className="relative h-11 w-11">
      <Image
        src={user.profile_img}
        alt={`${user.name}-img`}
        fill
        className="rounded-full border-[1px] border-white object-cover"
      />
    </div>
  );
};

export default MemberImg;
