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
import Image from "next/image";
import MyButton from "@/components/common/Button";

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
        className="text-left px-6 body-16-m"
      >
        탈퇴하기
      </button>
      {isModalOpen && (
        <ModalOverlay onClick={modalClose}>
          {isUserGroupOwner ? (
            <div className="flex flex-col w-full items-center text-center py-8 px-5">
              <Image
                src={`/icons/illust/Group.svg`}
                alt="groupImg"
                width={178}
                height={161}
              />
              <p className="title-20-s mb-2 mt-4 text-secondary-900">
                스터디 방장인 그룹이 있어요!
              </p>
              <p className="body-14-m leading-[1.4] text-gray-700">
                내 스터디 페이지로 가서
                <br />
                스터디원에게 방장 권한을 넘겨주세요.
              </p>
              <button className="lgBtn black-fill w-full mt-7">바로가기</button>
            </div>
          ) : (
            <div className="flex flex-col w-full text-center py-8 px-5 items-center">
              <Image
                src={`/icons/illust/WarningRed.svg`}
                alt="warning"
                width={178}
                height={161}
              />
              <p className="title-20-s mb-2 mt-4 text-secondary-900">
                탈퇴하시겠습니까?
              </p>
              <p className="body-14-m leading-[1.4] text-gray-700">
                즉시 모든 데이터를 잃게 되며
                <br />
                복구가 불가능합니다.
              </p>
              <div className="flex flex-row w-full gap-x-1 mt-7">
                <MyButton style="black-line" size="lgBtn" onClick={modalClose}>
                  취소
                </MyButton>
                <button
                  className="lgBtn black-fill grow"
                  onClick={deleteUserHandler}
                >
                  탈퇴하기
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
