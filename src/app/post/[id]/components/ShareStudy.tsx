"use client";

import { useEffect, useState } from "react";

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
      className="flex-1 h-[42px] bg-[#777777] text-white rounded-full my-5"
    >
      공유하기
    </button>
  );
};

export default ShareStudy;
