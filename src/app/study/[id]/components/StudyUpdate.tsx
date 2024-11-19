import React, { useEffect, useState } from "react";
import SquareInput from "../../../write/components/SquareInput";
import RoundSelectDiv from "../../../write/components/RoundSelectDiv";
import { fetchStudyInfo } from "@/utils/supabase/supabase-server";
import { Tables } from "../../../../../database.types";
import Modal from "@/components/common/Modal";
import SelectDate from "@/app/write/components/SelectDate";
import MyButton from "@/components/common/Button";
import DeleteModal from "@/components/common/DeleteModal";
import useModalOpen from "@/hooks/useModalOpen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudy } from "@/utils/supabase/supabase-client";
import { useRouter } from "next/navigation";
import Badge from "@/components/common/Badge";

type Props = {
  urlStudyId: string;
  onConfirm: (data: Tables<"study">) => void;
};

const StudyUpdate = (props: Props) => {
  const [study, setStudy] = useState<Tables<"study">>();
  const queryClient = useQueryClient();
  const router = useRouter();

  // 공용 모달 관리 - 직업 태그, 분류 태그 관리
  const [isCommonModalOpen, setIsCommonModalOpen] = useState<boolean>(false);
  const [commonModalMode, setCommonModalMode] = useState<string>("");
  // 삭제 모달 상태 관리router
  const { modalClose, modalOpen, isModalOpen } = useModalOpen();
  // 인원 모달 상태 관리
  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);

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

  // 스터디의 값이 셋팅 될 때마다 onConfirm
  useEffect(() => {
    if (study) {
      props.onConfirm(study); // study 값이 변경될 때마다 부모로 전달
    }
  }, [study]); // study 값이 변경될 때마다 실행

  const handleModalClick = (mode: string) => {
    setCommonModalMode(mode);
    setIsCommonModalOpen(true);
  };

  const { mutate: deleteStudyMutation } = useMutation({
    mutationFn: () => deleteStudy(props.urlStudyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["study", props.urlStudyId],
      });
      router.replace("/study");
    },
  });

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
          value={
            study?.study_category[0] === "" ? "선택해주세요" : "1개 선택됨"
          }
        >
          <div className="flex w-full flex-wrap justify-start gap-x-[4px] pt-2">
            <Badge
              category={study?.study_category[0] || ""}
              color="secondarymore"
              idx={0}
              key={0}
            />
          </div>
        </RoundSelectDiv>

        <RoundSelectDiv
          onClick={() => handleModalClick("study")}
          title="스터디 태그"
          value={
            !study?.study_category[1]
              ? "선택해주세요"
              : study?.study_category.slice(1).length + "개 선택됨"
          }
        >
          <div className="flex w-full flex-wrap justify-start gap-x-[4px] pt-2">
            {study &&
              study?.study_category &&
              study?.study_category.map((category, idx) =>
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
        </RoundSelectDiv>

        <div className="flex items-center justify-between pt-14">
          <div className="flex flex-col">
            <h1 className="body-16-m cursor-pointer">스터디 삭제</h1>
            <p className="body-14-r text-secondary-300">
              삭제하면 다시 복구할 수 없습니다.
            </p>
          </div>
          <MyButton
            size="sm"
            style="black-fill"
            className="w-20"
            onClick={modalOpen}
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
          setStudy((prevStudy) => {
            if (!prevStudy) {
              return undefined; // 초기 상태가 undefined일 경우 처리
            }
            return {
              ...prevStudy, // 기존 데이터 유지
              study_category: arr, // 이미지 URL 변경
            };
          });
          setIsCommonModalOpen(false);
        }}
        modalMode={commonModalMode}
        arr={study?.study_category || [""]}
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
            setIsDateOpen(false);
          }}
          selectedDate={study?.study_max_people || 1}
          mode="cnt"
        />
      )}
      {isModalOpen && (
        <DeleteModal onClose={modalClose} onDelete={deleteStudyMutation} />
      )}
    </div>
  );
};

export default StudyUpdate;
