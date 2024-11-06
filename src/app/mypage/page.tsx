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
      <div className="flex flex-col pt-7 px-6">
        <p className="title-20-s mb-5">내가 작성한 글</p>
        <MyPostList />
      </div>
      <hr className="mt-5 mb-7" />
      <div className="flex flex-col pt-7 px-6">
        <p className="title-20-s mb-5">찜 목록</p>
        <MyLikePosts />
      </div>
      <hr className="my-7" />
      <DeleteUserButton />
      <hr className="my-7" />
    </div>
  );
}
