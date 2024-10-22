const MyLikePostCard = () => {
  return (
    <div className="w-60 h-48 border border-gray-300 rounded-3xl p-5 flex flex-col justify-between">
      <div>
        <p className="font-semibold">
          스터디 제목 이름 제목 이름 제목 이름 제목 이름
        </p>
        <div className="flex flex-row flex-wrap my-3 gap-1">
          <span className="px-3 py-[2px] bg-gray-300 rounded-3xl text-xs font-medium">
            직업
          </span>
          <span className="px-3 py-[2px] bg-gray-300 rounded-3xl text-xs font-medium">
            그래픽 디자인
          </span>
          <span className="px-3 py-[2px] bg-gray-300 rounded-3xl text-xs font-medium">
            UXUI
          </span>
          <span className="px-3 py-[2px] bg-gray-300 rounded-3xl text-xs font-medium">
            Figma
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-xs">모집 2/6</p>
        <div className="w-5 h-5 rounded-full bg-red-300"></div>
      </div>
    </div>
  );
};

export default MyLikePostCard;
