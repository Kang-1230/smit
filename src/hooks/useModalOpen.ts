"use client";

import { useEffect, useState } from "react";

const useModalOpen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const modalOpen = () => {
    // 모달이 열릴 때 현재 스크롤 위치 저장
    setScrollPosition(window.scrollY);
    setIsModalOpen(true);
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      // 모달이 열릴 때 body를 fixed로 설정하고 top 값으로 현재 스크롤 위치 지정
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // 모달이 닫힐 때 원래 상태로 복구
    }

    return () => {};
  }, [isModalOpen, scrollPosition]);

  return { isModalOpen, modalOpen, modalClose };
};

export default useModalOpen;
