"use client";

import { useState } from "react";
import { MemoWithUser } from "@/types/PersonalMemo";
import browserClient from "@/utils/supabase/client";
import Image from "next/image";
import { useUpdateStudyMemo } from "../[id]/hooks/usePersonalMemo";
import { useSession } from "@/hooks/useUserProfile";

const PersonalMemoItem = ({ memoData }: { memoData: MemoWithUser }) => {
  const [isOpenMemo, setIsOpenMemo] = useState(false);
  const [contents, setContents] = useState(memoData.memo_content);
  const [isEdit, setIsEdit] = useState(false);
  const { data } = useSession();

  const profileImg = browserClient.storage
    .from("profile_img")
    .getPublicUrl(memoData.user_id ?? "default").data.publicUrl;

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
    <div className="flex flex-col relative min-w-[72px] self-stretch mx-6 mb-1 p-4 px-5 rounded-[20px] bg-[#1E1E1E] h-auto">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Image
            src={profileImg}
            alt="프로필 이미지"
            width={24}
            height={24}
            className="rounded-[20px] aspect-square object-cover"
          />
          <span className="text-white font-medium text-[14px] tracking-[-0.28px]">
            {memoData.user?.name}
          </span>
        </div>
        {isOpenMemo ? (
          <button onClick={() => setIsOpenMemo(false)} className="text-white">
            ∧
          </button>
        ) : (
          <button onClick={() => setIsOpenMemo(true)} className="text-white">
            ∨
          </button>
        )}
      </div>
      {isOpenMemo && (
        <>
          {isEdit ? (
            <>
              <textarea
                value={contents || ""}
                onChange={(e) => setContents(e.target.value)}
                className="bg-[#1E1E1E] focus:outline-none text-white mt-3 h-40 w-full resize-none"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "white transparent",
                }}
              />
              <button
                onClick={handleUpdate}
                className="absolute right-3 bottom-3 p-2 w-6 h-6 rounded-[20px] bg-[#4D4D4D]"
              >
                ✓
              </button>
            </>
          ) : (
            <>
              <p
                className="text-white h-40 mt-3 whitespace-pre-wrap overflow-y-auto"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "white transparent",
                }}
              >
                {memoData.memo_content}
              </p>
              {data?.id === memoData.user_id && (
                <button
                  onClick={() => setIsEdit(true)}
                  className="absolute right-3 bottom-3 p-2 w-6 h-6 rounded-[20px] bg-[#4D4D4D]"
                >
                  ✎
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PersonalMemoItem;
