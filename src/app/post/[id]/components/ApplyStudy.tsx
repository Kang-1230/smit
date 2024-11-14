"use client";

import { useSession } from "@/hooks/useUserProfile";
import { applyNewStudy } from "@/utils/supabase/supabase-client";
import { useMutation } from "@tanstack/react-query";
import { Tables } from "../../../../../database.types";
import { useState } from "react";
import ApplyStudyModal from "../components/ApplyStudyModal";
import useModalOpen from "@/hooks/useModalOpen";
import LoginModal from "@/components/common/LoginModal";
import MyButton from "@/components/common/Button";
import { useToast } from "@/hooks/useToast";

interface ApplyStudyProps {
  postData: Tables<"post">;
  isFull: boolean;
}

const ApplyStudy = ({ postData, isFull }: ApplyStudyProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { data } = useSession();
  const { showToast, ToastComponent } = useToast();

  // 로그인 안하고 신청 누를경우 모달
  const {
    modalClose: loginModalClose,
    modalOpen: loginModalOpen,
    isModalOpen: isLoginModalOpen,
  } = useModalOpen();

  // 스터디 신청
  const { mutate: applyStudy } = useMutation({
    mutationFn: () => applyNewStudy(postData.study_id, message),
    onSuccess: (result) => {
      showToast(result.message);
      if (result.success) {
        handleCloseModal();
        setMessage("");
      }
    },
    onError: (error) => {
    },
  });

  const applyButton = () => {
    if (data) {
      setIsModalOpen(true);
      document.body.classList.add("overflow-hidden");
      return;
    } else {
      loginModalOpen();
      return;
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  const isManager = data?.id === postData.user_id ? true : false;

  return (
    <>
      <ToastComponent />
      <MyButton
        onClick={applyButton}
        className="flex-1"
        style="black-fill"
        size="lg"
        disabled={isFull ? isFull : isManager}
      >
        {isFull ? "모집마감" : "신청하기"}
      </MyButton>

      {isModalOpen && (
        <ApplyStudyModal
          onClose={handleCloseModal}
          message={message}
          setMessage={setMessage}
          onApply={() => {
            applyStudy(undefined, {
              onSuccess: () => {
                handleCloseModal();
                setMessage("");
              },
            });
          }}
        />
      )}
      {isLoginModalOpen && <LoginModal onClose={loginModalClose} />}
    </>
  );
};

export default ApplyStudy;
