"use client";

import ArrowLeft from "@/components/ui/icons/ArrowLeft";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  color?: string;
  className?: string;
  studyId?: string;
}

const BackButton = ({
  color = "#FFFFFF",
  className = "",
  studyId,
}: BackButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (studyId) {
      router.push("/study");
    } else {
      router.back();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn("absolute left-0 cursor-pointer", className)}
    >
      <ArrowLeft color={color} />
    </div>
  );
};

export default BackButton;
