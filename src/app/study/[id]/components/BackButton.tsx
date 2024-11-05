"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ArrowLeft from "../../../../../public/icons/ArrowLeft.svg";

const BackButton = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.back()}
      src={ArrowLeft}
      alt="back"
      width={24}
      height={24}
      className="absolute left-0 cursor-pointer"
    />
  );
};

export default BackButton;
