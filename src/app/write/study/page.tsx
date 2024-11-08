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
import stroke from "../../../../public/icons/Next.svg";
import SelectDate from "../components/SelectDate";

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
    browserClient.storage.from("study_img").getPublicUrl("default").data
      .publicUrl,
  );

  const [arr, setArr] = useState<string[]>([""]);

  // 스터디 페이지 내에서 사용하는 모달창 관리
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<string>("");

  // 공용 모달 관리 - 직업 태그, 분류 태그 관리
  const [isCommonModalOpen, setIsCommonModalOpen] = useState<boolean>(false);
  const [commonModalMode, setCommonModalMode] = useState<string>("");

  // Date 모달 상태관리
  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // useMutation 훅을 항상 호출합니다.
  const { mutate: createStudy } = useMutation({
    mutationFn: (url: string) =>
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
      if (userCnt === 1) {
        router.replace("/");
      } else {
        setModalMode("success");
        setIsModalOpen(true);
      }
    },
    onError: () => {
      alert("스터디를 생성하지 못했습니다.");
    },
  });

  // user가 준비되지 않았을 때 로딩 화면을 보여줍니다.
  if (!user) {
    return <div>로딩 중...</div>;
  }

  const handleModalClose = () => {
    if (title && modalMode !== "success") {
      setIsModalOpen(false);
      setIsCommonModalOpen(false);
    } else {
      router.replace("/");
    }
  };

  const sendData = async () => {
    if (arr[0] !== "") {
      if (fileInputRef.current?.files) {
        const { data, error } = await browserClient.storage
          .from("study_img")
          .upload(`${user?.id}${Date.now()}`, fileInputRef.current.files[0]);
        if (error) {
          console.log("이미지 업로드 중 오류 발생", error);
          return;
        }

        const url = browserClient.storage
          .from("study_img")
          .getPublicUrl(`${data!.path}`).data.publicUrl;

        createStudy(url); // useMutation 호출
      }
    } else {
      alert("직업 태그를 최소 한가지 선택해주세요");
    }
  };

  const ImageUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setUploadImg(reader.result as string);
        };
      }
    }
  };

  const handleModalClick = (mode: string) => {
    setCommonModalMode(mode);
    setIsCommonModalOpen(true);
  };

  return (
    <div className="mx-auto flex w-11/12 flex-col">
      <div className="... flex w-full items-center justify-between p-2 text-2xl">
        <Image
          src={Xmedium}
          alt="selectBtn"
          width={0}
          onClick={() => {
            setModalMode("close");
            setIsModalOpen(true);
          }}
        />
        <p className="body-16-s text-black">스터디 만들기</p>
        <Image
          src={Check}
          alt="selectBtn"
          width={0}
          onClick={() => sendData()}
        />
      </div>

      <div className="relative mb-4 flex h-1/3 w-full flex-col">
        <p className="body-16-m mb-2 text-black">
          대표 이미지 <span className="text-primary-50">{`(선택)`}</span>
        </p>
        <div className="relative h-full w-full">
          <Image
            src={uploadImg}
            alt="userImg"
            width={500}
            height={300}
            className="object-full h-full w-full rounded-3xl" // 부모에 맞게 꽉 차게 설정
            onClick={() => fileInputRef.current?.click()}
          />
          <Image
            src={ImageSelect}
            alt="selectBtn"
            width={35}
            className="absolute inset-0 m-auto" // 중앙 정렬
          />
        </div>
        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={ImageUploadHandler}
        />
      </div>

      <div className="mt-3 flex w-full flex-col">
        <p className="mb-2 text-black">
          제목 <span className="text-primary-50">*</span>
        </p>
        <input
          className="body-16-m mb-4 w-full rounded-2xl bg-secondary-50 p-3 placeholder-secondary-300"
          value={title}
          maxLength={25}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 작성해주세요"
        />
        <p className="mb-2 text-black">
          한 줄 설명 <span className="text-primary-50">*</span>
        </p>
        <input
          className="body-16-m mb-4 w-full rounded-2xl bg-secondary-50 p-3 placeholder-secondary-300"
          value={studyDescription}
          onChange={(e) => setStudyDescription(e.target.value)}
          placeholder="그룹을 소개하는 설명을 작성해주세요."
        />
        <p className="mb-2 text-black">
          오픈채팅방 링크 <span className="text-primary-50">{`(선택)`}</span>
        </p>
        <input
          className="body-16-m mb-8 w-full rounded-2xl bg-secondary-50 p-3 placeholder-secondary-300"
          value={studychatLink}
          onChange={(e) => setStudyChatLink(e.target.value)}
          placeholder="팀원들과 소통할 채팅방 링크를 넣어주세요."
        />
      </div>

      <div className="mb-5 flex w-full flex-col rounded-2xl border border-gray-300">
        <div className="flex w-full items-center justify-between">
          <p className="p-3">인원</p>
          <div onClick={() => setIsDateOpen(true)} className="flex">
            <p className="body-16-m pr-3 text-secondary-300">{`${userCnt}명`}</p>
            <Image src={stroke} alt="selectBtn" width={0} className="mr-3" />
          </div>
        </div>
        {userCnt === 1 ? (
          <p className="caption p-3 text-secondary-400">
            * 1인 스터디는 랭킹에 집계되지 않아요! <br></br> 스터디 페이지에서
            인원 설정을 변경할 수 있습니다.
          </p>
        ) : null}
      </div>

      <div className="mb-5 flex w-full items-center justify-between rounded-2xl border border-gray-300">
        <p className="whitespace-nowrap p-3">직업 태그</p>
        <div className="flex">
          <p
            className="body-16-m pr-3 text-secondary-300"
            onClick={() => handleModalClick("job")}
          >
            {arr[0] === "" ? "직업을 선택해주세요" : arr[0]}
          </p>
          <Image src={stroke} alt="selectBtn" width={0} className="mr-3" />
        </div>
      </div>

      <div className="mb-5 flex w-full items-center justify-between rounded-2xl border border-gray-300">
        <p className="whitespace-nowrap p-3">스터디 태그</p>
        <div className="flex">
          <p
            className="body-16-m pr-3 text-secondary-300"
            onClick={() => handleModalClick("study")}
          >
            {!arr[1] ? "스터디 태그를 선택해주세요" : arr.slice(1).join(",")}
          </p>
          <Image src={stroke} alt="selectBtn" width={0} className="mr-3" />
        </div>
      </div>

      <StudyModal
        isModalOpen={isModalOpen}
        onClose={() => handleModalClose()}
        onConfirm={() => setIsModalOpen(false)}
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
          onConfirm={(cnt: string) => {
            setUserCnt(Number(cnt));
            setIsDateOpen(false);
          }}
          onClose={() => {
            setIsModalOpen(false);
            setIsDateOpen(false);
          }}
          mode="cnt"
        />
      )}
    </div>
  );
}
