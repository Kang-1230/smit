import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Write from "../../../../public/icons/Write.svg";
import Warning from "../../../../public/icons/Warning.svg";

type ModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  modalMode: string;
};

const StudyModal = (props: ModalProps) => {
  // 모달이 열릴 때

  useEffect(() => {
    if (props.isModalOpen) {
      // 모달이 열리면 body의 overflow를 hidden으로 설정
      document.body.style.overflow = "hidden";
    } else {
      // 모달이 닫히면 원래 상태로 돌림
      document.body.style.overflow = "unset";
    }

    // 컴포넌트 언마운트 시에도 원래 상태로 복구
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [props.isModalOpen]);

  return props.isModalOpen ? (
    <div className="z-100 fixed inset-0 flex h-full w-full items-center justify-center bg-black/70">
      <div
        className="flex h-fit w-5/6 animate-slide-up flex-col items-center justify-center overflow-hidden rounded-3xl bg-white px-6 py-4 shadow-lg md:h-[525px] md:w-[440px]"
        onClick={(e) => e.stopPropagation()}
      >
        {props.modalMode === "nonexist" ? (
          <>
            <Image src={Warning} alt="union" width={0} className="mb-6" />
            <h3 className="title-20-s mb-3 text-center">
              모집글을 작성할<br></br>스터디 그룹이 없어요
            </h3>
            <p className="body-14-m mb-4 text-center text-gray-700">
              지금 바로 스터디를 만드시겠습니까?
            </p>
            <div className="body-16-s m-4 flex w-full justify-center">
              <button
                onClick={props.onClose}
                className="... ml-1 flex w-2/6 items-center justify-center rounded-full border border-black text-center text-lg text-black"
              >
                취소
              </button>
              <Link
                href="/write/study"
                className="... ... ml-1 flex size-14 w-4/6 items-center justify-center rounded-full bg-secondary-900 text-center text-lg text-white"
              >
                스터디 만들기
              </Link>
            </div>
          </>
        ) : props.modalMode === "close" ? (
          <div className="fixed inset-0 flex w-full items-center justify-center bg-black bg-opacity-50">
            <div className="flex h-[392px] w-[327px] flex-col items-center justify-center overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:h-[525px] md:w-[440px] md:px-[52px] md:py-[45px]">
              <Image
                src={Warning}
                alt="union"
                width={0}
                className="mb-6 md:mt-16"
              />
              <h3 className="title-20-s mb-3 text-center">
                지금 나가면 지금까지 <br></br> 작성한 기록이 사라져요.
              </h3>
              <p className="body-14-m mb-4 text-center text-gray-700">
                정말 이 페이지에서 나가시겠습니까?
              </p>
              <div className="body-16-s m-4 flex w-full justify-center md:pt-10">
                <Link
                  href={"/"}
                  className="ml-1 flex h-[48px] w-[80px] items-center justify-center rounded-full border border-black text-center text-lg text-black md:h-[48px] md:w-[100px]"
                >
                  나가기
                </Link>
                <button
                  className="ml-1 flex size-14 h-[48px] w-[203px] items-center justify-center rounded-full bg-secondary-900 text-center text-lg text-white md:ml-2 md:h-[48px] md:w-[228px]"
                  onClick={props.onClose}
                >
                  계속 작성하기
                </button>
              </div>
            </div>
          </div>
        ) : props.modalMode === "success" ? (
          <div className="fixed inset-0 flex w-full items-center justify-center bg-black bg-opacity-50">
            <div className="flex h-[392px] w-[327px] flex-col items-center justify-center overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:h-[525px] md:w-[440px] md:px-[52px] md:py-[45px]">
              <Image
                src={Write} // 기존 이미지 그대로 사용
                alt="union"
                width={0}
                className="mb-6 md:mt-16"
              />
              <h3 className="title-20-s mb-3 text-center">
                모집글을 바로 <br /> 작성하시겠습니까?
              </h3>
              <p className="body-14-m mb-4 text-center text-gray-700">
                모집글을 통해 나와 함께 스터디할 <br /> 팀원들을 만날 수 있어요!
              </p>
              <div className="body-16-s m-4 flex w-full justify-center md:pt-10">
                <Link
                  href="/"
                  className="ml-1 flex h-[48px] w-[80px] items-center justify-center rounded-full border border-black text-center text-lg text-black md:h-[48px] md:w-[100px]"
                >
                  취소
                </Link>
                <Link
                  href="/write"
                  className="ml-1 flex size-14 h-[48px] w-[203px] items-center justify-center rounded-full bg-secondary-900 text-center text-lg text-white md:ml-2 md:h-[48px] md:w-[228px]"
                >
                  모집글 작성하기
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Image src={Warning} alt="union" width={0} className="mb-6" />
            <h3 className="title-20-s mb-3 text-center">
              이미지 파일 형식이 아닙니다.
            </h3>
            <p className="body-14-m mb-4 text-center text-gray-700">
              이미지 파일을 업로드해주세요.
            </p>
            <div className="body-16-s m-4 flex w-full justify-center">
              <button
                onClick={props.onClose}
                className="... ml-1 flex w-full items-center justify-center rounded-full border border-black text-center text-lg text-black"
              >
                확인
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default StudyModal;
