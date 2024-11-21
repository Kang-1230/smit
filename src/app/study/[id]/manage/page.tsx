"use client";

import { useParams, useRouter } from "next/navigation";
import WaitApplyList from "../components/WaitApplyList";
import ManagedMemberList from "../components/ManagedMemberList";
import { useRef, useState } from "react";
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
    study_imgurl: "", // 기본값은 빈 문자열
    study_manager: "", // 기본값은 빈 문자열
    study_max_people: 1, // 기본값은 1명
    study_name: "", // 기본값은 빈 문자열
    study_period: null, // 기본값은 null
    study_score: 0, // 기본값은 0
  });
  const router = useRouter();

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
          isLoadingRef.current = false;
          throw error;
        }

        const imageUrl = browserClient.storage
          .from("study_img")
          .getPublicUrl(`${data!.path}`).data.publicUrl;
        updateStudyMutation(imageUrl);
      } else {
        updateStudyMutation(null);
      }

      return;
    } catch (e) {
      isLoadingRef.current = false;
      alert(e);
    }
    isLoadingRef.current = true;

    alert("스터디 수정이 완료되었어요");
  };

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
      isLoadingRef.current = false;
      router.replace("/study");
    },
    onError: () => {
      alert("스터디를 수정하지 못했습니다");
      isLoadingRef.current = false;
    },
  });

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-[886px]">
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
          <div className="pb-[40px]">
            <WaitApplyList urlStudyId={urlStudyId} />
            <ManagedMemberList
              urlStudyId={urlStudyId}
              key={updateTrigger}
              setUpdateTrigger={setUpdateTrigger}
            />
            <div className="fixed bottom-0 flex w-full items-center gap-2 border-t bg-white px-6 py-3 md:hidden">
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
        ) : (
          <div className="mb-4 flex w-full flex-col pb-[40px]">
            <StudyUpdate
              urlStudyId={urlStudyId}
              onConfirm={(data: Tables<"study">) => {
                setStudy((prevStudy) => ({
                  ...prevStudy, // 기존 상태 유지
                  ...data, // 새로운 데이터 병합
                }));
              }}
            ></StudyUpdate>
            <div className="fixed bottom-0 flex w-full items-center gap-2 border-t bg-white px-6 py-3 md:hidden">
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
    </div>
  );
};

export default Page;
