"use client";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="mt-3 mb-3">
      ←
    </button>
  );
};

export default BackButton;
