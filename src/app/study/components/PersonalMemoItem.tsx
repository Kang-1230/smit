"use client";

import { useState } from "react";
import { MemoWithUser } from "@/types/PersonalMemo";
import Image from "next/image";
import { useUpdateStudyMemo } from "../[id]/hooks/usePersonalMemo";
import { useSession } from "@/hooks/useUserProfile";
import { useUserByCommentId } from "@/app/post/[id]/hooks/useComments";
import MemoContent from "./MemoContent";

const PersonalMemoItem = ({ memoData }: { memoData: MemoWithUser }) => {
  const [isOpenMemo, setIsOpenMemo] = useState(false);
  const [contents, setContents] = useState(memoData.memo_content);
  const [isEdit, setIsEdit] = useState(false);
  const { data: userData } = useSession();
  const { data: user } = useUserByCommentId(memoData.user_id);

  const { mutate } = useUpdateStudyMemo(
    memoData.study_id,
    memoData.memo_id,
    contents || "",
  );

  const handleUpdate = () => {
    try {
      mutate();
      memoData.memo_content = contents;
      setIsEdit(false);
    } catch (error) {
      console.error("Failed to update memo:", error);
    }
  };

  return (
    <div className="relative mb-2 flex w-[327px] shrink-0 flex-col self-stretch rounded-[20px] bg-[#1E1E1E] px-5 py-4 xl:h-[474px] xl:w-[388px]">
      <div className="flex h-[40px] shrink-0 justify-between">
        <div className="flex items-center gap-2.5">
          {user?.profile_img && (
            <Image
              src={user.profile_img}
              alt="프로필"
              width={40}
              height={40}
              className="aspect-square rounded-[20px] border border-white/50 object-cover"
            />
          )}
          <span className="body-14-m text-white">{memoData.user?.name}</span>
        </div>
        <div className="flex items-center xl:hidden">
          {isOpenMemo ? (
            <button onClick={() => setIsOpenMemo(false)}>
              <Image
                src="/icons/ChevronUpWhite.svg"
                alt="up-btn"
                width={24}
                height={24}
              />
            </button>
          ) : (
            <button onClick={() => setIsOpenMemo(true)}>
              <Image
                src="/icons/ChevronDownWhite.svg"
                alt="down-btn"
                width={24}
                height={24}
              />
            </button>
          )}
        </div>
      </div>

      {/* 데스크탑 */}
      <div className="hidden h-[328px] xl:block">
        <MemoContent
          contents={contents}
          isEdit={isEdit}
          memoData={memoData}
          userData={userData}
          handleUpdate={handleUpdate}
          setContents={setContents}
          setIsEdit={setIsEdit}
        />
      </div>

      {/* 모바일 */}
      {isOpenMemo && (
        <div className="h-[328px] xl:hidden">
          <MemoContent
            contents={contents}
            isEdit={isEdit}
            memoData={memoData}
            userData={userData}
            handleUpdate={handleUpdate}
            setContents={setContents}
            setIsEdit={setIsEdit}
          />
        </div>
      )}
    </div>
  );
};

export default PersonalMemoItem;
