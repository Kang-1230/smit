"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Share from "../../../../../public/icons/Share.svg";

const ShareStudy = () => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={() => handleCopyClipBoard(url)}
      className="flex flex-1 gap-1 justify-center items-center h-12 bg-tertiary-100 rounded-full"
    >
      <Image src={Share} alt="share" width={24} height={24} />
      <span className="body-16-s">공유하기</span>
    </button>
  );
};

export default ShareStudy;
