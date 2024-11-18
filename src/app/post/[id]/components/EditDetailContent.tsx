"use client";
import { useDeleteMyPost } from "../hooks/useComments";
import { useRouter } from "next/navigation";
import EditButton from "./EditButton";
import DeleteModal from "@/components/common/DeleteModal";
import useModalOpen from "@/hooks/useModalOpen";
import { useToast } from "@/hooks/useToast";

const EditDetailContent = ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const router = useRouter();
  const { mutate } = useDeleteMyPost();
  const { isModalOpen, modalOpen, modalClose } = useModalOpen();
  const { showToast, ToastComponent } = useToast();

  // 삭제 버튼
  const handleDelete = () => {
    mutate(postId, {
      onSuccess: () => {
        showToast("삭제되었습니다!");
      },
    });
    setTimeout(() => {
      router.replace("/");
    }, 1000);
  };

  // 수정 버튼
  const handleEdit = () => {
    router.push(`/write?post=${postId}`);
  };

  return (
    <>
      <EditButton
        userId={userId}
        handleDelete={modalOpen}
        handleEdit={handleEdit}
      />
      {isModalOpen && (
        <DeleteModal onClose={modalClose} onDelete={handleDelete} />
      )}
      <ToastComponent position="tc" />
    </>
  );
};

export default EditDetailContent;
