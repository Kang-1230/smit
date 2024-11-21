"use client";

import browserClient from "@/utils/supabase/client";
import { JoinPerson } from "../../components/MyStudyList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tables, TablesUpdate } from "../../../../../database.types";
import Image from "next/image";
import MyButton from "@/components/common/Button";
import WebWaitApplyListItem from "./WebWaitApplyListItem";
import useCarousel from "@/hooks/useCarousel";
import Loading from "@/components/common/Loading";

const WaitApplyList = ({ urlStudyId }: { urlStudyId: string }) => {
  const queryClient = useQueryClient();
  //가입 대기자 불러오기
  const getJoinedStudyPeopleList = async (study_id: string) => {
    const { data, error } = await browserClient
      .from("study_applylist")
      .select("*")
      .eq("study_id", study_id)
      .eq("is_approved", false);
    if (error) {
      throw new Error("가입 대기중인 사람들을 불러오지 못했습니다.");
    }
    return (data || []) as JoinPerson[];
  };

  const {
    data: waitingList,
    isLoading: isWaitingLiseLoading,
    isError: isWaitingListError,
  } = useQuery({
    queryKey: ["waitingList", urlStudyId],
    queryFn: () => getJoinedStudyPeopleList(urlStudyId),
  });

  //가입 대기자 목록 불러와서 id로 이름 가져오기(map돌려야할듯)

  const getUserByApplyList = async (user_id: string) => {
    const { data, error } = await browserClient
      .from("user")
      .select("*")
      .eq("id", user_id);

    if (!data || error) {
      throw new Error("사용자 정보를 불러오지 못했습니다.");
    }
    return data as Tables<"user">[];
  };

  const {
    data: ApplyUsers,
    isLoading: isLoadingApplyUser,
    isError: isLoadingApplyError,
  } = useQuery({
    queryKey: ["ApplyUsers", waitingList],
    queryFn: async () => {
      if (!waitingList) return [];
      const userPromises = waitingList.map((item) =>
        getUserByApplyList(item.user_id),
      );
      return Promise.all(userPromises);
    },
    enabled: !!waitingList,
  });

  const updateApplyUser = async (selectuser: JoinPerson) => {
    await browserClient
      .from("study_applylist")
      .update<TablesUpdate<"study_applylist">>({ is_approved: true })
      .eq("id", selectuser.id);
    alert("수락되었습니다");
  };

  const { mutate: mutateUpdateApplyUser } = useMutation({
    mutationFn: (selectuser: JoinPerson | undefined) => {
      if (!selectuser) return Promise.reject("User not found");
      return updateApplyUser(selectuser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["study_apply_approval_true", urlStudyId],
      });
    },
  });

  const deleteApplyUser = async (selectuser: JoinPerson) => {
    const { error } = await browserClient
      .from("study_applylist")
      .delete()
      .eq("id", selectuser.id);
    alert("거절되었습니다");
    if (error) {
      throw new Error("스터디 신청 거절에 실패했습니다.");
    }
  };

  const { mutate: MutateDeteleApplyUser } = useMutation({
    mutationFn: (selectuser: JoinPerson) => deleteApplyUser(selectuser),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["study_apply_approval_false", urlStudyId],
      });
    },
  });

  const { handleNext, handlePrev, trackRef } = useCarousel(
    228,
    waitingList?.length,
  );

  if (isWaitingListError || isLoadingApplyError) return <div></div>;

  return (
    <div>
      <h1 className="title-20-s mx-6 mb-5 md:hidden">가입 대기자</h1>
      <div className="mb-6 hidden items-end justify-between md:flex">
        <h1 className="title-20-s ml-1">가입 대기자</h1>
        <div className="flex gap-5">
          <Image
            src={"/icons/pc/ChevronLeft.svg"}
            alt="right"
            width={40}
            height={40}
            onClick={handlePrev}
            className="cursor-pointer"
          />
          <Image
            src={"/icons/pc/ChevronRight.svg"}
            alt="right"
            width={40}
            height={40}
            onClick={handleNext}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="md:flex">
        <div className="md:scrollbar-hide md:block md:w-full md:overflow-x-scroll">
          <div
            ref={trackRef}
            className="md:flex md:w-full md:gap-[26px] md:duration-150 md:ease-in-out"
          >
            {isWaitingLiseLoading || isLoadingApplyUser ? (
              <div className="flex w-full justify-center">
                <Loading />
              </div>
            ) : ApplyUsers && ApplyUsers.length > 0 ? (
              ApplyUsers.map((user) => {
                const waitingUser = waitingList?.find(
                  (item: JoinPerson) => item.user_id === user[0].id,
                );

                return (
                  <div key={user[0].name} className="md:w-[886px]">
                    <section className="mx-6 mb-5 flex items-center justify-between md:hidden">
                      <div className="flex items-center md:w-full">
                        <Image
                          key={user[0].name}
                          alt="profileImg"
                          className="aspect-square shrink-0 rounded-full border border-black/20 object-cover"
                          src={
                            user[0].profile_img ||
                            "https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/profile_img/default?t=2024-10-29T12%3A08%3A32.075Z"
                          }
                          width={40}
                          height={40}
                          unoptimized
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/profile_img/default?t=2024-10-29T12%3A08%3A32.075Z";
                          }}
                        />
                        <div className="ml-[10px] flex flex-col items-start">
                          <span className="body-14-m text-secondary-900">
                            {user[0].name}
                          </span>
                          <p className="body-14-r text-secondary-700">
                            {waitingUser?.apply_message}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <MyButton
                          size="sm"
                          style="beige"
                          onClick={() => {
                            if (waitingUser) {
                              MutateDeteleApplyUser(waitingUser);
                            }
                          }}
                        >
                          거절
                        </MyButton>
                        <MyButton
                          size="sm"
                          style="black-line"
                          onClick={() => mutateUpdateApplyUser(waitingUser)}
                        >
                          수락
                        </MyButton>
                      </div>
                    </section>
                    <WebWaitApplyListItem
                      user={user}
                      waitingUser={waitingUser}
                      MutateDeteleApplyUser={MutateDeteleApplyUser}
                      mutateUpdateApplyUser={mutateUpdateApplyUser}
                    />
                  </div>
                );
              })
            ) : (
              <div className="body-14-m mx-6 text-secondary-600">
                가입 대기자가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitApplyList;
