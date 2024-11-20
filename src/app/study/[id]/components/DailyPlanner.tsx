"use client";

import MyButton from "@/components/common/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "@/hooks/useUserProfile";
import {
  useDeleteStudyGoalMutation,
  useInsertStudyGoalMutation,
  useStudyGoal,
  useUpdateStudyGoal,
} from "../hooks/usePersonalGoal";
import Loading from "@/components/common/Loading";

const DailyPlanner = ({
  studyId,
  isBtnActive,
}: {
  studyId: string;
  isBtnActive: boolean;
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { data: user = null } = useSession();
  const {
    data: serverData,
    isLoading,
    isError,
  } = useStudyGoal(studyId, user?.id);

  const [editGoalId, setEditGoalId] = useState<number | null>(null);
  const [goalTitle, setGoalTitle] = useState<string>("");

  useEffect(() => {
    if (serverData?.length === 0) {
      setIsEdit(false); // serverData가 비어 있을 때 isEdit를 false로 설정
    }
  }, [serverData]);

  const { mutate: mutateDelete } = useDeleteStudyGoalMutation(
    studyId,
    user?.id,
  );

  const { mutate: mutateAdd } = useInsertStudyGoalMutation(studyId, user?.id);

  const { mutate: mutateUpdate } = useUpdateStudyGoal(studyId, user?.id);

  if (isLoading || !serverData) {
    return <Loading />;
  }

  if (isError) {
    return <div>학습목표 데이터를 불러오는데에 실패했습니다.</div>;
  }

  const handleApplyBtn = () => {
    setIsEdit((prevState) => !prevState); // 상태 변경을 일관되게 처리
  };

  const handleDeleteGoal = (goalId: number) => {
    mutateDelete(goalId);
  };

  const handleAddGoal = (goalName: string | undefined) => {
    mutateAdd(goalName); // 목표 추가
  };

  const handleUpdateGoal = (
    goalId: number,
    goalName?: string,
    isSuccess?: boolean,
  ) => {
    mutateUpdate({ goalId: goalId, goalName: goalName, isSuccess: isSuccess });
  };

  const handleGoalClick = (goalId: number, goalName: string) => {
    if (editGoalId !== goalId) {
      if (goalName === "오늘의 목표를 작성해주세요.") {
        setEditGoalId(goalId);
        setGoalTitle(""); // 해당 goalName을 goalTitle로 설정하여 수정 가능하게 함
      } else {
        setEditGoalId(goalId);
        setGoalTitle(goalName); // 해당 goalName을 goalTitle로 설정하여 수정 가능하게 함
      }
    }
  };

  return (
    <div className="relative mt-4 min-h-[107px] w-full rounded-20 bg-gradient-to-br from-[#8D8D8D] to-[#656565] p-[1px]">
      <div className="relative h-full w-full overflow-hidden rounded-20 bg-secondary-800 text-white">
        <div className="absolute -top-3 left-0 h-12 w-20 rounded-full bg-[rgba(255,153,69,0.3)] blur-xl"></div>
        <div className="h-full min-h-[107px] w-full rounded-20 bg-gradient-to-b from-[#6d6d6d80] to-[#6b696980] px-4 py-4">
          <div className="caption flex flex-row items-center justify-between text-secondary-50">
            <div className="flex items-center justify-center">
              <Image
                src={`/icons/EditWhite.svg`}
                alt="book"
                width={16}
                height={16}
                className="mr-1"
              />
              Daily Planner
            </div>

            {isBtnActive ? (
              <div>
                <button
                  className={`h-6 w-6 items-center justify-start rounded-full border border-white/50 ${
                    isEdit ? "border border-black bg-white" : "bg-secondary-500"
                  }`}
                  onClick={handleApplyBtn}
                >
                  <Image
                    src={
                      isEdit ? "/icons/Check.svg" : "/icons/PlusMediumWhite.svg"
                    }
                    alt="union"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                  />
                </button>
              </div>
            ) : null}
          </div>
          <div className="body-14-r flex flex-col pt-6">
            <div className="flex h-fit max-h-[300px] w-full flex-col overflow-auto">
              {serverData.length !== 0
                ? serverData.map((item) => (
                    <div
                      className="flex w-full justify-between pb-4"
                      key={item.goal_id}
                    >
                      <label key={item.goal_id} className="flex">
                        <input
                          type="radio"
                          name="myGoal"
                          value={item.goal_id}
                          onClick={() => {
                            if (!isEdit) {
                              handleUpdateGoal(
                                item.goal_id,
                                undefined,
                                !item.is_success,
                              );
                            }
                          }}
                          className={`h-5 w-5 appearance-none rounded-full border-2 ${
                            item.is_success && !isEdit
                              ? "border-primary-50 bg-primary-50"
                              : "border-[1.5px] border-secondary-400"
                          }`}
                        />

                        <div
                          className="pl-2"
                          onClick={() => {
                            if (isEdit) {
                              handleGoalClick(item.goal_id, item.goal_name);
                            }
                          }}
                          key={item.goal_id}
                        >
                          {editGoalId === item.goal_id ? (
                            <input
                              className="input w-auto border-transparent bg-transparent focus:outline-none"
                              placeholder="오늘의 목표를 작성해주세요"
                              onChange={(e) => {
                                setGoalTitle(e.target.value);
                              }}
                              value={goalTitle ?? item.goal_name}
                              onBlur={() => {
                                if (goalTitle !== item.goal_name) {
                                  handleUpdateGoal(
                                    item.goal_id,
                                    goalTitle,
                                    undefined,
                                  );
                                }
                                setGoalTitle(""); // 수정 후 goalTitle을 초기화
                              }}
                            />
                          ) : item.goal_name && item.goal_name !== "" ? (
                            item.goal_name
                          ) : (
                            "오늘의 목표를 작성해주세요"
                          )}
                        </div>
                      </label>
                      {isEdit ? (
                        <Image
                          src={"/icons/XSmall.svg"}
                          alt="union"
                          width={20}
                          height={20}
                          className="cursor-pointer"
                          onClick={() => handleDeleteGoal(item.goal_id)}
                        />
                      ) : null}
                    </div>
                  ))
                : "플러스 버튼을 눌러 오늘의 목표를 작성해보세요."}
            </div>

            {isEdit ? (
              <MyButton
                size="sm"
                responsiveSize="sm"
                style="darkgray"
                className="mt-4 flex w-full items-center justify-center"
                onClick={() => handleAddGoal(undefined)}
              >
                <Image
                  src={"/icons/PlusMediumWhite.svg"}
                  alt="union"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </MyButton>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyPlanner;
