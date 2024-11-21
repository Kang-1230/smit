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
        <div className="w-full md:mb-[138px] md:mt-[178px]">
          <p className="title-24-b hidden md:block">마이페이지</p>
          <div className="flex w-full flex-col items-center bg-c-background pb-8 pt-[74px] md:relative md:mt-[32px] md:flex-row md:rounded-[32px] md:py-[28px] md:pl-[52px]">
            <div className="relative aspect-square h-[116px] w-[116px] overflow-hidden rounded-full border object-cover md:h-[160px] md:w-[160px]">
              <Image
                src={user.profile_img}
                alt="프로필 이미지"
                fill
                priority
                quality={100}
              />
            </div>
            <div className="text-center md:ml-[32px] md:text-left">
              <div className="mt-[20px] md:mt-0">
                <p className="title-20-s mb-[8px]">
                  {user?.name ? user.name : "익명의 사용자"}
                </p>
                <p className="body-14-r mb-[16px] text-secondary-300 md:mb-[20px]">
                  {user.email}
                </p>
              </div>
              <MyButton
                style="beige"
                size="sm"
                onClick={modalOpen}
                responsiveSize="lg"
              >
                프로필 수정
              </MyButton>
            </div>
            <Image
              src={`/images/MyPage.png`}
              alt="study"
              width={489}
              height={269}
              className="absolute right-0 top-[36px] hidden lg:block"
              priority={true}
            />
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
