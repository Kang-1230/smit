import Link from "next/link";
import React from "react";
import { Tables } from "../../../../database.types";

type ModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  onConfirm: (studyId: string, studyName: string) => void;
  modalMode: string;
  studyGroup?: Tables<"study">[] | null | undefined;
};

const WriteModal = (props: ModalProps) => {
  return props.isModalOpen ? (
    props.modalMode === "close" ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center w-full">
        <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col justify-center items-center w-5/6 h-fit overflow-y-auto overflow-x-hidden">
          <div
            className="flex justify-end w-full cursor-pointer text-2xl p-2"
            onClick={props.onClose}
          >
            ✕
          </div>
          <h3 className="text-center text-xl font-black mb-8">
            지금 나가면 지금까지 <br /> 작성한 기록이 사라져요.
          </h3>
          <p className="font-bold text-zinc-700 text-center">
            정말 나가시겠습니까?
          </p>
          <div className="flex justify-center w-full size-16 m-6">
            <Link
              href="/"
              className="flex text-black size-14 rounded-full border border-black w-full mr-1 text-lg font-medium text-center items-center justify-center"
            >
              나가기
            </Link>
            <button
              onClick={props.onClose} // 빈 인자를 넘겨 props.onConfirm을 호출
              className="flex bg-black size-14 text-white rounded-full w-full ml-1 text-lg opacity-50 font-medium text-center items-center justify-center"
            >
              계속 작성하기
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center w-full z-50">
        <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl w-full shadow-lg flex flex-col w-5/6 h-2/5 overflow-y-auto focus:overscroll-contain">
          <h1 className="text-xl font-bold pl-5 pt-5">스터디 그룹 선택</h1>
          {props.studyGroup &&
            props.studyGroup.map((item) => (
              <div
                key={item.study_id}
                className="flex justify-between items-center w-full p-2 h-fit"
              >
                <p className="font-bold ml-3">{item.study_name}</p>
                <button
                  type="button"
                  className="bg-zinc-400 rounded-lg text-white p-1 ml-4 w-1/6 font-bold mr-3"
                  onClick={() =>
                    props.onConfirm(item.study_id, item.study_name)
                  }
                >
                  선택
                </button>
              </div>
            ))}
        </div>
      </div>
    )
  ) : null;
};

export default WriteModal;
