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

  
  // 수정 버튼
  const handleEdit = () => {
    const isConfirmed = window.confirm("해당 모집글을 수정하시겠습니까?");
    if (isConfirmed) {
      router.replace(`/write?post=${postId}`);
    }
  };


  return <EditButton userId={userId} handleDelete={handleDelete} handleEdit={handleEdit}/>;
};

export default ContentsEdit;
