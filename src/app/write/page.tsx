"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Tables } from "../../../database.types";
import { usePublicUser } from "@/hooks/useUserProfile";
import { useMutation } from "@tanstack/react-query";
import {
  fetchUserStudyInfo,
  insertPostWrite,
  updatePostWrite,
} from "@/utils/supabase/supabase-client";
import { useRouter, useSearchParams } from "next/navigation";
import WriteModal from "./components/WriteModal";
import Image from "next/image";
import Xmedium from "../../../public/icons/XMedium.svg";
import Check from "../../../public/icons/Check.svg";
import {
  fetchPostStudyInfo,
  fetchStudyInfo,
} from "@/utils/supabase/supabase-server";

import SelectDate from "./components/SelectDate";
import RoundSelectDiv from "./components/RoundSelectDiv";
import AutoResizeTextArea from "../study/[id]/components/AutoResizeTextArea";
import SelectStudyCard from "./components/SelectStudyCard";
import SquareInput from "./components/SquareInput";

type study = {
  id: string;
  name: string;
};

export default function Write() {
  return (
    <Suspense fallback={<div>로딩 중입니다. 잠시만 기다려주십시오..</div>}>
      <WriteContent></WriteContent>
    </Suspense>
  );
}

function WriteContent() {
  // Ref 관련..
  const isLoadingRef = useRef(false);

  //유저 가져오기
  const { data: user } = usePublicUser();

  const router = useRouter();
  const params = useSearchParams();
  const post_id = Number(params.get("post"));

  // 전송 시 필요한 인자값 - 데이터 관련 정리 필요
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [startDay, setStartDay] = useState<string>("");

  // 모달 모드 상태관리 - 모달 공용 컴포넌트 사용
  const [modalMode, setModalMode] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Date 모달 상태관리
  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);

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

  const handleSendData = async () => {
    // 태그 처리 확인
    if (title === "" || contents === "") {
      // toast로 변경 예정
      alert("제목과 내용을 입력해주세요.");
      isLoadingRef.current = false;
      return;
    }

    if (isLoadingRef.current) {
      return;
    }
    isLoadingRef.current = true;
    createPost();
  };

  // 스터디 모집글 생성
  const { mutate: createPost } = useMutation({
    mutationFn: () => {
      if (post_id) {
        const postId = updatePostWrite(
          user?.id ?? "",
          study.id,
          contents,
          title,
          startDay,
          post_id,
        );

        return postId;
      } else {
        const postId = insertPostWrite(
          user?.id ?? "",
          study.id,
          contents,
          title,
          startDay,
        );
        return postId;
      }
    },
    onSuccess: (data) => {
      if (data !== null) {
        isLoadingRef.current = false;
        router.replace(`/post/${data}`);
        setTimeout(() => {
          router.refresh();
        }, 0);
      }
    },

    onError: () => {
      if (post_id) {
        alert("스터디 모집글을 수정하지 못했습니다.");
        isLoadingRef.current = false;
      } else {
        alert("스터디 모집글을 생성하지 못했습니다.");
        isLoadingRef.current = false;
      }
    },
  });

  // 스터디 그룹 가져오기 모달
  const { mutate: getStudy } = useMutation({
    mutationFn: () => fetchUserStudyInfo(user?.id),
    onSuccess: (data) => {
      setStudyGroup(data?.filter((study) => study.study_max_people > 1));
      if (data && data.length > 0) {
        setModalMode("group");
        setIsModalOpen(true);
      }
    },
    onError: () => {
      alert("생성한 스터디 그룹을 가져오지 못했습니다.");
    },
  });

  // 작성 취소 버튼 클릭 시
  const handleModalClose = () => {
    if (title !== "" || study.id !== "" || contents !== "") {
      setModalMode("close");
      setIsModalOpen(true);
    } else {
      router.replace("/");
    }
  };

  // 선택한 스터디 객체가 바뀔 때마다 스터디 데이터 가져옴
  useEffect(() => {
    const getStudyInfo = async () => {
      const data = await fetchStudyInfo(study.id);
      if (data) {
        setStudyInfo(data);
      }
    };

    getStudyInfo();
  }, [study]);

  // 페이지 첫 접근 시 postID 존재 시 말이 달라짐 - 한번만 실행해서 값을 가져오자
  useEffect(() => {
    if (post_id) {
      const fetchPostData = async () => {
        const data = await fetchPostStudyInfo(post_id);
        if (data) {
          setTitle(data.post_name || "");
          setStartDay(data.study_startday || "");
          setContents(data.post_contents || "");
          setStudy({ id: data.study_id, name: data.study.study_name });
        }
      };
      fetchPostData();
    }
  }, [post_id]);

  return (
    <div className="mb-[29px] flex w-full flex-col items-center px-[24px] overflow-x-hidden">
      <div className="px-6 fixed left-0 top-0 mb-[24px] flex h-[44px] w-full items-center justify-between bg-white p-2 text-2xl">
        <Image
          src={Xmedium}
          alt="selectBtn"
          width={0}
          onClick={() => handleModalClose()}
        />
        <p className="body-16-s text-black">
          {post_id ? "모집글 수정" : "모집글 쓰기"}
        </p>
        <button
          disabled={isLoadingRef.current}
          onClick={() => handleSendData()}
        >
          <Image src={Check} alt="selectBtn" width={0} />
        </button>
      </div>
      <div className="mb-4 mt-[68px] flex w-full flex-col gap-y-[32px]">
        <SquareInput
          onChange={setTitle}
          title="제목"
          placeholder="제목을 작성해주세요."
          value={title}
          maxLength={25}
          essential={true}
        />
        <div className="flex w-full flex-col gap-y-[12px]">
          <RoundSelectDiv
            onClick={() => setIsDateOpen(true)}
            title="시작 예정일"
            value={startDay !== "" ? startDay : "0000년 00월 00일"}
          />
          <RoundSelectDiv
            onClick={getStudy}
            title="스터디 그룹"
            value={study.id !== "" ? "선택됨" : " 선택해주세요"}
          >
            {study && studyInfo && <SelectStudyCard studyInfo={studyInfo} />}
          </RoundSelectDiv>
        </div>

        <div className="w-full">
          <p className="mb-[8px] pl-[4px] text-slate-700">
            내용 <span className="text-primary-50">*</span>
          </p>
          <AutoResizeTextArea
            onChange={setContents}
            placeholder="내용을 작성해주세요."
            value={contents}
            maxLength={1000}
            classname="bg-c-background rounded-12 w-full px-[12px] pt-[12px] pb-[160px] placeholder:text-secondary-300 focus:bg-white focus:border focus:border-secondary-400 focus:outline-none border-inset border border-transparent overflow-hidden"
          />
        </div>
      </div>

      <WriteModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBack={() => router.back()}
        onConfirm={(studyId, studyName) => {
          setStudy({ id: studyId, name: studyName });
          setIsModalOpen(false);
        }}
        modalMode={modalMode}
        studyGroup={studyGroup}
      />

      {isDateOpen && (
        <SelectDate
          onConfirm={(data: string | number) => {
            setStartDay(data + "");
            setIsDateOpen(false);
          }}
          mode="date"
          selectedDate={startDay}
        />
      )}
    </div>
  );
}
