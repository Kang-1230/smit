"use client";
import { usePublicUser } from "@/hooks/useUserProfile";
import browserClient from "@/utils/supabase/client";
import { insertStudy } from "@/utils/supabase/supabase-client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import StudyModal from "../components/StudyModal";

export const Study = () => {
  const { data: user, isLoading, isError } = usePublicUser();

  const router = useRouter();
  // 아래 useState 과다 객체 묶어서 정리 필요
  const params = useSearchParams();
  const isSolo: boolean = params.get("solo") === "true";
  const [title, setTitle] = useState<string>("");
  const [userCnt, setUserCnt] = useState<number>(1);
  const [studyCategory, setStudyCategory] = useState<string[]>([]);
  const [studyTarget, setStudyTarget] = useState<string>("");
  const [studychatLink, setStudyChatLink] = useState<string>("");
  const [studyDescription, setStudyDescription] = useState<string>("");
  const [uploadImg, setUploadImg] = useState<string>(
    browserClient.storage.from("study_img").getPublicUrl("default").data
      .publicUrl,
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // 모달 모드 상태관리 - 모달 공용 컴포넌트 사용
  const [modalMode, setModalMode] = useState<string>("");

  // 이미지 useRef
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleModalClose = () => {
    if (title && modalMode !== "success") {
      setModalMode("close");
      setIsModalOpen(true);
    } else {
      router.replace("/");
    }
  };

  // 생성 버튼 클릭 시 스터디 생성
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

      createStudy(url);
    }
  };

  // 이미지 업로드 : setUploadImg
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

  // 스터디 생성 tanstack
  const { mutate: createStudy } = useMutation({
    mutationFn: (url: string) =>
      insertStudy(
        title,
        [...studyCategory, studyTarget],
        userCnt,
        user?.id,
        studyDescription,
        studychatLink,
        uploadImg,
      ),
    onSuccess: () => {
      setModalMode("success");
      setIsModalOpen(true);
    },
    onError: () => {
      alert("스터디를 생성하지 못했습니다.");
    },
  });

  const handleCategoryClick = (category: string) => {
    setStudyCategory((prev) => {
      // 이미 선택된 카테고리인 경우 제거, 그렇지 않으면 추가
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between ... w-full p-5 text-2xl">
        <p onClick={() => handleModalClose()}>✕</p>
        <p className="text-xl font-bold">스터디 만들기</p>
        <p onClick={() => sendData()}>✓</p>
      </div>

      <div className="relative w-11/12 h-60 ">
        <Image
          src={`${uploadImg}`}
          fill
          alt="유저 이미지"
          className="object-cover rounded-lg"
          priority={true}
          onClick={() => {
            if (fileInputRef.current) fileInputRef.current.click();
          }}
        />

        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          onChange={(e) => ImageUploadHandler(e)}
        />
      </div>

      <h1>제목</h1>
      <input
        className="mb-1 border p-1 rounded-md w-full m-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 작성해주세요."
      />
      <h1>한 줄 설명</h1>
      <input
        className="mb-1 border p-1 rounded-md w-full m-3"
        value={studyDescription}
        onChange={(e) => setStudyDescription(e.target.value)}
        placeholder="그룹을 소개해주세요."
      />
      <h1>오픈채팅방 링크</h1>
      <input
        className="mb-1 border p-1 rounded-md w-full m-3"
        value={studychatLink}
        onChange={(e) => setStudyChatLink(e.target.value)}
        placeholder="팀원들과 소통할 채팅방 링크를 넣어주세요."
      />
      <h1>인원 {`(UI 수정예정)`}</h1>
      <div className="flex">
        {userCnt !== 1 && !isSolo ? (
          <button
            className="bg-black size-8 text-white"
            onClick={() => setUserCnt(userCnt - 1)}
          >
            -
          </button>
        ) : null}
        <h1 className="text-2xl">{userCnt}</h1>
        {!isSolo ? (
          <button
            className="bg-black size-8 text-white"
            onClick={() => setUserCnt(userCnt + 1)}
          >
            +
          </button>
        ) : null}
      </div>
      <h1>직업 태그 {`(UI 수정예정)`}</h1>
      <div className="flex justify-between ... bg-black text-white w-full">
        <button onClick={() => setStudyTarget("대학생")}>대학생</button>
        <button onClick={() => setStudyTarget("고등학생")}>고등학생</button>
        <button onClick={() => setStudyTarget("중학생")}>중학생</button>
        <button onClick={() => setStudyTarget("초등학생")}>초등학생</button>
      </div>
      <h1>{studyTarget}</h1>
      <br></br>
      <h1>스터디 태그 {`(UI 수정예정)`}</h1>
      <div className="flex justify-between ... bg-black text-white w-full">
        <button onClick={() => handleCategoryClick("수시모집")}>
          수시모집
        </button>
        <button onClick={() => handleCategoryClick("UX/UI")}>UX/UI</button>
        <button onClick={() => handleCategoryClick("개발")}>개발</button>
        <button onClick={() => handleCategoryClick("중학생 입시")}>
          중학생 입시
        </button>
        <button onClick={() => handleCategoryClick("고등학생 입시")}>
          고등학생 입시
        </button>
        <button onClick={() => handleCategoryClick("미대 진학")}>
          미대 진학
        </button>
        <button onClick={() => handleCategoryClick("체대 진학")}>
          체대 진학
        </button>
        <button onClick={() => handleCategoryClick("JLPT")}>
          일본어 JLPT N2
        </button>
        <button onClick={() => handleCategoryClick("취업 커리어")}>
          취업 커리어
        </button>
        <button onClick={() => handleCategoryClick("토플")}>생산</button>
        <button onClick={() => handleCategoryClick("토익")}>토익</button>
        <button onClick={() => handleCategoryClick("오픽")}>오픽</button>
      </div>
      <h1>{studyCategory}</h1>

      <StudyModal
        isModalOpen={isModalOpen}
        onClose={() => handleModalClose()}
        onConfirm={() => setIsModalOpen(false)}
        modalMode={modalMode}
      />
    </div>
  );
};

export default Study;
