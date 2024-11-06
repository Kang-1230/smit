"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "@/hooks/useUserProfile";
import DotEditVertical from "../../../../../public/icons/DotEditVertical.svg";
import Image from "next/image";

interface EditButtonProps {
  userId: string;
  handleEdit?: () => void;
  handleDelete: () => void;
}

const EditButton = ({ userId, handleDelete, handleEdit }: EditButtonProps) => {
  const [isSelect, setIsSelect] = useState(false);
  const outSection = useRef<HTMLDivElement | null>(null);
  const { data } = useSession();

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

  return data?.id === userId ? (
    <div
      ref={outSection}
      className="flex flex-col absolute top-0 right-0 items-end"
    >
      <button onClick={handleSelect}>
        <Image
          src={DotEditVertical}
          alt="이미지"
          width={24}
          height={24}
          className="z-10"
        />
      </button>
      <ul
        className={
          isSelect
            ? "flex flex-col z-30 gap-2 justify-center items-center px-4 py-[6px] [box-shadow:0_2px_10px_0_rgba(0,0,0,0.20)] rounded-lg mt-1 bg-white text-[#444] body-16-m"
            : "hidden"
        }
      >
        <li className="cursor-pointer" onClick={handleEdit}>
          수정
        </li>
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
