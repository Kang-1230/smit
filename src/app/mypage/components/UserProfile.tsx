"use client";

import browserClient from "@/utils/supabase/client";
import { usePublicUser } from "../../../hooks/useUserProfile";
import Image from "next/image";
import EditProfile from "./EditProfile";
import ModalOverlay from "../../../components/common/ModalOverlay";
import useModalOpen from "@/hooks/useModalOpen";

const UserProfile = () => {
  const { data: user, isLoading, isError } = usePublicUser();
  const { isModalOpen, modalClose, modalOpen } = useModalOpen();

  // 기존 이미지 불러오기
  const profileImg = browserClient.storage
    .from("profile_img")
    .getPublicUrl(user?.profile_img ?? "default").data.publicUrl;

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError || !user) {
    return <div>로그인이 필요합니다</div>;
  }

  if (user)
    return (
      <>
        <div className="flex flex-col items-center pt-[30px] pb-8 bg-c-background">
          <Image
            src={`${profileImg}?t=${Date.now()}`}
            alt="프로필 이미지"
            width={119}
            height={119}
            className="rounded-full border aspect-square object-cover"
            priority={false}
          />
          <div className="text-center mt-5">
            <p className="title-20-s mb-2">
              {user?.name ? user.name : "익명의 사용자"}
            </p>
            <p className="body-14-r text-secondary-300">{user.email}</p>
          </div>
          <button
            className="py-1 px-3 body-14-s bg-tertiary-100 rounded-16 mt-4"
            onClick={modalOpen}
          >
            프로필 수정
          </button>
          {isModalOpen && (
            <ModalOverlay onClick={modalClose}>
              <EditProfile
                profileImg={profileImg}
                user={user}
                modalClose={modalClose}
              />
            </ModalOverlay>
          )}
        </div>
      </>
    );
};

export default UserProfile;
