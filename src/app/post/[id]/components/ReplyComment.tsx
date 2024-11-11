import { useState } from "react";
import { useAddCommentMutation } from "../hooks/useComments";
import { usePublicUser } from "@/hooks/useUserProfile";
import Image from "next/image";
import MyButton from "@/components/common/Button";

interface ReplyCommentProps {
  parentId: string;
  postId: string;
  replyToName: string;
  onSuccess?: () => void;
  setWriteReply: (value: boolean) => void;
}

const ReplyComment = ({
  parentId,
  postId,
  replyToName,
  onSuccess,
  setWriteReply,
}: ReplyCommentProps) => {
  const [replyContent, setReplyContent] = useState("");
  const { data: user } = usePublicUser();
  const { mutate: addComment } = useAddCommentMutation();

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
          // 답글 작성 완료 후 writeReply 상태 업데이트
          setWriteReply(false);
        },
      },
    );
  };
  return (
    <div className="my-4 mb-[49px] flex pl-10">
      {user?.profile_img ? (
        <Image
          src={user?.profile_img}
          alt="image"
          width={40}
          height={40}
          className="aspect-square flex-shrink-0 rounded-full border border-black/20 object-cover"
        />
      ) : (
        <Image
          src={"/images/DefaultProfile.jpeg"}
          alt="image"
          width={40}
          height={40}
          className="aspect-square flex-shrink-0 rounded-full border border-black/20 object-cover"
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="relative ml-2 flex flex-1 items-center border-b border-secondary-200 focus-within:border-secondary-600"
      >
        <span className="body-16-m flex-shrink-0 text-[#30A1D1]">
          @{replyToName}
        </span>
        <input
          type="text"
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          className="ml-1 w-full text-[#444] focus:outline-none"
          placeholder="답글 작성"
        />
        <div className="absolute right-0 top-[50px] flex gap-1">
          <MyButton onClick={() => setWriteReply(false)} size="sm" style="gray">
            취소
          </MyButton>
          <MyButton size="sm" style="darkgray">
            완료
          </MyButton>
        </div>
      </form>
    </div>
  );
};

export default ReplyComment;
