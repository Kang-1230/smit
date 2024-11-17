"use client";

import { useState } from "react";
import { MemoWithUser } from "@/types/PersonalMemo";
import Image from "next/image";
import { useUpdateStudyMemo } from "../[id]/hooks/usePersonalMemo";
import { useSession } from "@/hooks/useUserProfile";
import { useUserByCommentId } from "@/app/post/[id]/hooks/useComments";

const PersonalMemoItem = ({ memoData }: { memoData: MemoWithUser }) => {
  const [isOpenMemo, setIsOpenMemo] = useState(false);
  const [contents, setContents] = useState(memoData.memo_content);
  const [isEdit, setIsEdit] = useState(false);
  const { data } = useSession();
  const { data: user } = useUserByCommentId(memoData.user_id);

  const { mutate } = useUpdateStudyMemo(
    memoData.study_id,
    memoData.memo_id,
    contents || "",
  );

  const handleUpdate = () => {
    mutate();
    setIsEdit(false);
  };

  return (
    <div className="relative mb-2 flex shrink-0 flex-col self-stretch rounded-[20px] bg-[#1E1E1E] px-5 py-4">
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
        {isOpenMemo ? (
          <button onClick={() => setIsOpenMemo(false)}>
            <Image
              src={"/icons/ChevronUpWhite.svg"}
              alt="up-btn"
              width={24}
              height={24}
            />
          </button>
        ) : (
          <button onClick={() => setIsOpenMemo(true)}>
            <Image
              src={"/icons/ChevronDownWhite.svg"}
              alt="down-btn"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
      {isOpenMemo && (
        <div className="h-[328px]">
          {isEdit ? (
            <>
              <textarea
                value={contents || ""}
                onChange={(e) => setContents(e.target.value)}
                className="my-3 h-[308px] w-full resize-none bg-[#1E1E1E] pb-3 text-secondary-200 focus:outline-none"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#808080 transparent",
                }}
                wrap="soft"
              />
              <button
                onClick={handleUpdate}
                className="absolute bottom-3 right-3 h-10 w-10 rounded-[20px] bg-white p-2.5"
              >
                <Image
                  src={"/icons/Check.svg"}
                  alt="check"
                  width={24}
                  height={24}
                />
              </button>
            </>
          ) : (
            <div>
              <p
                className="z-10 my-3 h-[308px] overflow-y-auto whitespace-pre-wrap text-secondary-200"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#808080 transparent",
                  wordBreak: "break-all",
                }}
              >
                {memoData.memo_content}
              </p>
              {data?.id === memoData.user_id && (
                <button
                  onClick={() => setIsEdit(true)}
                  className="absolute bottom-3 right-3 z-20 h-10 w-10 rounded-[20px] bg-secondary-700 p-2"
                >
                  <Image
                    src={"/icons/PencilLined.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalMemoItem;
