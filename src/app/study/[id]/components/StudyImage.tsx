"use client";
import browserClient from "@/utils/supabase/client";
import { fetchStudyInfo } from "@/utils/supabase/supabase-server";
import ImageSelect from "../../../../../public/icons/ImageSelect.svg";
import Pencil from "../../../../../public/icons/PencilFill.svg";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Tables } from "../../../../../database.types";

type Props = {
  urlStudyId: string;
  onConfirm: (data: Tables<"study">) => void;
  onFile: (file: File) => void;
};

const StudyImage = ({ urlStudyId, onConfirm, onFile }: Props) => {
  const [study, setStudy] = useState<Tables<"study">>();
  const [isSubModalOpen, setIsSubModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

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

  // 값 변경 될 떄마다
  useEffect(() => {
    if (study) {
      console.log(study.study_name);
      onConfirm(study); // study 값이 변경될 때마다 부모로 전달
    }
  }, [study]); // study 값이 변경될 때마다 실행

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
        onFile(file);
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

  // 입력 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudy((prevStudy) => {
      if (!prevStudy) {
        return undefined; // 초기 상태가 undefined일 경우 처리
      }
      return {
        ...prevStudy, // 기존 데이터 유지
        study_name: e.target.value, // 이미지 URL 변경
      };
    });
  };

  // 입력 완료 핸들러
  const handleBlur = () => {
    setIsEdit(false); // 입력 상자에서 포커스가 사라지면 편집 모드 종료
  };

  // 엔터 키로 입력 완료
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEdit(false); // 엔터를 누르면 편집 모드 종료
    }
  };

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
      <div className="absolute bottom-[24px] left-[24px]">
        <p className="caption mb-2 text-white">
          {study?.study_createtime.substring(0, 10).replaceAll("-", ".")}
        </p>

        {isEdit ? (
          <input
            type="text"
            value={study?.study_name}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e)}
            maxLength={20}
            className="title-20-s max-w-[240px] truncate border-b border-gray-300 bg-transparent text-white focus:outline-none"
            autoFocus // 클릭하면 바로 포커스
          />
        ) : (
          <p className="title-20-s text-overflow ... flex max-w-[283px] items-center truncate text-white">
            {study?.study_name}
            <Image
              src={Pencil}
              alt="PencilLined"
              width={24}
              height={24}
              className="mr-2 cursor-pointer"
              onClick={() => setIsEdit(true)}
            />
          </p>
        )}
      </div>
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
