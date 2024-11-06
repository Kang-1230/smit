"use client";
import { useDeleteMyPost } from "../hooks/useComments";
import { useRouter } from "next/navigation";
import EditButton from "./EditButton";

const ContentsEdit = ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const router = useRouter();
  const { mutate } = useDeleteMyPost();

  // 삭제 버튼
  const handleDelete = () => {
    const isConfirmed = window.confirm("해당 모집글을 삭제하시겠습니까?");
    if (isConfirmed) {
      mutate(postId);
      router.replace("/");
    }
  };

  return <EditButton userId={userId} handleDelete={handleDelete} />;
};

export default ContentsEdit;
