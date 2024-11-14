"use client";

import { useParams } from "next/navigation";
import WaitApplyList from "../components/WaitApplyList";
import ManagedMemberList from "../components/ManagedMemberList";
import { useReducer, useRef, useState } from "react";
import ManageOptions from "../components/ManageOptions";
import StudyImage from "../components/StudyImage";
import { Tables } from "../../../../../database.types";
import MyButton from "@/components/common/Button";
import StudyUpdate from "../components/StudyUpdate";
import Link from "next/link";
import browserClient from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { updateStudy } from "@/utils/supabase/supabase-client";

const Page = () => {
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const paramsurl = useParams();
  const urlStudyId: string = Array.isArray(paramsurl.id)
    ? paramsurl.id[0]
    : paramsurl.id;

  const [study, setStudy] = useState<Tables<"study">>({
    study_category: [], // 기본값은 빈 배열
    study_chaturl: null, // 기본값은 null
    study_createtime: "", // 기본값은 빈 문자열
    study_description: null, // 기본값은 null
    study_id: "", // 기본값은 빈 문자열
    study_imgurl: null, // 기본값은 null
    study_manager: "", // 기본값은 빈 문자열
    study_max_people: 1, // 기본값은 1명
    study_name: "", // 기본값은 빈 문자열
    study_period: null, // 기본값은 null
    study_score: 0, // 기본값은 0
  });

  const isLoadingRef = useRef(false);
  const [file, setFile] = useState<File>();

  const [isStudyMenu, setIsStudyMenu] = useState<boolean>(false);

  const handlerUpdateStudy = async () => {
    if (study === undefined) {
      return;
    }

    // 태그 처리 확인
    if (study.study_category[0] === "") {
      // toast로 변경 예정
      alert("태그를 최소 한가지 선택해주세요");
      isLoadingRef.current = false;
      return;
    }
    if (isLoadingRef.current) {
      return;
    }
    try {
      if (file !== null && file !== undefined) {
        const { data, error } = await browserClient.storage
          .from("study_img")
          .upload(`${Date.now()}`, file);

        if (error) {
          console.log("이미지 업로드 중 오류 발생", error);
          isLoadingRef.current = false;
          throw error;
        }

        const imageUrl = browserClient.storage
          .from("study_img")
          .getPublicUrl(`${data!.path}`).data.publicUrl;

        console.log("여기온거지??1111");
        updateStudyMutation(imageUrl);
      } else {
        console.log("여기온거지??222");
        updateStudyMutation(null);
      }

      return;
    } catch (e) {
      console.log(e);
      isLoadingRef.current = false;
      alert(e);
    }
    isLoadingRef.current = true;

    alert("스터디 수정이 완료되었어요");
  };

  // 프로필 수정하는 부분
  const { mutate: updateStudyMutation } = useMutation({
    mutationFn: (url: string | null) =>
      updateStudy(
        study.study_id,
        study.study_name,
        study.study_category,
        study.study_max_people,
        study.study_description || "",
        study.study_chaturl || "",
        url === null ? study.study_imgurl : url,
      ),
    onSuccess: () => {
      console.log(study);
      isLoadingRef.current = false;
      console.log("수정완료");
      // if (userCnt === 1) {
      //   router.replace("/");
      // }
    },
    onError: () => {
      alert("스터디를 수정하지 못했습니다");
      isLoadingRef.current = false;
    },
  });

  return (
    <div>
      <StudyImage
        urlStudyId={urlStudyId}
        onConfirm={(data: Tables<"study">) => {
          setStudy((prevStudy) => ({
            ...prevStudy, // 기존 상태 유지
            ...data, // 새로운 데이터 병합
          }));
        }}
        onFile={(file: File) => {
          setFile(file);
        }}
      ></StudyImage>
      <ManageOptions
        onConfirm={(data: boolean) => {
          setIsStudyMenu(data);
        }}
      />

      {!isStudyMenu ? (
        <div>
          <WaitApplyList urlStudyId={urlStudyId} />
          <ManagedMemberList
            urlStudyId={urlStudyId}
            key={updateTrigger}
            setUpdateTrigger={setUpdateTrigger}
          />
          <div className="absolute bottom-[14px] w-full">
            <div className="mx-6 flex flex-row gap-x-1">
              <MyButton style="gray-2" size="lg">
                <Link href={"/study"}>나가기</Link>
              </MyButton>
              <MyButton
                size="lg"
                style="black-fill"
                className="w-full"
                onClick={() => {
                  handlerUpdateStudy();
                }}
              >
                적용하기
              </MyButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-4 flex w-full flex-col">
          <StudyUpdate
            urlStudyId={urlStudyId}
            onConfirm={(data: Tables<"study">) => {
              setStudy((prevStudy) => ({
                ...prevStudy, // 기존 상태 유지
                ...data, // 새로운 데이터 병합
              }));
            }}
          ></StudyUpdate>
          <div className="mx-6 flex flex-row gap-x-1">
            <MyButton style="gray-2" size="lg">
              <Link href={"/study"}>나가기</Link>
            </MyButton>
            <MyButton
              size="lg"
              style="black-fill"
              className="w-full"
              disabled={isLoadingRef.current}
              onClick={() => {
                handlerUpdateStudy();
              }}
            >
              적용하기
            </MyButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
