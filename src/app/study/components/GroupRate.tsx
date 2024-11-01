// 목표시간 달성률 (그룹)
// 80% 이상 달성한 유저만 기록되는 시스템... (일정에 따라 바뀜(타이머가 있을 때만!!))
// 캘린더에 등록된 시간 범위 (종료-시작)를 밀리초로 변경하고 이걸 퍼센트화 시켜서
// 타이머에 경과 시간이랑 비교하기
// 80% 넘으면 점수 계산하고 목표시간 달성한 사람으로 카운트
// 출력할 때는 일단 타이머 생성된 사람 다 불러온 다음 경과시간으로 퍼센트 계산하고 필터 통해서 80% 넘는 사람만 남기기
// 위에서 남은 사람 / 총인원 형태로 보여주기

import { Tables } from "../../../../database.types";

const GroupRate = ({
  member,
}: {
  member: Pick<Tables<"study_applylist">, "user_id">[] | null;
}) => {
  return (
    <div className="bg-red-200 h-1/2 rounded-[20px] p-4">
      <p className="text-xs">공부시간 달성률</p>
    </div>
  );
};

export default GroupRate;
