"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "@/hooks/useUserProfile";
import DotEditVertical from "../../../../../public/icons/DotEditVertical.svg";
import Image from "next/image";

interface EditButtonProps {
  userId: string;
  handleEdit: () => void;
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
      className="absolute right-0 top-0 flex flex-col items-end gap-1"
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
            ? "body-16-m z-30 flex h-[68px] w-[73px] flex-col items-center justify-center rounded-lg bg-white py-1 text-[#444] [box-shadow:0_2px_10px_0_rgba(0,0,0,0.20)]"
            : "hidden"
        }
      >
        <li className="cursor-pointer py-1" onClick={handleEdit}>
          수정
        </li>
        <li className="cursor-pointer py-1" onClick={handleDelete}>
          삭제
        </li>
      </ul>
    </div>
  ) : (
    <></>
  );
};

export default EditButton;
