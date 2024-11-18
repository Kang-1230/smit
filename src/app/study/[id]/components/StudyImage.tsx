"use client";
import browserClient from "@/utils/supabase/client";
import { fetchStudyInfo } from "@/utils/supabase/supabase-server";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Tables } from "../../../../../database.types";
import { convertUTCToKST } from "@/utils/convertDate";
import { useToast } from "@/hooks/useToast";

type Props = {
  urlStudyId: string;
  onConfirm: (data: Tables<"study">) => void;
  onFile: (file: File) => void;
};

const StudyImage = ({ urlStudyId, onConfirm, onFile }: Props) => {
  const [study, setStudy] = useState<Tables<"study">>();
  const [isSubModalOpen, setIsSubModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { showToast, ToastComponent } = useToast();

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
        showToast("선택한 파일이 이미지 형식이 아닙니다.");
        e.target.value = "";
      }
    }
  };

  // 기본 이미지 설정
  const defaultImgUrl = browserClient.storage
    .from("study_img")
    .getPublicUrl("default").data.publicUrl;

  // 입력 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setIsEdit(false); // 엔터를 누르면 편집 모드 종료
    }
  };

  if (!study) return;

  return (
    <div className="relative flex h-[263px] w-full items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <Image
        src={
          study.study_imgurl ||
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
      <div className="absolute bottom-[26px] left-6 z-20 flex w-[237px] flex-col gap-2 text-white">
        <p className="caption font-medium">
          {convertUTCToKST(study.study_createtime).dateOnly}
        </p>
        <div className="title-20-s">
          {isEdit ? (
            <textarea
              value={study.study_name}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={(e) => handleKeyDown(e)}
              maxLength={25}
              spellCheck={false}
              className="resize-none border-b border-white bg-transparent outline-none"
              autoFocus
            />
          ) : (
            <p className="flex items-center">
              {study.study_name}
              <Image
                src={"/icons/EditFill.svg"}
                alt="edit"
                width={16.3}
                height={16.3}
                className="ml-1 cursor-pointer"
                onClick={() => setIsEdit(true)}
              />
            </p>
          )}
        </div>
      </div>
      <div className="absolute bottom-[26px] right-[24px] z-20 flex items-center rounded-[22px] bg-white/40 p-[14px] backdrop-blur-[20px]">
        <Image
          src={"/icons/ImageSelectBlack.svg"}
          alt="selectBtn"
          width={16}
          height={16}
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
      {/* <StudyManageTitle studyData={study} /> */}
      {isSubModalOpen && (
        <div className="body-16-m absolute right-[49px] top-[137px] z-30 flex h-fit w-[148px] flex-col rounded-8 bg-white px-4 py-1 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]">
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

      <ToastComponent></ToastComponent>
    </div>
  );
};

export default StudyImage;
