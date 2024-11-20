"use client";

import browserClient from "@/utils/supabase/client";
import { Tables } from "../../../../database.types";
import ModalOverlay from "../../../components/common/ModalOverlay";
import { useRef, useState } from "react";
import { deleteUser } from "@/utils/supabase/supabase-client";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useUserProfile";
import useModalOpen from "@/hooks/useModalOpen";
import Image from "next/image";
import MyButton from "@/components/common/Button";
import Link from "next/link";

const DeleteUserButton = () => {
  const deleteRef = useRef<HTMLButtonElement | null>(null);
  const { isModalOpen, modalClose, modalOpen } = useModalOpen();
  const [isUserGroupOwner, setIsUserGroupOwner] = useState(false);
  const router = useRouter();
  const { data: user = null } = useSession();

  const checkDeleteHandler = async () => {
    const { data: studyByUser }: { data: Tables<"study">[] | null } =
      await browserClient
        .from("study")
        .select("*")
        .eq("study_manager", user!.id);

    if (studyByUser?.length) {
      modalOpen();
      setIsUserGroupOwner(false);
      return;
    } else {
      modalOpen();
      setIsUserGroupOwner(false);
    }
  };

  const deleteUserHandler = async () => {
    modalClose();
    await deleteUser();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <div className="px-[24px] md:mb-[168px] md:mt-[105px] md:px-0">
        <button
          onClick={() => {
            checkDeleteHandler();
          }}
          className="body-16-m md:title-20-s text-left md:ml-[4px]"
          ref={deleteRef}
        >
          탈퇴하기
        </button>
        <p className="body-14-r mb-[22px] mt-[4px] hidden text-secondary-300 md:ml-[4px] md:block">
          삭제하면 다시 복구할 수 없습니다
        </p>
        <MyButton
          size="md"
          style="beige"
          className="hidden w-fit md:block"
          onClick={() => deleteRef.current?.click()}
        >
          탈퇴하기
        </MyButton>
      </div>
      {isModalOpen && (
        <ModalOverlay onClick={modalClose}>
          {isUserGroupOwner ? (
            <>
              <Image
                src={`/icons/illust/Group.svg`}
                alt="groupImg"
                width={178}
                height={161}
                priority={true}
              />
              <p className="title-20-s mb-2 mt-4 text-secondary-900">
                스터디 방장인 그룹이 있어요!
              </p>
              <p className="body-14-m leading-[1.4] text-gray-700">
                내 스터디 페이지로 가서
                <br />
                스터디원에게 방장 권한을 넘겨주세요.
              </p>
              <div className="w-full">
                <Link href="/study">
                  <MyButton
                    style="black-fill"
                    size="lg"
                    className="mt-7 w-full"
                  >
                    바로가기
                  </MyButton>
                </Link>
              </div>
            </>
          ) : (
            <>
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
              <div className="mt-7 flex w-full flex-row gap-x-1">
                <MyButton style="black-line" size="lg" onClick={modalClose}>
                  취소
                </MyButton>
                <MyButton
                  style="black-fill"
                  size="lg"
                  className="w-full"
                  onClick={deleteUserHandler}
                >
                  탈퇴하기
                </MyButton>
              </div>
            </>
          )}
        </ModalOverlay>
      )}
    </>
  );
};

export default DeleteUserButton;
