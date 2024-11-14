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

const ApplyStudy = ({ postData }: { postData: Tables<"post"> }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { data } = useSession();
  // 로그인 안하고 신청 누를경우 모달
  const {
    modalClose: loginModalClose,
    modalOpen: loginModalOpen,
    isModalOpen: isLoginModalOpen,
  } = useModalOpen();
  const { showToast, ToastComponent } = useToast();

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
      console.log("스터디 신청 실패", error);
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
        disabled={isManager}
      >
        신청하기
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
