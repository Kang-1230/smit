"use client";
import React, { Suspense, useEffect, useState } from "react";
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
import stroke from "../../../public/icons/Next.svg";
import { fetchPostStudyInfo, fetchStudyInfo } from "@/utils/supabase/supabase-server";

import SelectDate from "./components/SelectDate";

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
  //유저 가져오기
  const { data: user } = usePublicUser();
  
  const router = useRouter();
  const params = useSearchParams();
  const post_id = Number(params.get('post'));

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

  // 스터디 모집글 생성
  const { mutate: createPost } = useMutation({
    mutationFn: async() => {
      if(post_id) {
        await updatePostWrite(user?.id ?? "", study.id, contents, title, startDay,post_id);
      } else {
        await insertPostWrite(user?.id ?? "", study.id, contents, title, startDay);
      }
    },
    onSuccess: (data) => {
      if(post_id) {
        router.replace(`/post/${post_id}`);
      } else {
        router.replace(`/post/${data}`);   
      }

    },

    onError: () => {
      if(post_id) {
        alert("스터디 모집글을 수정하지 못했습니다.");
      } else {
        alert("스터디 모집글을 생성하지 못했습니다.");
      }
      
    },
  });


  // 스터디 그룹 가져오기 모달
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

    // 작성 취소 버튼 클릭 시
    const handleModalClose = () => {
      if (title) {
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
    <div className="flex flex-col w-full items-center">
      <div className="body-16-m flex flex-col w-full items-center">
        <div className="flex justify-between ... w-full text-2xl items-center p-5">
          <Image
            src={Xmedium}
            alt="selectBtn"
            width={0}
            onClick={() => handleModalClose()}
          />
          <p className="body-16-s text-black ">{post_id ? "모집글 수정" : "모집글 쓰기"}</p>
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
            className="p-3 rounded-2xl w-full my-3 bg-secondary-50 body-16-m placeholder-secondary-300"
            value={title}
            maxLength={20}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 작성해주세요"
          />
        </div>

        <div className="flex items-center justify-between w-10/12 border text-secondary-700 border-gray-300 rounded-2xl mb-4">
          <p className="p-3">시작 예정일</p>
          <div className="flex">
            <p
              className="text-secondary-300 body-16-m px-3"
              onClick={() => setIsDateOpen(true)}
            >
              {startDay !== "" ? startDay : "0000년 00월 00일"}
            </p>
            <Image src={stroke} alt="selectBtn" width={0} className="mr-3" />
          </div>
        </div>

        <div className="flex flex-col items-center w-10/12 border text-secondary-700 border-gray-300 rounded-2xl mb-5">
          <div className="flex items-center justify-between w-full">
            <p className="p-3">
              스터디 그룹 <span className="text-primary-50">*</span>
            </p>
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
            <div className="w-11/12 flex-col rounded-2xl bg-tertiary-75 justify-center h-fit m-4">
              <div className="flex items-center m-4">
                <Image
                  src={
                    studyInfo?.study_imgurl ||
                    "https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/study_img/default"
                  }
                  alt="img"
                  width={100}
                  height={100}
                  className="object-full rounded-xl border aspect-square w-1/4 h-1/4"
                />
                <p className="mx-2 text-secondary-800 body-16-s">
                  {studyInfo?.study_name}
                </p>
              </div>
              <div className="flex w-full justify-start">
                <p className="bg-tertiary-300 text-white rounded-full ... px-3 py-1 caption overflow-hidden text-ellipsis whitespace-nowrap flex items-center ml-4 mb-4">
                  {studyInfo?.study_category[0]}
                </p>

                {studyInfo?.study_category[1] ? (
                  <p className="bg-primary-50 text-white rounded-full px-3 py-1 caption overflow-hidden text-ellipsis whitespace-nowrap flex items-center ml-1 mb-4">
                    {studyInfo?.study_category[1]}
                  </p>
                ) : null}

                {studyInfo?.study_category[2] ? (
                  <p className="bg-primary-50 text-white rounded-full px-3 py-1 caption overflow-hidden text-ellipsis whitespace-nowrap flex items-center ml-1 mb-4">
                    {studyInfo?.study_category[2]}
                  </p>
                ) : null}

                {studyInfo?.study_category[3] ? (
                  <p className="bg-primary-50 text-white rounded-full px-3 py-1 caption overflow-hidden text-ellipsis whitespace-nowrap flex items-center ml-1 mb-4">
                    {studyInfo?.study_category[3]}
                  </p>
                ) : null}
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
            className="p-4 rounded-2xl w-full bg-gray-100 placeholder-secondary-300 h-[80%]" // textarea 높이
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

      {isDateOpen && (
        <SelectDate
          onConfirm={(date: string) => {
            setStartDay(date);
            setIsDateOpen(false);
          }}
          onClose={() => {
            setIsModalOpen(false);
            setIsDateOpen(false);
          }}
          mode="date"
        />
      )}
    </div>
  );
}
