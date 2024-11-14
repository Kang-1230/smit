"use client";

import ArrowLeft from "@/components/ui/icons/ArrowLeft";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  color?: string;
  className?: string;
  studyId?: string;
  today?: string;
}

const BackButton = ({
  color = "#FFFFFF",
  className = "",
  studyId,
  today,
}: BackButtonProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleClick = () => {
    if (studyId) {
      queryClient.invalidateQueries({ queryKey: ["calendar", studyId] });
      queryClient.invalidateQueries({
        queryKey: ["schedules", studyId, today],
      });
    }
    router.back();
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
