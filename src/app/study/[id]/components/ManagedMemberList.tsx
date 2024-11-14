import browserClient from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { JoinPersonWithManager } from "../../components/MyStudyList";
import MemberListItem from "./MemberListItem";

const ManagedMemberList = ({
  urlStudyId,
  setUpdateTrigger,
}: {
  urlStudyId: string;
  setUpdateTrigger: Dispatch<SetStateAction<number>>;
}) => {
  // 1. 모든 함수 정의를 먼저
  //현재 유저 data 가져오기

  const getCurrentUser = async () => {
    const {
      data: { user },
    } = await browserClient.auth.getUser();
    return user;
  };

  //스터디에 가입한 사람들(매니저 제외) 목록 불러오기

  const getJoinedStudyPeopleManageList = async (study_id: string) => {
    const { data, error } = await browserClient
      .from("study_applylist")
      .select(`*,user(*),study(*)`)
      .eq("study_id", study_id)
      .eq("is_approved", true);
    if (!data || error) {
      throw new Error("가입한 사람들을 불러오지 못했습니다.");
    }
    return data as JoinPersonWithManager[];
  };

  // 2. 그 다음 모든 Hook 사용
  //현재 유저 data 가져오기

  const {
    data: currentUserData,
    isLoading: iscurrentUserLoading,
    isError: iscurrentUserError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  //매니저 제외 가입한 사람들 목록
  const {
    data: manageList,
    isLoading: ismManageListLoading,
    isError: ismManageListError,
  } = useQuery({
    queryKey: ["manageList", urlStudyId],
    queryFn: () => getJoinedStudyPeopleManageList(urlStudyId),
  });

  //현재 유저가 방장이 아닐 때 내 스터디 페이지로 이동

  // 3. 그 다음 로딩/에러 체크
  if (iscurrentUserLoading || ismManageListLoading) return <div>로딩중</div>;
  if (iscurrentUserError || ismManageListError) return <div>에러 발생</div>;

  // 4. 나머지 함수들
  //넘길 사람이 방장인지 아닌지 확인하기

  const changeManager = async (relevantuser: JoinPersonWithManager) => {
    if (relevantuser.user_id === relevantuser.study.study_manager) {
      alert("이미 방장인 회원입니다.");
      return;
    }

    try {
      //방장 정보 update하기

      const { error } = await browserClient
        .from("study")
        .update({ study_manager: relevantuser.user_id })
        .eq("study_id", urlStudyId);
      if (error) throw new Error("방장 넘기기 update에 실패했습니다.");
      // 기존 방장 정보 넣기

      const { error: insertError } = await browserClient
        .from("study_applylist")
        .insert({
          study_id: urlStudyId,
          is_approved: true,
          user_id: currentUserData?.id,
        });
      if (insertError) throw new Error("방장 넘기기 insert에 실패했습니다.");
      //새로운 방장 기존 정보 삭제하기

      const { error: deleteError } = await browserClient
        .from("study_applylist")
        .delete()
        .eq("user_id", relevantuser.user_id);
      if (deleteError) throw new Error("기존 정보 삭제에 실패했습니다.");

      alert("방장 넘기기 성공");
      setUpdateTrigger((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "방장 넘기기에 실패했습니다.",
      );
    }
  };
  //강퇴 함수//나중에 mutation 추가하기

  const resignUser = async (id: string) => {
    try {
      const { error } = await browserClient
        .from("study_applylist")
        .delete()
        .eq("id", id);
      if (error) throw new Error("강퇴에 실패했습니다.");
      alert("강퇴되었습니다");
      setUpdateTrigger((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "강퇴에 실패했습니다.");
    }
  };

  // 5. 마지막으로 렌더링

  return (
    <div className="mx-6 mb-52 mt-10">
      <h1 className="title-20-s mb-5">스터디 멤버 관리</h1>
      {/* <div className="body-16-r my-5 flex w-full justify-between rounded-[23px] bg-[#FAF6F3] p-1 pl-4">
        <input
          className="bg-[#FAF6F3]"
          placeholder="스터디 멤버를 찾아보세요"
        />
        <button className="right-1 top-8 rounded-full bg-black p-1">
          <Image
            src={"/icons/SearchLined.svg"}
            alt="search"
            width={24}
            height={24}
          />
        </button>
      </div> */}
      <section>
        {manageList?.map((manageUser: JoinPersonWithManager) => (
          <MemberListItem
            key={manageUser.id}
            manageUser={manageUser}
            resignUser={resignUser}
            changeManager={changeManager}
          />
        ))}
      </section>
    </div>
  );
};
export default ManagedMemberList;
