import { getUser } from "@/utils/supabase/supabase-server";
import MyLikePosts from "./components/MyLikePosts";
import MyPostList from "./components/MyPostList";
import UserProfile from "./components/UserProfile";

// 유저 정보
// 유저가 작성한 모집글 POST
// 유저가 찜한 모집글 user => post

export default async function MyPage() {
  const user = await getUser();

  return (
    <div className="flex flex-col mt-10">
      <UserProfile />
      <hr className="my-10 border-2" />
      <MyPostList user={user} />
      <hr className="my-10 border-2" />
      <MyLikePosts user={user} />
      <hr className="mt-10 mb-4 border-2" />
      <div className="pl-8 pb-10 font-medium">
        <button>탈퇴하기</button>
      </div>
    </div>
  );
}
