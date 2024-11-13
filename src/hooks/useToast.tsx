"use client";
import { useState } from "react";
import { Toast } from "@/components/common/Toast";
import { ToastStyle, ToastPosition } from "@/components/common/Toast";

export const useToast = () => {
  const [toastState, setToastState] = useState({
    message: "",
    isVisible: false,
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
      style: options?.style || "darkgray",
      position: options?.position || "bc",
    });
    setTimeout(() => {
      setToastState((prev) => ({ ...prev, isVisible: false }));
    }, 2000);
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
