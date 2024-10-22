import MyLikePosts from "./components/MyLikePosts";
import MyPostList from "./components/MyPostList";
import UserProfile from "./components/UserProfile";

export default function MyPage() {
  return (
    <div className="w-screen h-screen mt-10">
      <UserProfile />
      <hr className="my-10 border-2" />
      <MyPostList />
      <hr className="my-10 border-2" />
      <MyLikePosts />
      <hr className="my-10 border-2" />
      <div className="pl-8 font-semibold pb-10">
        <button>탈퇴하기</button>
      </div>
    </div>
  );
}
