"use client";

import ArrowLeft from "@/components/ui/icons/ArrowLeft";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  color?: string;
}

const BackButton = ({ color = "#FFFFFF" }: BackButtonProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className={`absolute left-0 cursor-pointer`}
    >
      <ArrowLeft color={color} />
    </div>
  );
};

export default BackButton;
