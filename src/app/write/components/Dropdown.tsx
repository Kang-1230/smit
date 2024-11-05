"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import browserClient from "@/utils/supabase/client";

import Modal from "./StudyModal";
import { usePublicUser } from "@/hooks/useUserProfile";
import { useRouter } from "next/navigation";

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
        setModalMode("exist");
        setIsModalOpen(true);
      }
    } else {
      alert("서비스를 이용하시려면 먼저 로그인 해주세요.");
    }

    setIsDropDownOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsDropDownOpen(false);
  };

  const routeStudyPage = () => {
    if (!user) {
      alert("서비스를 이용하시려면 먼저 로그인 해주세요.");
    } else {
      router.push("/write/study");
    }
  };

  return (
    <>
      {isDropDownOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleModalClose}
        ></div>
      )}
      <Menu>
        <div
          className="bottom-24 right-4 fixed"
          onClick={(e) => e.stopPropagation()}
        >
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
                className="block data-[focus]:bg-blue-100 font-bold"
                onClick={() => routeStudyPage()}
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
        onClose={() => handleModalClose()}
        onConfirm={() => setModalMode("exist")}
        modalMode={modalMode}
      />
    </>
  );
}
