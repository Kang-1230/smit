import browserClient from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "../../../../../database.types";

export type manageredUser = {
  apply_message: string;
  id: string;
  is_approved: boolean;
  user: Tables<"user">;
  user_id: string;
};

const ManagedMemberList = ({ urlStudyId }: { urlStudyId: string }) => {
  //스터디에 가입한 사람들(매니저 제외) 목록 불러오기

  const getJoinedStudyPeopleManageList = async (study_id: string) => {
    const { data, error } = await browserClient
      .from("study_applylist")
      .select(`*,user(*)`)
      .eq("study_id", study_id)
      .eq("is_approved", true);
    if (!data || error) {
      throw new Error("가입한 사람들을 불러오지 못했습니다.");
    } else if (data) {
      console.log("가입한 사람들 목록", data);

      return data as manageredUser[];
    }
  };
  //강퇴 함수//나중에 mutation 추가하기
  const resignUser = async (id: string) => {
    const { error } = await browserClient
      .from("study_applylist")
      .delete()
      .eq("id", id);
    alert("강퇴되었습니다");
    if (error) {
      throw new Error("강퇴에 실패했습니다.");
    }
  };

  const changeManager = async (relevantuser: manageredUser) => {
    if (!relevantuser.is_approved) {
      alert("이미 방장인 회원입니다.");
    }
    const { error } = await browserClient
      .from("study")
      .update({ study_manager: relevantuser.user_id })
      .eq("study_id", urlStudyId);
    if (error) {
      throw new Error("방장 넘기기update에 실패했습니다.");
    }
    //기존 방장 정보 넣기
    // const { error: insertError } = await browserClient
    //   .from("study_applylist")
    //   .insert({ study_id: urlStudyId, is_approved: true, user_id: userId });
    // if (insertError) {
    //   throw new Error("방장 넘기기insert에 실패했습니다.");
    // } else {
    //   alert("방장 넘기기 성공");
    // }
  };
  //매니저 제외 가입한 사람들 목록
  const {
    data: manageList,
    isLoading: ismManageListLoading,
    isError: ismManageListError,
  } = useQuery({
    queryKey: ["manageList", urlStudyId],
    queryFn: () => getJoinedStudyPeopleManageList(urlStudyId),
  });

  if (ismManageListLoading) return <div>로딩중</div>;
  if (ismManageListError) return <div>에러 발생</div>;

  console.log("매니저 제외 가입한 사람들 목록", manageList);

  return (
    <div>
      <h1>스터디 멤버 관리</h1>
      <section>
        {manageList?.map((manageUser: manageredUser) => {
          return (
            <div key={manageUser.id}>
              <div>{manageUser.user.name}</div>
              <button onClick={() => resignUser(manageUser.id)}>강퇴</button>
              <button onClick={() => changeManager(manageUser)}>
                방장 넘기기
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
};
export default ManagedMemberList;
