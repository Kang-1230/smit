const UserProfile = () => {
  return (
    <>
      <div className="flex flex-col gap-y-4 items-center">
        <div className="rounded-full bg-gray-200 w-32 h-32"></div>
        <div className="text-center">
          <p className="font-bold text-xl mb-1">닉네임</p>
          <p className="text-sm text-gray-600">사용자 이메일</p>
        </div>
        <button className="py-2 px-3 bg-gray-300 rounded-lg text-xs font-semibold">
          프로필 수정
        </button>
      </div>
    </>
  );
};

export default UserProfile;
