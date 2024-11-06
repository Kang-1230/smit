"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import browserClient from "@/utils/supabase/client";
import Modal from "./StudyModal";
import { usePublicUser } from "@/hooks/useUserProfile";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Edit from "../../../../public/icons/Edit.svg";
import Open from "../../../../public/icons/Open.svg";
import Close from "../../../../public/icons/Close.svg";
import Pencil from "../../../../public/icons/PencilSmall.svg";
import RankingModalOverlay from "@/app/ranking/components/RankingModalOverlay";

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
            className={` ${
              isDropDownOpen ? `bg-primary-50` : `bg-black`
            } rounded-full w-14 h-14 text-white flex items-center justify-center`}
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
            className="bg-white rounded-3xl p-6 [--anchor-gap:20px]"
          >
            <MenuItem>
              <a
                className="body-16-s flex justify-start items-center"
                onClick={() => routeStudyPage()}
              >
                <Image src={Edit} alt="union" width={0} className="mr-2" />
                스터디 만들기
              </a>
            </MenuItem>
            <MenuItem>
              <a
                className="body-16-s flex justify-start items-center mt-4"
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
