import MyLikePosts from "./components/MyLikePosts";
import MyPostList from "./components/MyPostList";
import UserProfile from "./components/UserProfile";
import DeleteUserButton from "./components/DeleteUserButton";
import { Metadata } from "next";
import Image from "next/image";

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
      <div className="flex flex-col px-6 pt-7">
        <p className="title-20-s mb-[20px] flex gap-x-[4px]">
          <Image src={`/icons/Edit.svg`} alt="Edit" width={24} height={24} />
          내가 작성한 글
        </p>
        <MyPostList />
      </div>
      <hr className="mt-5 xl:hidden" />
      <div className="mt-7 flex flex-col xl:mt-[100px]">
        <p className="title-20-s mb-[20px] flex gap-x-[4px] px-6">
          <Image src={`/icons/Edit.svg`} alt="Edit" width={24} height={24} />찜
          목록
        </p>
        <MyLikePosts />
      </div>
      <hr className="my-7" />
      <DeleteUserButton />
      <hr className="mt-7 pb-20" />
    </div>
  );
}
