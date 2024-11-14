"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tables } from "../../../../database.types";
import Image from "next/image";
import Warning from "../../../../public/icons/Warning.svg";

type ModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  onConfirm: (studyId: string, studyName: string) => void;
  modalMode: string;
  studyGroup?: Tables<"study">[] | null | undefined;
};

const WriteModal = (props: ModalProps) => {
  const [selectStudy, setSelectStudy] = useState<{
    studyId: string;
    studyName: string;
  } | null>(null);

  useEffect(() => {
    if (props.isModalOpen) {
      // 모달이 열리면 body의 overflow를 hidden으로 설정
      document.body.style.overflow = "hidden";
      document.body.classList.add("overflow-y-hidden");
    } else {
      // 모달이 닫히면 원래 상태로 돌림
      document.body.style.overflow = "unset";
      document.body.classList.remove("overflow-y-hidden");
    }

    // 컴포넌트 언마운트 시에도 원래 상태로 복구
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [props.isModalOpen]);

  return props.isModalOpen ? (
    props.modalMode === "close" ? (
      <div className="fixed inset-0 flex w-full items-center justify-center bg-black bg-opacity-50">
        <div className="flex h-fit w-5/6 flex-col items-center justify-center overflow-y-auto overflow-x-hidden rounded-3xl bg-white p-6 shadow-lg">
          <Image src={Warning} alt="union" width={0} className="mb-6" />
          <h3 className="title-20-s mb-3 text-center">
            지금 나가면 지금까지 <br></br> 작성한 기록이 사라져요.
          </h3>
          <p className="body-14-m mb-4 text-center text-gray-700">
            정말 이 페이지에서 나가시겠습니까?
          </p>
          <div className="body-16-s m-4 flex w-full justify-center">
            <button
              onClick={props.onClose}
              className="... ml-1 flex w-2/6 items-center justify-center rounded-full border border-black text-center text-lg text-black"
            >
              취소
            </button>
            <Link
              href="/"
              className="... ... ml-1 flex size-14 w-4/6 items-center justify-center rounded-full bg-secondary-900 text-center text-lg text-white"
            >
              나가기
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <div
        className="fixed inset-0 z-50 flex w-full justify-center bg-black bg-opacity-50"
        onClick={props.onClose}
      >
        <div
          className="fixed inset-x-0 bottom-0 flex h-2/5 w-full flex-col overflow-y-auto rounded-t-2xl bg-white p-5 shadow-lg focus:overscroll-contain"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="title-20-m">스터디 그룹 선택</h1>
          <p className="body-14-m pt-2 text-secondary-400">
            모집글을 작성할 스터디 그룹을 선택해주세요.
          </p>

          <div className="my-10">
            {props.studyGroup &&
              props.studyGroup.map((item) => (
                <div
                  key={item.study_id}
                  className="flex h-fit w-full items-center pb-4"
                >
                  <input
                    type="radio"
                    name="studyGroup"
                    value={item.study_id}
                    checked={
                      selectStudy?.studyId === item.study_id &&
                      selectStudy?.studyName === item.study_name
                    }
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => {
                      if (selectStudy?.studyId === item.study_id) {
                        setSelectStudy(null);
                      } else {
                        setSelectStudy({
                          studyId: item.study_id,
                          studyName: item.study_name,
                        });
                      }
                    }}
                    className={`h-4 w-4 appearance-none rounded-full border-2 ${
                      selectStudy?.studyId === item.study_id
                        ? "border-primary-50 bg-primary-50"
                        : "border-gray-400 bg-white"
                    }`}
                  />
                  <p className="body-16-m ml-3">{item.study_name}</p>
                </div>
              ))}
          </div>
          <button
            className="... body-16-s w-full rounded-full bg-secondary-900 p-5 text-white"
            onClick={() => {
              if (selectStudy) {
                props.onConfirm(selectStudy.studyId, selectStudy.studyName);
              }
            }}
          >
            적용하기
          </button>
        </div>
      </div>
    )
  ) : null;
};

export default WriteModal;
