"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Tables } from "../../../../database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateDefualtImg,
  updateUserProfile,
} from "@/utils/supabase/supabase-client";
import browserClient from "@/utils/supabase/client";
import ValidateInput from "@/components/common/ValidateInput";
import MyButton from "@/components/common/Button";

const EditProfile = ({
  user,
  modalClose,
}: {
  user: Tables<"user">;
  modalClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const [uploadImg, setUploadImg] = useState<null | string>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState(user?.name ? user.name : "");
  const [isUnique, setIsUnique] = useState("open");
  const [subModal, setSubModal] = useState(false);

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
    mutationFn: async (url: string) => updateUserProfile(userName, url, user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "public"],
      });
    },
  });

  const { mutate: updateDefaultImg } = useMutation({
    mutationFn: () => updateDefualtImg(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "public"],
      });
    },
  });

  // 실제로 수정버튼 눌렀을 때 실행되는 부분 (이미지 먼저 스토리지로 보냄)
  const profileSaveHandler = async () => {
    if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
      const { error } = await browserClient.storage
        .from("profile_img")
        .upload(`${user?.id}`, fileInputRef.current.files[0], {
          upsert: true,
        });

      if (error) {
        console.log("이미지 업로드 중 오류 발생", error);
        return;
      }
      const url =
        browserClient.storage.from("profile_img").getPublicUrl(user.id).data
          .publicUrl +
        "?t=" +
        Date.now();

      updateProfile(url);
      return;
    }
    updateProfile(user.profile_img);
  };

  // 닉네임 중복검사
  const validateNickname = async () => {
    if (!/^[가-힣a-zA-Z0-9]+$/.test(userName)) {
      setIsUnique("impossible");
      return;
    }
    const { data }: { data: Pick<Tables<"user">, "name">[] | null } =
      await browserClient
        .from("user")
        .select("name")
        .eq("name", userName)
        .neq("id", user.id);

    if (data?.length === 0) {
      setIsUnique("unique");
    } else {
      setIsUnique("notUnique");
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setIsUnique("change");
  };

  const img = uploadImg ? uploadImg : user.profile_img;

  return (
    <div className="flex w-full flex-col items-center p-5">
      <p className="title-20-s text-center">프로필 수정</p>
      <div className="relative my-4 h-[264px] w-[264px]">
        <Image
          src={img}
          alt="프로필 이미지"
          fill
          className="rounded-20 object-cover object-center"
          loading="eager"
        />
        <div className="absolute-center h-full w-full">
          <div
            className="relative h-full w-full rounded-20 bg-black/20 bg-blend-overlay"
            onClick={() => setSubModal(!subModal)}
          >
            <Image
              src={`icons/ImageSelect.svg`}
              alt="icon"
              width={44}
              height={44}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            ></Image>
          </div>
        </div>
        {subModal && (
          <div className="body-16-m absolute bottom-[56px] left-[123.5px] flex h-fit w-[148px] flex-col rounded-8 bg-white px-4 py-1 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]">
            <div
              className="h-[30px] w-full py-1"
              onClick={() => {
                fileInputRef?.current?.click();
                setSubModal(false);
              }}
            >
              사진 변경
            </div>
            <div
              className="h-[30px] w-full py-1"
              onClick={() => {
                updateDefaultImg();
                setSubModal(false);
              }}
            >
              기본 이미지로 변경
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        onChange={(e) => ImageUploadHandler(e)}
        accept="image/*"
      />
      <div>
        <ValidateInput
          title="닉네임"
          placeholder="닉네임을 입력하세요."
          value={userName}
          onChange={inputChangeHandler}
          onClick={validateNickname}
          classname="bg-c-background"
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
      </div>
      <div className="mt-7 flex w-full flex-row gap-x-1">
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
