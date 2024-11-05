"use client";
import { usePublicUser } from "@/hooks/useUserProfile";
import browserClient from "@/utils/supabase/client";
import { insertStudy } from "@/utils/supabase/supabase-client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { Suspense, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import StudyModal from "../components/StudyModal";
import Modal from "@/components/common/Modal";
import ImageSelect from "../../../../public/icons/ImageSelect.svg";

export default function Study() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <StudyContent />
    </Suspense>
  );
}

function StudyContent() {
  const { data: user } = usePublicUser();
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [userCnt, setUserCnt] = useState<number>(1);
  const [studyCategory, setStudyCategory] = useState<string[]>([
    "선택해주세요",
  ]);
  const [studyTarget, setStudyTarget] = useState<string>("선택해주세요");
  const [studychatLink, setStudyChatLink] = useState<string>("");
  const [studyDescription, setStudyDescription] = useState<string>("");
  const [uploadImg, setUploadImg] = useState<string>(
    browserClient.storage.from("study_img").getPublicUrl("default").data
      .publicUrl,
  );

  // 스터디 페이지 내에서 사용하는 모달창 관리
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<string>("");

  // 공용 모달 관리 - 직업 태그, 분류 태그 관리
  const [isCommonModalOpen, setIsCommonModalOpen] = useState<boolean>(false);
  const [commonModalMode, setCommonModalMode] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // useMutation 훅을 항상 호출합니다.
  const { mutate: createStudy } = useMutation({
    mutationFn: (url: string) =>
      insertStudy(
        title,
        [studyTarget, ...studyCategory],
        userCnt,
        user?.id,
        studyDescription,
        studychatLink,
        url,
      ),
    onSuccess: () => {
      setModalMode("success");
      setIsModalOpen(true);
    },
    onError: () => {
      alert("스터디를 생성하지 못했습니다.");
    },
  });

  // user가 준비되지 않았을 때 로딩 화면을 보여줍니다.
  if (!user) {
    return <div>로딩 중...</div>;
  }

  const handleModalClose = () => {
    if (title && modalMode !== "success") {
      setModalMode("close");
      setIsModalOpen(true);
      setIsCommonModalOpen(false);
    } else {
      router.replace("/");
    }
  };

  const sendData = async () => {
    if (fileInputRef.current?.files) {
      const { data, error } = await browserClient.storage
        .from("study_img")
        .upload(`${user?.id}${Date.now()}`, fileInputRef.current.files[0]);
      if (error) {
        console.log("이미지 업로드 중 오류 발생", error);
        return;
      }

      const url = browserClient.storage
        .from("study_img")
        .getPublicUrl(`${data!.path}`).data.publicUrl;

      createStudy(url); // useMutation 호출
    }
  };

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

  const handleModalClick = (mode: string) => {
    if (mode === "job") {
      setStudyTarget("학생");
    } else {
      setStudyCategory(["디자인", "개발"]);
    }
    setIsCommonModalOpen(true);
    setCommonModalMode(mode);
  };

  return (
    <div className="flex flex-col w-11/12 mx-auto">
      <div className="flex justify-between ... w-full p-2 text-2xl">
        <p onClick={() => handleModalClose()}>✕</p>
        <p className="body-16-s text-black ">스터디 만들기</p>
        <p onClick={() => sendData()}>✓</p>
      </div>

      <div className="flex flex-col w-full h-1/3 mb-4 relative">
        <p className="body-16-m text-black mb-2">
          대표 이미지 <span className="text-primary-50">{`(선택)`}</span>
        </p>
        <div className="relative w-full h-full">
          <Image
            src={uploadImg}
            alt="userImg"
            width={500}
            height={300}
            className="object-full rounded-3xl w-full h-full" // 부모에 맞게 꽉 차게 설정
            onClick={() => fileInputRef.current?.click()}
          />
          <Image
            src={ImageSelect}
            alt="selectBtn"
            width={35}
            className="absolute inset-0 m-auto" // 중앙 정렬
          />
        </div>
        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          onChange={ImageUploadHandler}
        />
      </div>

      <div className="flex flex-col w-full">
        <p className="body-16-m text-black mb-2">
          제목 <span className="text-primary-50">*</span>
        </p>
        <input
          className="border p-1 rounded-md w-full mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 작성해주세요."
        />
        <p className="body-16-m text-black mb-2">
          한 줄 설명 <span className="text-primary-50">*</span>
        </p>
        <input
          className="border p-1 rounded-md w-full mb-4"
          value={studyDescription}
          onChange={(e) => setStudyDescription(e.target.value)}
          placeholder="그룹을 소개해주세요."
        />
        <p className="body-16-m text-black mb-2">
          오픈채팅방 링크 <span className="text-primary-50">{`(선택)`}</span>
        </p>
        <input
          className="border p-1 rounded-md w-full mb-8"
          value={studychatLink}
          onChange={(e) => setStudyChatLink(e.target.value)}
          placeholder="팀원들과 소통할 채팅방 링크를 넣어주세요."
        />
      </div>

      <div className="flex items-center justify-between w-full border border-gray-300 rounded-lg mb-5">
        <p className="p-3 whitespace-nowrap">인원</p>
        <p
          className="p-3 text-gray-300 font-bold h-full truncate"
          onClick={() => setUserCnt(1)}
        >
          {/* {`${userCnt} >`} */}
        </p>
      </div>

      <div className="flex items-center justify-between w-full border border-gray-300 rounded-lg mb-5">
        <p className="p-3 whitespace-nowrap">직업 태그</p>
        <p
          className="p-3 text-gray-300 font-bold h-full truncate"
          onClick={() => handleModalClick("job")}
        >
          {/* {`${studyTarget} >`} */}
        </p>
      </div>

      <div className="flex items-center justify-between w-full border border-gray-300 rounded-lg mb-5">
        <p className="p-3 whitespace-nowrap">스터디 태그</p>
        <p
          className="p-3 text-gray-300 font-bold h-full truncate"
          onClick={() => handleModalClick("study")}
        >
          {/* {`${studyCategory} >`} */}
        </p>
      </div>

      <StudyModal
        isModalOpen={isModalOpen}
        onClose={() => handleModalClose()}
        onConfirm={() => setIsModalOpen(false)}
        modalMode={modalMode}
      />

      <Modal
        isModalOpen={isCommonModalOpen}
        onClose={() => setIsCommonModalOpen(false)}
        modalMode={commonModalMode}
      />
    </div>
  );
}
