// 출석률 표시
"use client";

// 출석부 만드는 법.
// 1. 유저가 스터디 페이지에 입장하면 오늘 날짜, 유저ID, 스터디 아이디가 출석 테이블에 저장됨
// 근데 이건 최초 생성시 아닌가? 그럼 트리거 사용해서 apply list에서 승인되면 자동으로 출석 테이블에 유저, 스터디 넣고
// 유저가 접속하면 날짜만 넣어주는 것으로 변경해야할듯? => 트리거 완료
// 유저가 그룹 탈퇴하면(apply 리스트에서 삭제되면) 해당 출석부도 같이 삭제하긔 => 이것도 완료
// 2. 출석 인원은 오늘 날짜, 스터디 로 필터링해서 가져오고 길이로 표시하기
// 3. 만약 1 과정에서 오늘 날짜로 된 테이블이 있으면 다시 저장하지 않음
// 4. 그럼 매 접속시에 날짜가 오늘이랑 같은지 확인하고 같으면 무시 다르면 오늘날짜로 update !!

const AttendanceRate = ({
  todayAttendee,
  member,
}: {
  todayAttendee: number;
  member:
    | Pick<
        {
          apply_message: string | null;
          id: string;
          is_approved: boolean | null;
          study_id: string | null;
          user_id: string | null;
        },
        "user_id"
      >[]
    | null;
}) => {
  return (
    <div className="p-[1px] w-full min-h-[99px] bg-gradient-to-br from-[#8D8D8D] to-[#656565] rounded-20 relative">
      <div className="relative w-full h-full overflow-hidden text-white rounded-20 bg-secondary-800">
        <div className="w-14 h-12 rounded-full bg-[rgba(255,153,69,0.3)] blur-xl absolute -top-3 left-0"></div>
        <div className="bg-gradient-to-b from-[#6d6d6d80] to-[#6b696980] w-full h-full p-4 rounded-20">
          <div className="caption text-secondary-200">출석인원</div>
          <p className="title-20-r mt-[14px] text-center">
            <span className="title-20-b">{todayAttendee}</span> /{" "}
            {member ? member.length : 1}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceRate;
