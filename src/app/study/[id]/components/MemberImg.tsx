import Image from "next/image";
import { Tables } from "../../../../../database.types";
import browserClient from "@/utils/supabase/client";
import useModalOpen from "@/hooks/useModalOpen";

const MemberImg = ({ user }: { user: Tables<"user"> }) => {
  const profileImg = browserClient.storage
    .from("profile_img")
    .getPublicUrl(user.profile_img ?? "default").data.publicUrl;

  const { isModalOpen, modalOpen, modalClose } = useModalOpen();

  return (
    <div className="relative h-12 w-12">
      <Image
        src={profileImg}
        alt={`${user.name}-img`}
        fill
        className="rounded-full border-[1px] border-white object-cover"
        onClick={modalOpen}
      />
      {isModalOpen && (
        <div
          onClick={modalClose}
          className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-[rgb(149,149,149,0.6)]"
          style={{ backdropFilter: "blur(20px)" }}
        >
          <div
            className="flex h-auto w-[327px] items-center justify-center rounded-20 bg-white"
            onClick={(e) => e.stopPropagation()}
          ></div>
        </div>
      )}
    </div>
  );
};

export default MemberImg;
