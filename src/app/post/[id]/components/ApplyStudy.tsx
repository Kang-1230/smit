"use client";

import { useSession } from "@/hooks/useUserProfile";
import { applyNewStudy } from "@/utils/supabase/supabase-client";
import { useMutation } from "@tanstack/react-query";
import { Tables } from "../../../../../database.types";
import { useState } from "react";
import ApplyStudyModal from "../components/ApplyStudyModal";
import useModalOpen from "@/hooks/useModalOpen";
import LoginModal from "@/components/common/LoginModal";

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

  // 스터디 신청
  const { mutate: applyStudy } = useMutation({
    mutationFn: () => applyNewStudy(postData.study_id, message),
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

  return (
    <>
      {data?.id !== postData.user_id ? (
        <button
          onClick={applyButton}
          className="body-16-s h-12 flex-1 rounded-full bg-secondary-900 text-white"
        >
          신청하기
        </button>
      ) : (
        <button className="body-16-s h-12 flex-1 cursor-default rounded-full bg-secondary-50 text-secondary-200">
          신청하기
        </button>
      )}

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
