"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import browserClient from "@/utils/supabase/client";

import Modal from "./StudyModal";
import { useRouter } from "next/navigation";
import { usePublicUser } from "@/hooks/useUserProfile";

export default function Dropdown() {
  // 드롭다운 열림, 닫힘 상태 관리
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  // 모달 열림, 닫힘 상태 관리
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // 모달 모드 상태관리 - 모달 공용 컴포넌트 사용
  const [modalMode, setModalMode] = useState<string>("");

  const { data: user, isLoading, isError } = usePublicUser();
  const router = useRouter();

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
    }

    setIsDropDownOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const viewStudyModal = () => {
    if (user) {
      setModalMode("exist");
      setIsModalOpen(true);
    } else {
      alert("서비스를 이용하시려면 먼저 로그인 해주세요.");
    }
    setIsDropDownOpen(false);
  };

  return (
    <>
      {/* 드롭다운이 열렸을 때만 배경 표시 */}
      {isDropDownOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" />
      )}
      <Menu>
        <div className="bottom-24 right-4 fixed">
          <MenuButton
            className="text-xl font-bold bg-black rounded-full w-12 h-12 text-white"
            onClick={() => setIsDropDownOpen(!isDropDownOpen)}
          >
            {isDropDownOpen ? "x" : "+"}
          </MenuButton>
          <MenuItems
            anchor="top end"
            className="bg-white rounded-3xl p-6 [--anchor-gap:20px]"
          >
            <MenuItem>
              <a
                className="block data-[focus]:bg-blue-100 mb-2 font-bold"
                onClick={() => viewStudyModal()}
              >
                스터디 만들기
              </a>
            </MenuItem>
            <MenuItem>
              <a
                className="block data-[focus]:bg-blue-100 font-bold"
                onClick={() => getStudyList()}
              >
                모집글 쓰기
              </a>
            </MenuItem>
          </MenuItems>
        </div>
      </Menu>

      <Modal
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={() => setModalMode("exist")}
        modalMode={modalMode}
      />
    </>
  );
}
