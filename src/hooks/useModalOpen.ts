"use client";

import { useEffect, useState } from "react";

const useModalOpen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // 스크롤 비활성화
    } else {
      document.body.style.overflow = ""; // 원래 상태로 복구
    }

    //모달 닫힐 때 overflow를 복구
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return { isModalOpen, modalOpen, modalClose };
};

export default useModalOpen;
