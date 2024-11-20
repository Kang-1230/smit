"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import browserClient from "@/utils/supabase/client";
import Modal from "./StudyModal";
import { usePublicUser } from "@/hooks/useUserProfile";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Edit from "../../../../public/icons/Edit.svg";
import Open from "../../../../public/icons/PlusMediumWhite.svg";
import Close from "../../../../public/icons/XMedium.svg";
import Pencil from "../../../../public/icons/PencilSmall.svg";
import Tooltip from "@/components/common/Tooltip";
import useTooltip from "@/hooks/useTooltip";
import LoginModal from "@/components/common/LoginModal";
import useModalOpen from "@/hooks/useModalOpen";

export default function Dropdown() {
  const router = useRouter();
  // 모달 열림, 닫힘 상태 관리
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // 모달 모드 상태관리 - 모달 공용 컴포넌트 사용
  const [modalMode, setModalMode] = useState<string>("");

  const { data: user } = usePublicUser();

  const { tooltipVisible, closeTooltip } = useTooltip("Write");

  const {
    modalClose,
    modalOpen,
    isModalOpen: isLoginModalOpen,
  } = useModalOpen();

  const getStudyList = async () => {
    if (user) {
      const { error, count } = await browserClient
        .from("study")
        .select("*", { count: "exact", head: true })
        .eq("study_manager", user.id);

      if (error) {
        alert(error);
      }

      if (count === 0) {
        setModalMode("nonexist");
        setIsModalOpen(true);
      } else {
        router.push("/write");
      }
    } else {
      modalOpen();
    }
  };

  const routeStudyPage = () => {
    if (user) {
      router.push("/write/study");
    } else {
      modalOpen();
    }
  };

  return (
    <>
      <div className="absolute bottom-[84px] right-6 flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full">
        <Menu>
          {({ open }) => (
            <div className="">
              <MenuButton
                className={`relative z-[999] items-center justify-center rounded-full border border-white/50 p-[10px] text-white ${
                  open ? "border-none bg-primary-50" : "bg-black"
                }`}
              >
                <Image
                  src={open ? Close : Open}
                  alt="union"
                  width={38}
                  height={38}
                />
              </MenuButton>
              {tooltipVisible && user && (
                <div className="fixed bottom-[162px] right-[19px]">
                  <Tooltip
                    message={`+ 버튼을 눌러서<br/>스터디/모집글을 작성해보세요`}
                    position="right"
                    onClose={closeTooltip}
                  />
                </div>
              )}

              {open && (
                <div
                  className="fixed inset-0 flex h-full w-full items-center justify-center bg-black/70"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MenuItems
                    static
                    anchor="top end"
                    className="z-20 origin-top animate-slide-up rounded-3xl bg-white p-6 transition duration-200 ease-out [--anchor-gap:8px] data-[closed]:scale-95 data-[closed]:opacity-0"
                  >
                    <MenuItem>
                      <a
                        className="body-16-s flex items-center justify-start"
                        onClick={routeStudyPage}
                      >
                        <Image
                          src={Edit}
                          alt="union"
                          width={0}
                          className="mr-2"
                        />
                        스터디 만들기
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        className="body-16-s mt-4 flex items-center justify-start"
                        onClick={getStudyList}
                      >
                        <Image
                          src={Pencil}
                          alt="PencilLined"
                          width={0}
                          className="mr-2"
                        />
                        모집글 쓰기
                      </a>
                    </MenuItem>
                  </MenuItems>
                </div>
              )}
            </div>
          )}
        </Menu>
      </div>

      <Modal
        isModalOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        modalMode={modalMode}
      />
      {isLoginModalOpen && <LoginModal onClose={modalClose} />}
    </>
  );
}
