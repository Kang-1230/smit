import Image from "next/image";
import { Tables } from "../../../../../database.types";
import browserClient from "@/utils/supabase/client";

const MemberImg = ({ user }: { user: Tables<"user"> }) => {
  const profileImg = browserClient.storage
    .from("profile_img")
    .getPublicUrl(user.profile_img ?? "default").data.publicUrl;

  return (
    <div className="relative h-12 w-12">
      <Image
        src={profileImg}
        alt={`${user.name}-img`}
        fill
        className="rounded-full border-[1px] border-white object-cover"
      />
    </div>
  );
};

export default MemberImg;
