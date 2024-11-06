"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Tables } from "../../../../database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/utils/supabase/supabase-client";
import browserClient from "@/utils/supabase/client";
import ValidateInput from "@/components/common/ValidateInput";
import MyButton from "@/components/common/Button";
import TitleInput from "@/components/common/TitleInput";

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
      updateProfile();
      alert("프로필 수정 완료!");
    }
  };

  // 닉네임 중복검사
  const validateNickname = async () => {
    if (!/^[가-힣a-zA-Z0-9]+$/.test(userName)) {
      setIsUnique("impossible");
      return;
    }
    const { data }: { data: Tables<"user">[] | null } = await browserClient
      .from("user")
      .select("*");
    const nickName = data?.filter((u) => u.id !== user.id).map((u) => u.name);
    if (nickName?.includes(userName)) {
      setIsUnique("notUnique");
    } else setIsUnique("unique");
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setIsUnique("change");
  };

  return (
    <div className="flex flex-col p-5 items-center w-full">
      <p className="title-20-s text-center">프로필 수정</p>
      <div className="relative w-fit h-wit my-4">
        <Image
          src={uploadImg ? uploadImg : `${profileImg}?t=${Date.now()}`}
          alt="프로필 이미지"
          width={264}
          height={264}
          className="rounded-20"
        />
        <div className="absolute-center w-full h-full">
          <div className="bg-black/20 bg-blend-overlay w-full h-full rounded-20 relative">
            <Image
              src={`icons/ImageSelect.svg`}
              alt="icon"
              width={44}
              height={44}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            ></Image>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        onChange={(e) => ImageUploadHandler(e)}
      />
      <div>
        <ValidateInput
          title="닉네임"
          placeholder="닉네임을 입력하세요."
          value={userName}
          onChange={inputChangeHandler}
          onClick={validateNickname}
          bg={true}
          error={
            isUnique === "notUnique"
              ? "이미 사용하고 있는 닉네임 입니다."
              : isUnique === "impossible"
              ? "사용할 수 없는 닉네임 입니다."
              : undefined
          }
          success={
            isUnique === "unique" ? "사용 가능한 닉네임 입니다." : undefined
          }
        />
        <TitleInput
          title="이메일"
          bg={true}
          disabled={true}
          value={user.email ? user.email : ""}
        />
      </div>

      <div className="flex flex-row gap-x-1 w-full mt-7">
        <MyButton style="black-line" size="lg" onClick={modalClose}>
          취소
        </MyButton>
        <MyButton
          size="lg"
          style="black-fill"
          className="w-full"
          onClick={() => {
            profileSaveHandler();
            modalClose();
          }}
          disabled={
            isUnique === "notUnique" ||
            isUnique === "change" ||
            isUnique === "impossible"
          }
        >
          적용하기
        </MyButton>
      </div>
    </div>
  );
};

export default EditProfile;
