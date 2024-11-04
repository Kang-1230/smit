"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Tables } from "../../../../database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/utils/supabase/supabase-client";
import browserClient from "@/utils/supabase/client";

const EditProfile = ({
  profileImg,
  user,
  modalClose,
}: {
  profileImg: string;
  user: Tables<"user">;
  modalClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const [uploadImg, setUploadImg] = useState<null | string>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState(user?.name ? user.name : "");
  const [isUnique, setIsUnique] = useState("change");

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
    if (isUnique === "unique") {
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
      alert("프로필 수정 완료!");
    } else if (isUnique === "change") {
      alert("닉네임 중복검사를 진행해주세요!");
      return;
    }
  };

  // 닉네임 중복검사
  const validateNickname = async () => {
    const { data }: { data: Tables<"user">[] | null } = await browserClient
      .from("user")
      .select("*");
    const nickName = data?.filter((u) => u.id !== user.id).map((u) => u.name);
    if (nickName?.includes(userName)) {
      setIsUnique("notUnique");
    } else setIsUnique("unique");
  };

  // 중복검사 후 띄울 안내 메세지
  const validate =
    isUnique === "change"
      ? ""
      : isUnique === "unique"
      ? "사용 가능한 닉네임 입니다."
      : "이미 사용하고 있는 닉네임 입니다.";

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center gap-6">
        <p className="text-xl font-bold">프로필 수정</p>

        <div className="w-full aspect-square relative">
          <Image
            // supabase 내에서 캐싱된 이미지를 주는 바람에 뒤에 date.now 붙여서 계속 새 이미지로 받아옴
            src={uploadImg ? uploadImg : `${profileImg}?t=${Date.now()}`}
            alt="프로필 이미지"
            fill
            className="rounded-xl border object-cover"
            onClick={() => fileInputRef.current?.click()}
            priority={false}
          />
        </div>
        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          onChange={(e) => ImageUploadHandler(e)}
        />

        <div>
          <p className="text-sm font-semibold text-gray-600">닉네임</p>
          <div className="flex justify-between items-center gap-2">
            <input
              className="border-b-2 flex-grow h-8 focus:outline-none w-3/5"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setIsUnique("change");
              }}
            />
            <button
              className="h-8 px-4 bg-gray-500 text-sm rounded-xl text-white"
              onClick={validateNickname}
            >
              중복확인
            </button>
          </div>

          <p className="text-xs text-red-500 mt-1">{validate}</p>
        </div>
      </div>

      <button
        className="w-full py-2 bg-gray-500 rounded-3xl font-medium text-white mt-6"
        onClick={() => {
          profileSaveHandler();
          modalClose();
        }}
        disabled={isUnique === "notUnique"}
      >
        적용하기
      </button>
    </div>
  );
};

export default EditProfile;
