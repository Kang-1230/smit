"use client";

import { usePublicUser } from "../../../hooks/useUserProfile";
import Image from "next/image";
import EditProfile from "./EditProfile";
import ModalOverlay from "../../../components/common/ModalOverlay";
import useModalOpen from "@/hooks/useModalOpen";
import MyButton from "@/components/common/Button";

const UserProfile = () => {
  const { data: user, isLoading, isError } = usePublicUser();
  const { isModalOpen, modalClose, modalOpen } = useModalOpen();

  // 기존 이미지 불러오기

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError || !user) {
    return <div>로그인이 필요합니다</div>;
  }

  if (user)
    return (
      <>
        <p className="title-24-b mt-[178px] hidden xl:block">마이페이지</p>
        <div className="flex flex-col items-center bg-c-background pb-8 pt-[74px] xl:mb-[138px] xl:mt-[32px] xl:flex-row xl:rounded-[32px] xl:py-[28px] xl:pl-[52px]">
          <div className="relative aspect-square h-[116px] w-[116px] overflow-hidden rounded-full border object-cover xl:h-[160px] xl:w-[160px]">
            <Image
              src={user.profile_img}
              alt="프로필 이미지"
              fill
              priority={true}
              quality={100}
            />
          </div>
          <div className="xl:ml-[32px]">
            <div className="mt-[20px] text-center xl:mt-0 xl:text-left">
              <p className="title-20-s mb-[8px]">
                {user?.name ? user.name : "익명의 사용자"}
              </p>
              <p className="body-14-r mb-[16px] text-secondary-300 xl:mb-[20px]">
                {user.email}
              </p>
            </div>
            <MyButton
              style="beige"
              size="sm"
              onClick={modalOpen}
              responsiveSize="md"
            >
              프로필 수정
            </MyButton>
          </div>
          {isModalOpen && (
            <ModalOverlay onClick={modalClose}>
              <EditProfile user={user} modalClose={modalClose} />
            </ModalOverlay>
          )}
        </div>
      </>
    );
};

export default UserProfile;
