"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import browserClient from "@/utils/supabase/client";
import Modal from "./StudyModal";
import { usePublicUser } from "@/hooks/useUserProfile";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Edit from "../../../../public/icons/Edit.svg";
import Open from "../../../../public/icons/Open.svg";
import Close from "../../../../public/icons/Close.svg";
import Pencil from "../../../../public/icons/PencilSmall.svg";

export default function Dropdown() {
  const router = useRouter();
  // 드롭다운 열림, 닫힘 상태 관리
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  // 모달 열림, 닫힘 상태 관리
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // 모달 모드 상태관리 - 모달 공용 컴포넌트 사용
  const [modalMode, setModalMode] = useState<string>("");

  const { data: user } = usePublicUser();

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
        router.replace("/write");
      }
    } else {
      alert("서비스를 이용하시려면 먼저 로그인 해주세요.");
      router.replace("/login");
    }

    setIsDropDownOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsDropDownOpen(false);
  };

  const routeStudyPage = () => {
    if (user) {
      router.push("/write/study");
    } else {
      alert("서비스를 이용하시려면 먼저 로그인 해주세요.");
      router.replace("/login");
    }
    setIsDropDownOpen(false);
  };

  useEffect(() => {
    if (isDropDownOpen) {
      // 모달이 열리면 body의 overflow를 hidden으로 설정
      document.body.style.overflow = "hidden";
    } else {
      // 모달이 닫히면 원래 상태로 돌림
      document.body.style.overflow = "auto";
    }

    // 컴포넌트 언마운트 시에도 원래 상태로 복구
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDropDownOpen]);

  return (
    <>
      {isDropDownOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleModalClose}
        ></div>
      )}
      <Menu>
        <div
          className="fixed bottom-[5.25rem] right-6"
          onClick={(e) => e.stopPropagation()}
        >
          <MenuButton
            className={` ${
              isDropDownOpen ? `bg-primary-50` : `bg-black`
            } flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full border border-white/70 text-white`}
            onClick={() => setIsDropDownOpen(!isDropDownOpen)}
          >
            {isDropDownOpen ? (
              <Image src={Close} alt="union" width={0} />
            ) : (
              <Image src={Open} alt="union" width={0} />
            )}
          </MenuButton>
          <MenuItems
            anchor="top end"
            className="rounded-3xl bg-white p-6 [--anchor-gap:20px]"
          >
            <MenuItem>
              <a
                className="body-16-s flex items-center justify-start"
                onClick={() => routeStudyPage()}
              >
                <Image src={Edit} alt="union" width={0} className="mr-2" />
                스터디 만들기
              </a>
            </MenuItem>
            <MenuItem>
              <a
                className="body-16-s mt-4 flex items-center justify-start"
                onClick={() => getStudyList()}
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
      </Menu>

      <Modal
        isModalOpen={isModalOpen}
        onClose={() => handleModalClose()}
        onConfirm={() => setModalMode("exist")}
        modalMode={modalMode}
      />
    </>
  );
}
