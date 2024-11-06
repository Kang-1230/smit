"use client";

import { useState } from "react";
import { MemoWithUser } from "@/types/PersonalMemo";
import browserClient from "@/utils/supabase/client";
import Image from "next/image";
import { useUpdateStudyMemo } from "../[id]/hooks/usePersonalMemo";
import { useSession } from "@/hooks/useUserProfile";
import ChevronDownWhite from "../../../../public/icons/ChevronDownWhite.svg";
import ChevronUpWhite from "../../../../public/icons/ChevronUpWhite.svg";
import PencilLined from "../../../../public/icons/PencilLined.svg";
import Check from "../../../../public/icons/Check.svg";
import { useUserByCommentId } from "@/app/post/[id]/hooks/useComments";

const PersonalMemoItem = ({ memoData }: { memoData: MemoWithUser }) => {
  const [isOpenMemo, setIsOpenMemo] = useState(false);
  const [contents, setContents] = useState(memoData.memo_content);
  const [isEdit, setIsEdit] = useState(false);
  const { data } = useSession();
  const { data: user } = useUserByCommentId(memoData.user_id);

  const profileImg = browserClient.storage
    .from("profile_img")
    .getPublicUrl(user?.profile_img ?? "default").data.publicUrl;

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
    <div className="flex flex-col relative self-stretch mb-2 py-4 px-5 rounded-[20px] bg-[#1E1E1E] shrink-0">
      <div className="flex justify-between h-[40px] shrink-0">
        <div className="flex gap-2.5 items-center">
          <Image
            src={profileImg}
            alt="프로필"
            width={40}
            height={40}
            className="rounded-[20px] aspect-square object-cover"
          />
          <span className="text-white body-14-m">{memoData.user?.name}</span>
        </div>
        {isOpenMemo ? (
          <button onClick={() => setIsOpenMemo(false)}>
            <Image src={ChevronUpWhite} alt="up-btn" width={24} height={24} />
          </button>
        ) : (
          <button onClick={() => setIsOpenMemo(true)}>
            <Image
              src={ChevronDownWhite}
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
                className="bg-[#1E1E1E] focus:outline-none text-secondary-200 my-3 pb-3 h-[308px] w-full resize-none"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#808080 transparent",
                }}
              />
              <button
                onClick={handleUpdate}
                className="absolute h-10 w-10 right-3 bottom-3 p-2.5 rounded-[20px] bg-white"
              >
                <Image src={Check} alt="check" width={24} height={24} />
              </button>
            </>
          ) : (
            <div>
              <p
                className="text-secondary-200 h-[308px] my-3 whitespace-pre-wrap overflow-y-auto z-10"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#808080 transparent",
                }}
              >
                {memoData.memo_content}
              </p>
              {data?.id === memoData.user_id && (
                <button
                  onClick={() => setIsEdit(true)}
                  className="absolute h-10 w-10 right-3 bottom-3 p-2 rounded-[20px] bg-secondary-700 z-20"
                >
                  <Image src={PencilLined} alt="edit" width={24} height={24} />
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
