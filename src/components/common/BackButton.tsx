"use client";

import ArrowLeft from "@/components/ui/icons/ArrowLeft";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  color?: string;
  className?: string;
}

const BackButton = ({ color = "#FFFFFF", className = "" }: BackButtonProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className={cn(
        "absolute left-0 cursor-pointer", 
        className 
      )}
    >
      <ArrowLeft color={color} />
    </div>
  );
};

export default BackButton;
