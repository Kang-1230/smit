const MyPostCard = () => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center px-8">
        <p>내가 작성한 글</p>
        <div className="text-white text-sm">
          <button className="p-2 bg-gray-500 rounded-xl">수정</button>
          <button className="p-2 bg-gray-500 rounded-xl ml-1">삭제</button>
        </div>
      </div>
      <hr className="my-3" />
    </div>
  );
};

export default MyPostCard;
