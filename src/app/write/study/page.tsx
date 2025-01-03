"use client";
import { usePublicUser } from "@/hooks/useUserProfile";
import browserClient from "@/utils/supabase/client";
import { insertStudy } from "@/utils/supabase/supabase-client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { Suspense, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import StudyModal from "../components/StudyModal";
import Modal from "@/components/common/Modal";
import ImageSelect from "../../../../public/icons/ImageSelect.svg";
import Xmedium from "../../../../public/icons/XMedium.svg";
import Check from "../../../../public/icons/Check.svg";
import CheckWhite from "../../../../public/icons/CheckWhite.svg";
import SelectDate from "../components/SelectDate";
import SquareInput from "../components/SquareInput";
import RoundSelectDiv from "../components/RoundSelectDiv";
import { useToast } from "@/hooks/useToast";
import Badge from "@/components/common/Badge";

export default function Study() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <StudyContent />
    </Suspense>
  );
}

function StudyContent() {
  const { data: user } = usePublicUser();
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [userCnt, setUserCnt] = useState<number>(1);
  const [studychatLink, setStudyChatLink] = useState<string>("");
  const [studyDescription, setStudyDescription] = useState<string>("");
  const [uploadImg, setUploadImg] = useState<string>(
    "https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/study_img/default",
  );
  const [isSubModalOpen, setIsSubModalOpen] = useState<boolean>(false);

  const { showToast, ToastComponent } = useToast();

  //Ref 관련..
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isLoadingRef = useRef(false);

  const [arr, setArr] = useState<string[]>([""]);

  // 스터디 페이지 내에서 사용하는 모달창 관리
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<string>("");

  // 공용 모달 관리 - 직업 태그, 분류 태그 관리
  const [isCommonModalOpen, setIsCommonModalOpen] = useState<boolean>(false);
  const [commonModalMode, setCommonModalMode] = useState<string>("");

  // Date 모달 상태관리
  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);

  // useMutation 훅을 항상 호출합니다.
  const { mutate: createStudy } = useMutation({
    mutationFn: (url: string | undefined) =>
      insertStudy(
        title,
        arr,
        userCnt,
        user?.id,
        studyDescription,
        studychatLink,
        url,
      ),
    onSuccess: () => {
      isLoadingRef.current = false;
      if (userCnt === 1) {
        router.replace("/");
      } else {
        setModalMode("success");
        setIsModalOpen(true);
      }
    },
    onError: () => {
      alert("스터디를 생성하지 못했습니다");
      isLoadingRef.current = false;
    },
  });

  const handleSendData = async () => {
    // 태그 처리 확인
    if (arr[0] === "") {
      // toast로 변경 예정
      alert("태그를 최소 한가지 선택해주세요");
      isLoadingRef.current = false;
      return;
    }

    if (isLoadingRef.current) {
      return;
    }
    isLoadingRef.current = true;
    try {
      let imageUrl;
      if (
        fileInputRef.current?.files &&
        fileInputRef.current.files.length > 0
      ) {
        const { data, error } = await browserClient.storage
          .from("study_img")
          .upload(`${user?.id}${Date.now()}`, fileInputRef.current.files[0]);

        if (error) {
          isLoadingRef.current = false;
          throw error;
        }

        imageUrl = browserClient.storage
          .from("study_img")
          .getPublicUrl(`${data!.path}`).data.publicUrl;
      }
      createStudy(imageUrl);
    } catch (e) {
      isLoadingRef.current = false;
      alert(e);
    }
  };

  const ImageUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allowExtenstions = ["image/png", "image/jpeg", "image/jpg"];

    // 파일이 선택되지 않았을 경우 처리
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];

    if (file && allowExtenstions.includes(file.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUploadImg(reader.result as string);
      };
    } else if (!allowExtenstions.includes(file.type)) {
      showToast("선택한 파일이 이미지 형식이 아닙니다.");
      e.target.value = "";
    }
  };

  const handleModalClick = (mode: string) => {
    setCommonModalMode(mode);
    setIsCommonModalOpen(true);
  };

  return (
    <div className="flex w-full flex-col items-center justify-start overflow-x-hidden px-[24px] md:mx-auto md:max-w-[886px]">
      <div className="flex h-[48px] w-full items-center justify-between bg-white text-2xl md:h-[68px] md:max-w-[886px]">
        <Image
          src={Xmedium}
          alt="selectBtn"
          width={0}
          onClick={() => {
            if (title !== "" || studyDescription !== "") {
              setModalMode("close");
              setIsModalOpen(true);
            } else {
              router.replace("/");
            }
          }}
          className="block md:hidden"
        />
        <p className="body-16-s md:title-20-s text-black">스터디 만들기</p>
        <button
          disabled={isLoadingRef.current}
          onClick={() => handleSendData()}
        >
          <Image
            src={Check}
            alt="selectBtn"
            width={0}
            className="block md:hidden"
          />
        </button>

        <div className="body-14-s hidden md:flex">
          <button
            onClick={() => {
              if (title !== "" || studyDescription !== "") {
                setModalMode("close");
                setIsModalOpen(true);
              } else {
                router.replace("/");
              }
            }}
            className="hidden h-9 w-20 items-center justify-center rounded-[18px] bg-tertiary-100 md:block"
          >
            <div className="flex items-center justify-center">
              <Image src={Xmedium} alt="selectBtn" width={0} className="pr-1" />
              취소
            </div>
          </button>

          <button
            disabled={isLoadingRef.current}
            onClick={() => handleSendData()}
            className="ml-3 hidden h-9 w-20 items-center justify-center rounded-[18px] bg-secondary-900 md:block"
          >
            <div className="flex items-center justify-center text-white">
              <Image
                src={CheckWhite}
                alt="selectBtn"
                width={0}
                className="pr-1"
              />
              저장
            </div>
          </button>
        </div>
      </div>

      <div className="mb-4 md:mt-[60px] flex w-full flex-col md:mb-9">
        <p className="body-16-m mb-[8px] ml-[4px]">
          대표 이미지 <span className="text-primary-50">{`(선택)`}</span>
        </p>
        <div className="relative flex min-h-[200px] min-w-[327px] items-center justify-center overflow-hidden rounded-3xl md:min-h-[300px] md:w-full">
          <Image
            src={uploadImg}
            alt="studyImg"
            fill
            className="h-full w-full rounded-3xl border object-cover" // 부모 크기에 맞추기
            priority={true}
          />
          <Image
            src={ImageSelect}
            alt="selectBtn"
            width={35}
            className="absolute inset-0 m-auto"
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
      </div>

      <div className="flex w-full flex-col gap-y-[12px]">
        <SquareInput
          maxLength={25}
          title="제목"
          placeholder="제목을 작성해주세요."
          value={title}
          onChange={setTitle}
          essential={true}
          viewLength={true}
        />
        <SquareInput
          maxLength={80}
          title="한 줄 설명"
          placeholder="그룹을 소개하는 설명을 작성해주세요."
          value={studyDescription}
          onChange={setStudyDescription}
          essential={true}
          viewLength={true}
        />
        <SquareInput
          title="오픈채팅방 링크"
          placeholder="팀원들과 소통할 채팅방 링크를 넣어주세요."
          value={studychatLink}
          onChange={setStudyChatLink}
          caption="(선택)"
        />
        <div className="mt-[28px] flex flex-col gap-y-[12px]">
          <RoundSelectDiv
            onClick={() => setIsDateOpen(true)}
            title="인원"
            value={`${userCnt}명`}
          >
            {userCnt === 1 && (
              <p className="caption mt-[8px] leading-[1.3] text-secondary-400">
                * 1인 스터디는 랭킹에 집계되지 않아요! <br />
                스터디 페이지에서 인원 설정을 변경할 수 있습니다.
              </p>
            )}
          </RoundSelectDiv>
          <RoundSelectDiv
            onClick={() => handleModalClick("job")}
            title="직업 태그"
            value={arr[0] === "" ? "선택해주세요" : "1개 선택됨"}
          >
            {arr[0] !== "" && arr[0] !== undefined ? (
              <div className="flex w-full flex-wrap justify-start gap-x-[4px] pt-2">
                <Badge
                  category={arr[0] || ""}
                  color="secondarymore"
                  idx={0}
                  key={0}
                />
              </div>
            ) : null}
          </RoundSelectDiv>

          <RoundSelectDiv
            onClick={() => handleModalClick("study")}
            title="스터디 태그"
            value={!arr[1] ? "선택해주세요" : arr.slice(1).length + "개 선택됨"}
          >
            {arr[1] !== undefined ? (
              <div className="flex w-full flex-wrap justify-start gap-x-[4px] pt-2">
                {arr &&
                  arr.map((category, idx) =>
                    idx !== 0 ? (
                      <Badge
                        category={category}
                        color="primary"
                        idx={idx}
                        key={idx}
                      />
                    ) : null,
                  )}
              </div>
            ) : null}
          </RoundSelectDiv>
        </div>
      </div>

      <StudyModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalMode={modalMode}
      />

      <Modal
        isModalOpen={isCommonModalOpen}
        onClose={() => {
          setIsCommonModalOpen(false);
        }}
        onConfirm={(arr: string[]) => {
          setArr(arr);
          setIsCommonModalOpen(false);
        }}
        modalMode={commonModalMode}
        arr={arr}
      />

      {isDateOpen && (
        <SelectDate
          onConfirm={(cnt: string | number) => {
            setUserCnt(Number(cnt));
            setIsDateOpen(false);
          }}
          selectedDate={userCnt}
          mode="cnt"
          isModalOpen={isDateOpen}
        />
      )}

      <ToastComponent position="tc" />

      {isSubModalOpen && (
        <div className="body-16-m absolute right-[35px] top-[205px] z-30 flex h-fit w-[148px] flex-col rounded-8 bg-white px-4 py-1 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)] md:right-[930px] md:top-[250px]">
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
              setUploadImg(
                "https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/study_img/default",
              );
              setIsSubModalOpen(false);
            }}
          >
            기본 이미지로 변경
          </div>
        </div>
      )}
    </div>
  );
}
