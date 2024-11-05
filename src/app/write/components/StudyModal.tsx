import Link from "next/link";
import React from "react";

type ModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  modalMode: string;
};

const StudyModal = (props: ModalProps) => {
  return props.isModalOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center w-full">
      <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col justify-center items-center w-5/6 h-fit overflow-y-auto overflow-x-hidden">
        <div
          className="flex justify-end w-full cursor-pointer text-2xl p-2"
          onClick={props.onClose}
        >
          ✕
        </div>

        {props.modalMode === "nonexist" ? (
          <>
            <h3 className="text-center text-xl font-black mb-8">
              모집글을 작성할<br></br> 스터디 그룹이 없어요
            </h3>
            <p className="font-bold text-zinc-700">
              지금 바로 스터디를 만드시겠습니까?
            </p>
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
                바로 가기
              </button>
            </div>
          </>
        ) : props.modalMode === "close" ? (
          <>
            <h3 className="text-center text-xl font-black mb-8">
              지금 나가면 지금까지 <br></br> 작성한 기록이 사라져요.
            </h3>
            <p className="font-bold text-zinc-700 text-center">
              정말 이 페이지에서 나가시겠습니까?
            </p>
            <div className="flex justify-center w-full size-16 m-6">
              <button
                onClick={props.onClose}
                className="flex bg-black size-14 ... text-white rounded-full ... w-full ml-1 text-lg opacity-50 font-medium text-center items-center justify-center"
              >
                취소
              </button>
              <Link
                href="/"
                className="flex text-black size-14 ... rounded-full ... border border-black w-full mr-1 text-lg font-medium text-center items-center justify-center"
              >
                나가기
              </Link>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-center text-xl font-black mb-8">
              모집글을 바로 <br></br> 작성하시겠어요?
            </h3>
            <p className="font-bold text-zinc-700 text-center">
              모집글을 통해 나와 함께 스터디할 <br></br>팀원들을 바로 만날 수
              있어요!
            </p>
            <div className="flex justify-center w-full size-16 m-6">
              <button
                onClick={props.onClose}
                className="flex bg-black size-14 ... text-white rounded-full ... w-full ml-1 text-lg opacity-50 font-medium text-center items-center justify-center"
              >
                취소
              </button>
              <Link
                href="/write"
                className="flex bg-black size-14 ... text-white rounded-full ... w-full ml-1 text-lg opacity-50 font-medium text-center items-center justify-center"
              >
                바로가기
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default StudyModal;
