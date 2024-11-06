import Image from "next/image";
import Link from "next/link";
import React from "react";
import Write from "../../../../public/icons/Write.svg";
import Warning from "../../../../public/icons/Warning.svg";

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
        {props.modalMode === "nonexist" ? (
          <>
            <Image src={Warning} alt="union" width={0} className="mb-6" />
            <h3 className="text-center title-20-s mb-3">
              모집글을 작성할<br></br> 스터디 그룹이 없어요
            </h3>
            <p className="body-14-m text-center text-gray-700 mb-4">
              지금 바로 스터디를 만드시겠습니까?
            </p>
            <div className="flex justify-center w-full size-12 m-6">
              <button
                onClick={props.onClose}
                className="flex text-black border border-black rounded-full ... w-2/6 ml-1 text-lg text-center items-center justify-center"
              >
                취소
              </button>
              <button
                onClick={props.onConfirm}
                className="flex bg-secondary-900 size-14 ... text-white rounded-full ... w-4/6 ml-1 text-lg text-center items-center justify-center"
              >
                바로 가기
              </button>
            </div>
          </>
        ) : props.modalMode === "close" ? (
          <>
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
          </>
        ) : (
          <>
            <Image src={Write} alt="union" width={0} className="mb-6" />
            <h3 className="text-center title-20-s mb-3">
              모집글을 바로 <br></br> 작성하시겠습니까?
            </h3>
            <p className="body-14-m text-center text-gray-700 mb-4">
              모집글을 통해 나와 함께 스터디할 <br></br>팀원들을 만날 수 있어요!
            </p>
            <div className="flex justify-center w-full body-16-s m-4">
              <button
                onClick={props.onClose}
                className="flex text-black border border-black rounded-full ... w-2/6 ml-1 text-lg text-center items-center justify-center"
              >
                취소
              </button>
              <Link
                href="/write"
                className="flex bg-secondary-900 size-14 ... text-white rounded-full ... w-4/6 ml-1 text-lg text-center items-center justify-center"
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
