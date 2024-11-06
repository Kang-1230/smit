"use client";
import React, { useEffect, useState } from "react";
import { Tables } from "../../../database.types";
import { usePublicUser } from "@/hooks/useUserProfile";
import { useMutation } from "@tanstack/react-query";
import {
  fetchUserStudyInfo,
  insertPostWrite,
} from "@/utils/supabase/supabase-client";
import { useRouter } from "next/navigation";
import WriteModal from "./components/WriteModal";
import Image from "next/image";
import Xmedium from "../../../public/icons/XMedium.svg";
import Check from "../../../public/icons/Check.svg";
import stroke from "../../../public/icons/Next.svg";
import { fetchStudyInfo } from "@/utils/supabase/supabase-server";

type study = {
  id: string;
  name: string;
};

export default function Write() {
  //유저 가져오기
  const { data: user } = usePublicUser();

  // 전송 시 필요한 인자값 - 데이터 관련 정리 필요
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [startDay, setStartDay] = useState<string>("");

  // 모달 모드 상태관리 - 모달 공용 컴포넌트 사용
  const [modalMode, setModalMode] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [study, setStudy] = useState<study>({
    id: "",
    name: "",
  });

  // 가져온 스터디 그룹 데이터
  const [studyGroup, setStudyGroup] = useState<
    Tables<"study">[] | null | undefined
  >(null);

  // 가져온 스터디 하나의 데이터
  const [studyInfo, setStudyInfo] = useState<Tables<"study">>();

  const router = useRouter();

  // 스터디 모집글 생성
  const { mutate: createPost } = useMutation({
    mutationFn: () =>
      insertPostWrite(user?.id ?? "", study.id, contents, title, startDay),
    onSuccess: (data) => {
      router.replace(`/post/${data}`);
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

  useEffect(() => {
    const getStudyInfo = async () => {
      const data = await fetchStudyInfo(study.id);
      if (data) {
        setStudyInfo(data);
      }
    };

    getStudyInfo();
  }, [study]);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="body-16-m flex flex-col w-full items-center">
        <div className="flex justify-between ... w-full text-2xl items-center p-5">
          <Image
            src={Xmedium}
            alt="selectBtn"
            width={0}
            onClick={() => handleModalClose()}
          />
          <p className="body-16-s text-black ">모집글 쓰기</p>
          <Image
            src={Check}
            alt="selectBtn"
            width={0}
            onClick={() => createPost()}
          />
        </div>

        <div className="w-10/12 mb-4">
          <p className="text-black">
            제목 <span className="text-primary-50">*</span>
          </p>
          <input
            className="p-3 rounded-2xl w-full my-3 text-secondary-300 bg-secondary-50 body-16-m placeholder-secondary-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 작성해주세요"
          />
        </div>

        <div className="flex items-center justify-between w-10/12 border text-secondary-700 border-gray-300 rounded-2xl mb-4">
          <p className="p-3">시작 예정일</p>
          <input
            className="border rounded-md p-3"
            value={startDay}
            type="date"
            onChange={(e) => setStartDay(e.target.value)}
            placeholder="0000년 00월 00일 〉"
          />
        </div>

        <div className="flex flex-col items-center w-10/12 border text-secondary-700 border-gray-300 rounded-2xl mb-5">
          <div className="flex items-center justify-between w-full">
            <p className="p-3">스터디 그룹</p>
            <div className="flex">
              <p
                className="text-secondary-300 body-16-m px-3"
                onClick={() => getStudy()}
              >
                {study.id !== "" ? "선택됨" : " 선택해주세요"}
              </p>
              <Image src={stroke} alt="selectBtn" width={0} className="mr-3" />
            </div>
          </div>
          {study.id !== "" ? (
            <div className="w-full flex-col rounded-2xl bg-tertiary-50">
              <div className="w-full">
                {studyInfo?.study_name}
                {studyInfo?.study_category}
                {studyInfo?.study_imgurl}
              </div>
            </div>
          ) : null}
        </div>

        <div className="w-10/12 h-[50vh]">
          <div className="flex justify-between">
            <p className="text-slate-700 p-2">
              내용 <span className="text-primary-50">*</span>
            </p>
          </div>
          <textarea
            className="p-4 rounded-2xl w-full bg-gray-100 text-secondary-300 placeholder-secondary-300 h-[80%]" // textarea 높이
            value={contents}
            maxLength={500}
            onChange={(e) => setContents(e.target.value)}
            placeholder="내용을 작성해주세요."
          />
        </div>
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
}
