import MyPostCard from "./MyPostCard";

const MyPostList = () => {
  return (
    <div>
      <div className="flex flex-col">
        <p className="text-xl font-semibold mb-8 px-8">내가 작성한 글</p>
        {Array(3)
          .fill(1)
          .map((arr, idx) => {
            return <MyPostCard key={idx} />;
          })}
        <button>더보기</button>
      </div>
    </div>
  );
};

export default MyPostList;
