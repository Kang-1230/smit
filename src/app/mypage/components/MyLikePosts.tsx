import MyLikePostCard from "./MyLikePostCard";

const MyLikePosts = () => {
  return (
    <div>
      <p className="text-xl font-semibold px-9 mb-5">찜 목록</p>
      <div className="w-full overflow-x-scroll scrollbar-hide">
        <div className="flex flex-row pl-8 w-fit space-x-3">
          {Array(3)
            .fill(1)
            .map((_, idx) => {
              return <MyLikePostCard key={idx} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default MyLikePosts;
