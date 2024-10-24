"use client";

import browserClient from "@/utils/supabase/client";
import { usePublicUser } from "../../../hooks/useUserProfile";
import Image from "next/image";
import { useState } from "react";
import EditProfile from "./EditProfile";

const UserProfile = () => {
  const { data: user, isLoading, isError } = usePublicUser();
  const [isEditMode, setIsEditMode] = useState(false);

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
        <div className="flex flex-col gap-y-4 items-center">
          {!isEditMode ? (
            <>
              <Image
                src={`${profileImg}?t=${Date.now()}`}
                alt="프로필 이미지"
                width={128}
                height={128}
                className="rounded-full border aspect-square object-cover"
                priority={false}
              />
              <div className="text-center">
                <p className="font-bold text-xl mb-1">
                  {user?.name ? user.name : "익명의 사용자"}
                </p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <button
                className="py-2 px-3 bg-gray-300 rounded-lg text-xs font-semibold"
                onClick={() => setIsEditMode(!isEditMode)}
              >
                프로필 수정
              </button>
            </>
          ) : (
            <EditProfile
              profileImg={profileImg}
              user={user}
              setIsEditMode={setIsEditMode}
            />
          )}
          <div className="flex flex-col gap-y-2">
            <button className="text-xs font-semibold">로그아웃</button>
          </div>
        </div>
      </>
    );
};

export default UserProfile;
