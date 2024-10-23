"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Tables } from "../../../../database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/utils/supabase/client-actions";
import browserClient from "@/utils/supabase/client";

const EditProfile = ({
  profileImg,
  user,
  setIsEditMode,
}: {
  profileImg: string;
  user: Tables<"user">;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const [uploadImg, setUploadImg] = useState<null | string>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState(user?.name ? user.name : "");

  // 프로필 이미지 업로드 했을 때
  const ImageUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setUploadImg(reader.result as string);
        };
      }
    }
  };

  // 프로필 수정하는 부분
  const { mutate: updateProfile } = useMutation({
    mutationFn: () =>
      updateUserProfile(userName, uploadImg ? user.id : "default"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "public"],
      });
    },
  });

  // 실제로 수정버튼 눌렀을 때 실행되는 부분 (이미지 먼저 스토리지로 보냄)
  const profileSaveHandler = async () => {
    if (fileInputRef.current?.files) {
      if (fileInputRef.current.files.length > 0) {
        const { error } = await browserClient.storage
          .from("profile_img")
          .upload(`${user?.id}`, fileInputRef.current.files[0], {
            upsert: true,
          });

        if (error) {
          console.log("이미지 업로드 중 오류 발생", error);
          return;
        }
      }
    }
    updateProfile();
    setIsEditMode((prev) => !prev);
  };

  return (
    <>
      <Image
        src={uploadImg ? uploadImg : `${profileImg}?t=${Date.now()}`}
        alt="프로필 이미지"
        width={128}
        height={128}
        className="rounded-full border aspect-square object-cover"
        onClick={() => {
          if (fileInputRef.current) fileInputRef.current.click();
        }}
        priority={false}
      />
      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        onChange={(e) => ImageUploadHandler(e)}
      />
      <div className="text-center">
        <input
          className="mb-1 border p-1 rounded-md"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <p className="text-sm text-gray-600">{user?.email}</p>
      </div>
      <button
        className="py-2 px-3 bg-gray-300 rounded-lg text-xs font-semibold"
        onClick={() => profileSaveHandler()}
      >
        프로필 저장
      </button>
    </>
  );
};

export default EditProfile;
