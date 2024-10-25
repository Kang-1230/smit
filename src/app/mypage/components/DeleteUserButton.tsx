"use client";

import browserClient from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Tables } from "../../../../database.types";
import ModalOverlay from "../../../components/common/ModalOverlay";
import { useState } from "react";

const DeleteUserButton = ({ user }: { user: User | null }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserGroupOwner, setIsUserGroupOwner] = useState(false);

  const deleteUserHandler = async () => {
    const { data: studyByUser }: { data: Tables<"study">[] | null } =
      await browserClient
        .from("study")
        .select("*")
        .eq("study_manager", user!.id);

    if (studyByUser?.length) {
      setIsModalOpen(true);
      setIsUserGroupOwner(true);
      return;
    }
  };
  return (
    <>
      <button
        onClick={() => {
          deleteUserHandler();
        }}
      >
        탈퇴하기
      </button>
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          {isUserGroupOwner && (
            <div className="flex flex-col gap-y-6 mt-6">
              <p className="text-xl font-semibold">
                스터디 방장인 그룹이 있어요!
              </p>
              <p className="text-sm font-normal text-center">
                내 스터디 페이지로 가서
                <br />
                스터디원에게 방장 권한을 넘겨주세요.
              </p>
              <button className="w-full py-2 bg-gray-500 rounded-3xl text-white">
                바로가기
              </button>
            </div>
          )}
        </ModalOverlay>
      )}
    </>
  );
};

export default DeleteUserButton;
