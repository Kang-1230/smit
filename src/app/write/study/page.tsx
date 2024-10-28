"use client";
import { usePostByUser } from "@/hooks/useUserProfile";
import browserClient from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";

export const Study = () => {
  const params = useSearchParams();
  const isSolo: boolean = params.get("solo") === "true";
  const [title, setTitle] = useState<string>("");
  const [userCnt, setUserCnt] = useState<number>(1);
  const [studyCategory, setStudyCategory] = useState<string[]>([]);
  const [studyTarget, setStudyTarget] = useState<string>();

  // 기존 스터디 이미지 불러오기
  const studyImg = browserClient.storage
    .from("study_img")
    .getPublicUrl("default").data.publicUrl;

    // const {
    //   data: posts,
    //   isLoading: Loading,
    //   isError: Error,
    // } = usePostByUser(user?.id);
  
    // if (Loading) {
    //   return <div className="pl-8">로딩중</div>;
    // }
  
    // if (Error) {
    //   return <div className="pl-8">불러오는 중 오류 발생</div>;
    // }


  const handleStudyCategory = (category: string) => {
    setStudyCategory((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item != category)
        : [...prev, category],
    );
  };



  const sendData = () => {
    alert(
      "모집글을 바로 작성하시겠어요? (모집글로 페이지네이션) 아닐 시 메인화면",
    );
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between ... w-full p-5">
        <Link href={"/"}>X</Link>
        <p onClick={() => sendData()}>생성</p>
      </div>

      <Image
        src={`${studyImg}?t=${Date.now()}`}
        alt="유저 이미지"
        width={100}
        height={50}
        className="w-full border object-cover p-5"
        priority={false}
      />
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="그룹을 소개해주세요."
      />
      <h1>오픈채팅방 링크</h1>
      <input
        className="mb-1 border p-1 rounded-md w-full m-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
        <button onClick={() => handleStudyCategory("수시모집")}>
          수시모집
        </button>
        <button onClick={() => handleStudyCategory("UX/UI")}>UX/UI</button>
        <button onClick={() => handleStudyCategory("개발")}>개발</button>
        <button onClick={() => handleStudyCategory("중학생 입시")}>
          중학생 입시
        </button>
        <button onClick={() => handleStudyCategory("고등학생 입시")}>
          고등학생 입시
        </button>
        <button onClick={() => handleStudyCategory("미대 진학")}>
          미대 진학
        </button>
        <button onClick={() => handleStudyCategory("체대 진학")}>
          체대 진학
        </button>
        <button onClick={() => handleStudyCategory("일본어 JLPT N2")}>
          일본어 JLPT N2
        </button>
        <button onClick={() => handleStudyCategory("취업 커리어")}>
          취업 커리어
        </button>
      </div>
      <h1>{studyCategory}</h1>
    </div>
  );
};

export default Study;
