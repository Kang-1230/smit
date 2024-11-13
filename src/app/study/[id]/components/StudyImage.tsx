"use client";
import browserClient from "@/utils/supabase/client";
import { fetchStudyInfo } from "@/utils/supabase/supabase-server";
import ImageSelect from "../../../../../public/icons/ImageSelect.svg";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Tables } from "../../../../../database.types";

type Props = {
  urlStudyId: string;
};

const StudyImage = ({ urlStudyId }: Props) => {
  const [study, setStudy] = useState<Tables<"study">>();
  const [isSubModalOpen, setIsSubModalOpen] = useState<boolean>(false);

  // 최초 스터디 정보 get
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudyInfo(urlStudyId);
      if (data) {
        setStudy(data);
      }
    };

    fetchData();
  }, [urlStudyId]);

  // 이미지 업로드 Handler
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ImageUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const allowExtenstions = ["image/png", "image/jpeg", "image/jpg"];
      if (file && allowExtenstions.includes(file.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          // 상태 업데이트: prevStudy가 undefined일 수 있으므로 기본값 제공
          setStudy((prevStudy) => {
            if (!prevStudy) {
              return undefined; // 초기 상태가 undefined일 경우 처리
            }
            return {
              ...prevStudy, // 기존 데이터 유지
              study_imgurl: reader.result as string, // 이미지 URL 변경
            };
          });
        };
      } else if (!allowExtenstions.includes(file.type)) {
        // Toast로 선택한 파일이 이미지 형식이 아닙니다 - toast 로 수정 진행 예정
        alert("선택한 파일이 이미지 형식이 아닙니다");
        // setModalMode("file");
        // setIsModalOpen(true);
      }
    }
  };

  // 기본 이미지 설정
  const defaultImgUrl = browserClient.storage
    .from("study_img")
    .getPublicUrl("default").data.publicUrl;

  return (
    <div className="relative flex h-[263px] w-full items-center justify-center">
      <Image
        src={
          study?.study_imgurl ||
          "https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/study_img/default"
        }
        alt="studyImg"
        width={375}
        height={263}
        className="h-full w-full object-cover"
        priority={true}
        onClick={() => {
          setIsSubModalOpen(!isSubModalOpen);
        }}
      />
      <div>
        <Image
          src={ImageSelect}
          alt="selectBtn"
          width={44}
          height={44}
          className="absolute bottom-[24px] right-[24px]"
          onClick={() => {
            setIsSubModalOpen(!isSubModalOpen);
          }}
        />
      </div>
      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        accept=".jpg, .jpeg , .png"
        onChange={ImageUploadHandler}
      />

      {isSubModalOpen && (
        <div className="body-16-m absolute right-[49px] top-[137px] flex h-fit w-[148px] flex-col rounded-8 bg-white px-4 py-1 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]">
          <div
            className="h-[30px] w-full py-1"
            onClick={() => {
              fileInputRef?.current?.click();
              setIsSubModalOpen(false);
            }}
          >
            사진 변경
          </div>
          <div
            className="h-[30px] w-full py-1"
            onClick={() => {
              setStudy((prevStudy) => {
                if (!prevStudy) {
                  return undefined; // 초기 상태가 undefined일 경우 처리
                }
                return {
                  ...prevStudy, // 기존 데이터 유지
                  study_imgurl: defaultImgUrl, // 이미지 URL 변경
                };
              });
              setIsSubModalOpen(false);
            }}
          >
            기본 이미지로 변경
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyImage;
