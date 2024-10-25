"use client";
import EditIcon from "@/components/ui/icons/EditIcon";
import { useEffect, useRef, useState } from "react";
import { useDeleteMyPost } from "../hooks/useComments";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useUserProfile";

const EditButton = ({ postId, userId }: { postId: string; userId: string }) => {
  const [isSelect, setIsSelect] = useState(false);
  const outSection = useRef<HTMLDivElement | null>(null);
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 버튼 바깥쪽 클릭해서 닫기
  const handleClickOutside = (e: MouseEvent) => {
    if (outSection.current && !outSection.current.contains(e.target as Node)) {
      setIsSelect(false);
    }
  };

  const handleSelect = () => {
    setIsSelect(!isSelect);
  };

  const { mutate } = useDeleteMyPost();

  // 삭제 버튼
  const handleDelete = () => {
    const isConfirmed = window.confirm("해당 모집글을 삭제하시겠습니까?");
    if (isConfirmed) {
      mutate(postId);
      router.replace("/");
    }
  };

  return data?.id === userId ? (
    <div ref={outSection} className="flex flex-col items-end absolute right-0">
      <button onClick={handleSelect}>
        <EditIcon />
      </button>
      <ul
        className={
          isSelect
            ? "flex flex-col justify-center items-center w-[60px] h-[64px] shadow-md shadow-gray-300 rounded-xl mt-1"
            : "hidden"
        }
      >
        <li className="cursor-pointer mb-[2px]">수정</li>
        <li className="cursor-pointer" onClick={handleDelete}>
          삭제
        </li>
      </ul>
    </div>
  ) : (
    <></>
  );
};

export default EditButton;
