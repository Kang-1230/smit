import React, { useEffect, useState } from "react";
import SquareInput from "../../../write/components/SquareInput";
import RoundSelectDiv from "../../../write/components/RoundSelectDiv";
import { fetchStudyInfo } from "@/utils/supabase/supabase-server";
import { Tables } from "../../../../../database.types";
import Modal from "@/components/common/Modal";
import SelectDate from "@/app/write/components/SelectDate";
import MyButton from "@/components/common/Button";

type Props = {
  urlStudyId: string;
  onConfirm: (data: Tables<"study">) => void;
};

const StudyUpdate = (props: Props) => {
  const [study, setStudy] = useState<Tables<"study">>();

  // 공용 모달 관리 - 직업 태그, 분류 태그 관리
  const [isCommonModalOpen, setIsCommonModalOpen] = useState<boolean>(false);
  const [commonModalMode, setCommonModalMode] = useState<string>("");

  // Date 모달 상태관리
  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);

  // 선택한 배열 관리
  const [arr, setArr] = useState<string[]>([""]);

  // 최초 스터디 정보 get
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudyInfo(props.urlStudyId);
      if (data) {
        setStudy(data);
      }
    };

    fetchData();
  }, [props.urlStudyId]);

  const handleModalClick = (mode: string) => {
    setCommonModalMode(mode);
    setIsCommonModalOpen(true);
  };

  return (
    <div className="overflow-y: auto mb-10 flex flex-col gap-y-[12px] px-6">
      <SquareInput
        maxLength={25}
        title="한 줄 설명"
        placeholder="그룹을 소개하는 설명을 작성해주세요."
        value={study?.study_description || ""}
        onChange={(value: string) => {
          setStudy((prevStudy) => {
            if (!prevStudy) {
              return undefined; // 초기 상태가 undefined일 경우 처리
            }
            return {
              ...prevStudy, // 기존 데이터 유지
              study_description: value, // 이미지 URL 변경
            };
          });
        }}
        essential={true}
        viewLength={true}
      />
      <SquareInput
        maxLength={25}
        title="오픈채팅방 링크"
        placeholder="팀원들과 소통할 채팅방 링크를 넣어주세요."
        value={study?.study_chaturl + ""}
        onChange={(value: string) => {
          setStudy((prevStudy) => {
            if (!prevStudy) {
              return undefined;
            }
            return {
              ...prevStudy,
              study_chaturl: value,
            };
          });
        }}
        caption="(선택)"
      />
      <div className="mt-[28px] flex flex-col gap-y-[12px]">
        <RoundSelectDiv
          onClick={() => setIsDateOpen(true)}
          title="인원"
          value={`${study?.study_max_people}명`}
        >
          {study?.study_max_people === 1 && (
            <p className="caption mt-[8px] text-secondary-400">
              * 1인 스터디는 랭킹에 집계되지 않아요! <br></br> 스터디 페이지에서
              인원 설정을 변경할 수 있습니다.
            </p>
          )}
        </RoundSelectDiv>

        <RoundSelectDiv
          onClick={() => handleModalClick("job")}
          title="직업 태그"
          value={arr[0] === "" ? "선택해주세요" : arr[0]}
        />

        <RoundSelectDiv
          onClick={() => handleModalClick("study")}
          title="스터디 태그"
          value={!arr[1] ? "선택해주세요" : arr.slice(1).join(",")}
        />

        <div className="flex items-center justify-between pt-14">
          <div className="flex flex-col">
            <h1 className="body-16-m">스터디 삭제</h1>
            <p className="body-14-r text-secondary-300">
              삭제하면 다시 복구할 수 없습니다.
            </p>
          </div>
          <MyButton
            size="sm"
            style="black-fill"
            className="w-20"
            onClick={() => {
              console.log("적용하기 누른거맞니??");
              // profileSaveHandler();
              // modalClose();
            }}
          >
            삭제하기
          </MyButton>
        </div>
      </div>

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
            setStudy((prevStudy) => {
              if (!prevStudy) {
                return undefined; // 초기 상태가 undefined일 경우 처리
              }
              return {
                ...prevStudy, // 기존 데이터 유지
                study_max_people: Number(cnt), // 이미지 URL 변경
              };
            });
          }}
          selectedDate={study?.study_max_people || 1}
          mode="cnt"
        />
      )}
    </div>
  );
};

export default StudyUpdate;
