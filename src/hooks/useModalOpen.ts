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
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollPosition}px`;
    } else {
      // 모달이 닫힐 때 원래 상태로 복구
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      // 저장된 스크롤 위치로 이동
      window.scrollTo(0, scrollPosition);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isModalOpen, scrollPosition]);

  return { isModalOpen, modalOpen, modalClose };
};

export default useModalOpen;
