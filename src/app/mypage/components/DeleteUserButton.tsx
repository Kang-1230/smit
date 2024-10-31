"use client";

import browserClient from "@/utils/supabase/client";
import { Tables } from "../../../../database.types";
import ModalOverlay from "../../../components/common/ModalOverlay";
import { useState } from "react";
import { deleteUser } from "@/utils/supabase/supabase-client";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/hooks/useUserProfile";
import useModalOpen from "@/hooks/useModalOpen";

const DeleteUserButton = () => {
  const { isModalOpen, modalClose, modalOpen } = useModalOpen();
  const [isUserGroupOwner, setIsUserGroupOwner] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user = null } = useSession();

  const checkDeleteHandler = async () => {
    const { data: studyByUser }: { data: Tables<"study">[] | null } =
      await browserClient
        .from("study")
        .select("*")
        .eq("study_manager", user!.id);

    if (studyByUser?.length) {
      modalOpen();
      setIsUserGroupOwner(true);
      return;
    } else {
      modalOpen();
      setIsUserGroupOwner(false);
    }
  };

  const deleteUserHandler = async () => {
    modalClose();
    await deleteUser();
    await queryClient.invalidateQueries({ queryKey: ["user", "session"] });
    router.push("/");
  };

  return (
    <>
      <button
        onClick={() => {
          checkDeleteHandler();
        }}
      >
        탈퇴하기
      </button>
      {isModalOpen && (
        <ModalOverlay onClick={modalClose}>
          {isUserGroupOwner ? (
            <div className="flex flex-col gap-y-6 w-full mt-6 text-center">
              <p className="text-xl font-semibold">
                스터디 방장인 그룹이 있어요!
              </p>
              <p className="text-sm font-normal">
                내 스터디 페이지로 가서
                <br />
                스터디원에게 방장 권한을 넘겨주세요.
              </p>
              <button className="w-full py-2 bg-gray-500 rounded-3xl text-white">
                바로가기
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-y-6 w-full mt-6 text-center">
              <p className="text-xl font-semibold">탈퇴하시겠습니까?</p>
              <p className="text-sm font-normal">
                즉시 모든 데이터를 잃게 되며
                <br />
                복구가 불가능합니다.
              </p>
              <div className="flex flex-row justify-between">
                <button
                  onClick={modalClose}
                  className="w-[calc(50%-2px)] py-2 border-gray-500 border rounded-3xl"
                >
                  아니오
                </button>
                <button
                  className="w-[calc(50%-2px)] px-6 py-2 bg-gray-500 rounded-3xl text-white"
                  onClick={deleteUserHandler}
                >
                  네
                </button>
              </div>
            </div>
          )}
        </ModalOverlay>
      )}
    </>
  );
};

export default DeleteUserButton;
