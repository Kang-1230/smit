import { useState } from "react";
import { useAddCommentMutation } from "../hooks/useComments";
import { usePublicUser } from "@/hooks/useUserProfile";
import Image from "next/image";
import browserClient from "@/utils/supabase/client";
import SendLined from "../../../../../public/icons/SendLined.svg";

interface ReplyCommentProps {
  parentId: string;
  postId: string;
  replyToName: string;
  onSuccess?: () => void;
}

const ReplyComment = ({
  parentId,
  postId,
  replyToName,
  onSuccess,
}: ReplyCommentProps) => {
  const [replyContent, setReplyContent] = useState("");
  const { data: user } = usePublicUser();
  const { mutate: addComment } = useAddCommentMutation();

  const profileImg = browserClient.storage
    .from("profile_img")
    .getPublicUrl(user?.profile_img ?? "default").data.publicUrl;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) {
      alert("답글 내용을 입력해주세요!");
      return;
    }
    // 멘션이 이미 있는지 확인
    const mention = `@${replyToName}`;
    let finalContent = replyContent;
    // 답글 내용에 멘션이 없을 경우에만 멘션 추가
    if (!replyContent.includes(mention)) {
      finalContent = `${mention} ${replyContent}`;
    }
    addComment(
      {
        id: postId,
        commentItem: finalContent,
        parentId: parentId,
      },
      {
        onSuccess: () => {
          setReplyContent("");
          onSuccess?.();
        },
      },
    );
  };

  return (
    <form className="flex my-2" onSubmit={handleSubmit}>
      <Image
        src={profileImg}
        alt="유저 이미지"
        width={40}
        height={40}
        className="rounded-full border aspect-square object-cover flex-shrink-0"
      />
      <div className="flex items-center border-b border-secondary-200 flex-1 ml-2">
        <span className="text-[#30A1D1] body-16-m flex-shrink-0">
          @{replyToName}
        </span>
        <input
          type="text"
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          className="focus:outline-none ml-1 w-full body-16-m text-[#444]"
          placeholder="답글 작성"
        />
        <button>
          <Image
            src={SendLined}
            alt="입력"
            width={24}
            height={24}
            className="flex-shrink-0"
          />
        </button>
      </div>
    </form>
  );
};

export default ReplyComment;
