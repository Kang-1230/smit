"use client";
import { useState } from "react";
import { Toast } from "@/components/common/Toast";
import { ToastStyle, ToastPosition } from "@/components/common/Toast";

export const useToast = () => {
  const [toastState, setToastState] = useState({
    message: "",
    isVisible: false,
    isFadingOut: false,
    style: "darkgray" as ToastStyle,
    position: "bc" as ToastPosition,
  });

  const showToast = (
    message: string,
    options?: {
      style?: "gray" | "darkgray";
      position?: ToastPosition;
    },
  ) => {
    setToastState({
      message,
      isVisible: true,
      isFadingOut: false,
      style: options?.style || "darkgray",
      position: options?.position || "bc",
    });
    // 일정 시간이 지난 후 fade-out 애니메이션 시작
    setTimeout(() => {
      setToastState((prev) => ({ ...prev, isFadingOut: true }));
    }, 1200); // fade-out 전 대기 시간 설정

    // fade-out이 완료된 후 토스트 숨김
    setTimeout(() => {
      setToastState((prev) => ({
        ...prev,
        isVisible: false,
        isFadingOut: false,
      }));
    }, 1400); // fade-out 애니메이션의 길이와 일치하도록 설정
  };

  const ToastComponent = ({
    style,
    position,
  }: {
    style?: "gray" | "darkgray";
    position?: ToastPosition;
  }) => (
    <Toast
      {...toastState}
      style={style || toastState.style}
      position={position || toastState.position}
    />
  );

  return { showToast, ToastComponent };
};
