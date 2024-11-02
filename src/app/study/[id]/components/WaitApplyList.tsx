import browserClient from "@/utils/supabase/client";
import { JoinPerson } from "../../components/MyStudyList";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "../../../../../database.types";
import Image from "next/image";

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
      console.log("userPromises", userPromises);
      return Promise.all(userPromises);
    },
    enabled: !!waitingList,
  });

  if (isWaitingLiseLoading || isLoadingApplyUser) return <div>로딩중</div>;
  if (isWaitingListError || isLoadingApplyError) return <div>에러 발생</div>;

  return (
    <div>
      <div>
        {ApplyUsers?.map((user) => {
          if (user[0].name)
            return (
              <section key={user[0].name}>
                <h1>가입 대기자</h1>
                <div>
                  <Image
                    key={user[0].name}
                    alt="profileImg"
                    className="w-8 h-8 rounded-full dark:border-gray-800 object-cover ring-2 ring-white hover:z-10"
                    src={
                      user[0].profile_img ||
                      "https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/profile_img/default?t=2024-10-29T12%3A08%3A32.075Z"
                    }
                    width={50}
                    height={50}
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/profile_img/default?t=2024-10-29T12%3A08%3A32.075Z";
                    }}
                  />
                  <div>
                    <div>[{user[0].name}]님의 신청</div>
                    <div>신청 메시지</div>
                  </div>
                </div>
              </section>
            );
        })}
      </div>
    </div>
  );
};

export default WaitApplyList;
