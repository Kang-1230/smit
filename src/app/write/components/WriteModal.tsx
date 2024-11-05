import Link from "next/link";
import React, { useState } from "react";
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

  return props.isModalOpen ? (
    props.modalMode === "close" ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center w-full">
        <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col justify-center items-center w-5/6 h-fit overflow-y-auto overflow-x-hidden">
          <Image src={Warning} alt="union" width={0} className="mb-6" />
          <h3 className="text-center title-20-s mb-3">
            지금 나가면 지금까지 <br></br> 작성한 기록이 사라져요.
          </h3>
          <p className="body-14-m text-center text-gray-700 mb-4">
            정말 이 페이지에서 나가시겠습니까?
          </p>
          <div className="flex justify-center w-full body-16-s m-4">
            <button
              onClick={props.onClose}
              className="flex text-black border border-black rounded-full ... w-2/6 ml-1 text-lg text-center items-center justify-center"
            >
              취소
            </button>
            <Link
              href="/"
              className="flex bg-secondary-900 size-14 ... text-white rounded-full ... w-4/6 ml-1 text-lg text-center items-center justify-center"
            >
              나가기
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center w-full z-50">
        <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl w-full shadow-lg flex flex-col h-2/5 overflow-y-auto focus:overscroll-contain p-5">
          <h1 className="title-20-m ">스터디 그룹 선택</h1>2
          <p className="body-14-m text-secondary-400 pt-2">
            모집글을 작성할 스터디 그룹을 선택해주세요.
          </p>

          <div className="my-10">
            {props.studyGroup &&
              props.studyGroup.map((item) => (
                <div
                  key={item.study_id}
                  className="flex w-full h-fit items-center pb-4"
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
                        console.log("Unchecking:", item.study_id);
                        setSelectStudy(null);
                      } else {
                        console.log("Selecting:", item.study_id);
                        setSelectStudy({
                          studyId: item.study_id,
                          studyName: item.study_name,
                        });
                      }
                    }}
                    className={`appearance-none w-4 h-4 border-2 rounded-full 
                      ${
                        selectStudy?.studyId === item.study_id
                          ? "bg-primary-50 border-primary-50"
                          : "border-gray-400 bg-white"
                      }`}
                  />
                  <p className="body-16-m ml-3">{item.study_name}</p>
                </div>
              ))}
          </div>
          <button
            className="p-5 w-full rounded-full ... body-16-s text-white bg-secondary-900"
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
