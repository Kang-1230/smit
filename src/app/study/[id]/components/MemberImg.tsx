import Image from "next/image";
import { Tables } from "../../../../../database.types";
import browserClient from "@/utils/supabase/client";
import ModalOverlay from "@/components/common/ModalOverlay";
import useModalOpen from "@/hooks/useModalOpen";

const MemberImg = ({ user }: { user: Tables<"user"> }) => {
  const profileImg = browserClient.storage
    .from("profile_img")
    .getPublicUrl(user.profile_img ?? "default").data.publicUrl;

  const { isModalOpen, modalOpen, modalClose } = useModalOpen();

  return (
    <div className="relative w-12 h-12">
      <Image
        src={profileImg}
        alt={`${user.name}-img`}
        fill
        className="object-cover rounded-full border-[1px] border-white"
        onClick={modalOpen}
      />
      {isModalOpen && (
        <div
          onClick={modalClose}
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-[rgb(149,149,149,0.6)]"
          style={{ backdropFilter: "blur(20px)" }}
        >
          <div
            className="w-[327px] h-auto bg-white rounded-20  flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          ></div>
        </div>
      )}
    </div>
  );
};

export default MemberImg;
