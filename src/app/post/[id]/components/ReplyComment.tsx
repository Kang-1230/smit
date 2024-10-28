import { useEffect, useState } from "react";
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

  // 답글 대상이 바뀔 때마다 입력창 멘션 업데이트
  useEffect(() => {
    setReplyContent(`@${replyToName} `);
  }, [replyToName]);

  return (
    <form
      className="flex ml-12 mt-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!replyContent.trim()) {
          alert("답글 내용을 입력해주세요!");
          return;
        }
        addComment(
          {
            id: postId,
            commentItem: replyContent,
            parentId: parentId,
          },
          {
            onSuccess: () => {
              setReplyContent(`@${replyToName} `);
              onSuccess?.();
            },
          },
        );
      }}
    >
      <Image
        src={profileImg}
        alt="유저 이미지"
        width={40}
        height={40}
        className="rounded-full border aspect-square object-cover"
      />
      <input
        type="text"
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder={`@${replyToName}에게 답글 작성`}
        className="border-b-2 border-gray-500 focus:outline-none ml-2"
      />
      <button className="ml-2">답글 작성</button>
    </form>
  );
};

export default ReplyComment;
