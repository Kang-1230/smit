import Link from "next/link";
import React from "react";

type ModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  modalMode: string;
};

const Modal = (props: ModalProps) => {
  return props.isModalOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center w-full">
      <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col justify-center items-center w-5/6 h-1/3 overflow-y-auto overflow-x-hidden">
        <div className="relative w-full pb-16">
          <h1
            onClick={props.onClose}
            className="text-xl absolute top-4 right-4 cursor-pointer"
          >
            X
          </h1>
        </div>

        {props.modalMode === "nonexist" ? (
          <>
            <h3 className="text-center text-xl font-black mb-8">
              모집글을 작성할<br></br> 스터디 그룹이 없어요
            </h3>
            <p className="font-bold text-zinc-700">스터디를 만드시겠습니까?</p>
            <div className="flex justify-center w-full size-12 m-6">
              <button
                onClick={props.onClose}
                className="text-black size-14 ... rounded-full ... border border-black w-full mr-1 text-lg font-medium"
              >
                취소
              </button>
              <button
                onClick={props.onConfirm}
                className="bg-black size-14 ... text-white rounded-full ... w-full ml-1 text-lg opacity-50 font-medium"
              >
                스터디 만들기
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-center text-xl font-black mb-8">
              무슨 스터디 그룹을 만들까요?
            </h3>
            <p className="font-bold text-zinc-700 text-center">
              1인 스터디는 나중에<br></br> 인원을 추가할 수 있어요
            </p>
            <div className="flex justify-center w-full size-16 m-6">
              <Link
                href="/write/study?solo=true"
                className="flex text-black size-14 ... rounded-full ... border border-black w-full mr-1 text-lg font-medium text-center items-center justify-center"
              >
                1인 스터디
              </Link>
              <Link
                href="/write/study?solo=false"
                className="flex bg-black size-14 ... text-white rounded-full ... w-full ml-1 text-lg opacity-50 font-medium text-center items-center justify-center"
              >
                다인원 스터디
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default Modal;
