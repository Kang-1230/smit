import MyLikePosts from "./components/MyLikePosts";
import MyPostList from "./components/MyPostList";
import UserProfile from "./components/UserProfile";
import DeleteUserButton from "./components/DeleteUserButton";
import { Metadata } from "next";

// 유저 정보
// 유저가 작성한 모집글 POST
// 유저가 찜한 모집글 user => post

export const metadata: Metadata = {
  title: "Smit : 내 프로필",
  description: "Our Study Meet Smit",
};

export default async function MyPage() {
  return (
    <div className="flex flex-col">
      <UserProfile />
      <div className="flex flex-col px-[24px] pt-[28px] md:px-0 md:pt-0">
        <MyPostList />
      </div>
      <hr className="mt-5 md:hidden" />
      <div className="mt-7 flex flex-col md:mt-[100px]">
        <MyLikePosts />
      </div>
      <hr className="my-7 md:hidden" />
      <DeleteUserButton />
      <hr className="mt-7 pb-20 md:hidden" />
    </div>
  );
}
