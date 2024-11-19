"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Share from "../../../../../public/icons/Share.svg";
import MyButton from "@/components/common/Button";
import { useToast } from "@/hooks/useToast";
import { ToastPosition } from "@/components/common/Toast";

const ShareStudy = () => {
  const [url, setUrl] = useState<string>("");
  const [position, setPosition] = useState<ToastPosition>("bc");
  const { showToast, ToastComponent } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }

    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        // xl 화면 크기 기준
        setPosition("web");
      } else {
        setPosition("bc");
      }
    };

    handleResize(); // 초기 설정
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("URL이 클립보드에 복사되었습니다.");
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <ToastComponent position={position} />
      <MyButton
        onClick={() => handleCopyClipBoard(url)}
        className="flex h-12 flex-1 items-center justify-center gap-1 rounded-full bg-tertiary-100"
        style="beige"
        size="lg"
      >
        <Image src={Share} alt="share" width={24} height={24} />
        <span>공유하기</span>
      </MyButton>
    </>
  );
};

export default ShareStudy;
