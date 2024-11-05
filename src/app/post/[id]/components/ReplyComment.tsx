import { useState } from "react";
import { useAddCommentMutation } from "../hooks/useComments";
import { usePublicUser } from "@/hooks/useUserProfile";
import Image from "next/image";
import browserClient from "@/utils/supabase/client";

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
    <form className="flex mt-2" onSubmit={handleSubmit}>
      <Image
        src={profileImg}
        alt="유저 이미지"
        width={40}
        height={40}
        className="rounded-full border aspect-square object-cover flex-shrink-0"
      />

      <div className="flex items-center border-b-2 border-gray-500 flex-1 min-w-0">
        <span className="text-blue-500 py-2 flex-shrink-0">@{replyToName}</span>
        <input
          type="text"
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          className="focus:outline-none ml-1 py-2 w-full min-w-0"
          placeholder="답글 작성"
        />
      </div>
      <button className="ml-2 flex-shrink-0">답글 작성</button>
    </form>
  );
};

export default ReplyComment;
