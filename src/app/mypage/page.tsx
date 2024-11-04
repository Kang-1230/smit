import MyLikePosts from "./components/MyLikePosts";
import MyPostList from "./components/MyPostList";
import UserProfile from "./components/UserProfile";
import DeleteUserButton from "./components/DeleteUserButton";

// 유저 정보
// 유저가 작성한 모집글 POST
// 유저가 찜한 모집글 user => post

export default async function MyPage() {
  return (
    <div className="flex flex-col">
      <UserProfile />
      <div className="flex flex-col pt-7 bg-white px-6">
        <p className="title-20-s">내가 작성한 글</p>
        <MyPostList />
      </div>
      <p className="text-xl font-semibold px-9 mb-5">찜 목록</p>
      <MyLikePosts />
      <div className="pl-8 pb-10 font-medium">
        <DeleteUserButton />
      </div>
    </div>
  );
}
