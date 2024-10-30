"use client";
import React, { useState } from "react";
import { Tables } from "../../../database.types";
import { usePublicUser } from "@/hooks/useUserProfile";
import { useMutation } from "@tanstack/react-query";
import {
  fetchUserStudyInfo,
  insertPostWrite,
} from "@/utils/supabase/supabase-client";
import { useRouter } from "next/navigation";
import WriteModal from "./components/WriteModal";

type study = {
  id: string;
  name: string;
};

export const Write = () => {
  //유저 가져오기
  const { data: user, isLoading, isError } = usePublicUser();

  // 전송 시 필요한 인자값 - 데이터 관련 정리 필요
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [startDay, setStartDay] = useState<string>("");

  // 모달 모드 상태관리 - 모달 공용 컴포넌트 사용
  const [modalMode, setModalMode] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [study, setStudy] = useState<study>({
    id: "",
    name: "선택해주세요 〉",
  });

  // 가져온 스터디 그룹 데이터
  const [studyGroup, setStudyGroup] = useState<
    Tables<"study">[] | null | undefined
  >(null);

  // const [study, setStudy] = useState<Tables<"study"> | null | undefined>();

  // 포스트 정보 받아올 시 routing
  const [postId, setpostId] = useState<number>();

  const router = useRouter();

  // 스터디 모집글 생성
  const { mutate: createPost } = useMutation({
    mutationFn: () =>
      insertPostWrite(user?.id ?? "", study.id, contents, title, startDay),
    onSuccess: (data) => {
      console.log(data);
    },

    onError: () => {
      alert("스터디 모집글을 생성하지 못했습니다.");
    },
  });

  // 작성 취소 버튼 클릭 시
  const handleModalClose = () => {
    if (title) {
      setModalMode("close");
      setIsModalOpen(true);
    } else {
      router.replace("/");
    }
  };

  // 스터디 생성 tanstack
  const { mutate: getStudy } = useMutation({
    mutationFn: () => fetchUserStudyInfo(user?.id),
    onSuccess: (data) => {
      setStudyGroup(data);
      if (data && data.length > 0) {
        setModalMode("group");
        setIsModalOpen(true);
      }
    },
    onError: () => {
      alert("생성한 스터디 그룹을 가져오지 못했습니다.");
    },
  });

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between ... w-full p-5 text-2xl">
        <p onClick={() => handleModalClose()}>✕</p>
        <p className="text-xl font-bold item-center justify-center">
          모집글 쓰기
        </p>
        <p onClick={() => createPost()}>✓</p>
      </div>

      <div className="w-10/12">
        <p className="text-slate-700">제목</p>
        <input
          className="mb-1 p-1 rounded-md w-full bg-gray-100"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 작성해주세요."
        />
      </div>

      <div className="flex items-center justify-between w-10/12 border border-gray-300 rounded-lg m-2">
        <p className="p-3">시작 예정일</p>
        <input
          className="mb-1 border p-1 rounded-md p-3"
          value={startDay}
          type="date"
          onChange={(e) => setStartDay(e.target.value)}
          placeholder="0000년 00월 00일 〉"
        />
      </div>

      <div className="flex items-center justify-between w-10/12 border border-gray-300 rounded-lg mb-5">
        <p className="p-3 whitespace-nowrap">스터디 그룹 선택</p>
        <p
          className="p-3 text-gray-300 font-bold h-full truncate"
          onClick={() => getStudy()}
        >
          {study.name}
        </p>
      </div>

      <div className="w-10/12 h-[50vh]">
        <div className="flex justify-between">
          <p className="text-slate-700 p-2">내용</p>
          <p>{contents.length} / 500</p>
        </div>
        <textarea
          className="mb-1 p-1 rounded-lg w-full bg-gray-100 h-[80%]" // textarea 높이
          value={contents}
          maxLength={500}
          onChange={(e) => setContents(e.target.value)}
          placeholder="내용을 작성해주세요."
        />
      </div>

      <WriteModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={(studyId, studyName) => {
          setStudy({ id: studyId, name: studyName });
          setIsModalOpen(false);
        }}
        modalMode={modalMode}
        studyGroup={studyGroup}
      />
    </div>
  );
};

export default Write;
