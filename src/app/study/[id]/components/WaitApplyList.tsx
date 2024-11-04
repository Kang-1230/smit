"use client";

import browserClient from "@/utils/supabase/client";
import { JoinPerson } from "../../components/ApplyStudyList";
import { Tables } from "../../../../../database.types";
import { useQuery } from "@tanstack/react-query";

const WaitApplyList = ({ urlStudyId }: { urlStudyId: string }) => {
  console.log("1", urlStudyId);
  //가입 대기자 불러오기
  const getJoinedStudyPeopleList = async (study_id: string) => {
    const { data, error } = await browserClient
      .from("study_applylist")
      .select("*")
      .eq("study_id", study_id)
      .eq("is_approved", false);
    if (!data || error) {
      throw new Error("가입 대기중인 사람들을 불러오지 못했습니다.");
    } else if (data) {
      console.log("가입 대기중 사람들 목록", data);
    }
    return data as JoinPerson[];
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
      console.log(error);
      throw new Error("사용자 정보를 불러오지 못했습니다.");
    }
    return data[0] as Tables<"user">;
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

  console.log("신청한 유저들", ApplyUsers);

  //   useEffect(() => {
  //     getUserByApplyList(
  //       getJoinedStudyPeopleList(urlStudyId).map((item: JoinPerson) => {
  //         return item.user_id;
  //       }),
  //     );
  //   }, []);

  if (isWaitingLiseLoading || isLoadingApplyUser) return <div>로딩중</div>;
  if (isWaitingListError || isLoadingApplyError) return <div>에러 발생</div>;

  return <div>{/* <div>{ApplyUsers.profile_img}</div> */}</div>;
};

export default WaitApplyList;
