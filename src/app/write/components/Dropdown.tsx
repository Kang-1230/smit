"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import browserClient from "@/utils/supabase/client";
import { usePublicUser } from "@/app/mypage/hooks/useUserProfile";
import { Tables } from "../../../../supabase";

export default function Dropdown() {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: user, isLoading, isError } = usePublicUser();

  const getStudyList = async () => {
    if (user) {
      const { data, error } = await browserClient
        .from("study")
        .select("*")
        .eq("study_manager", user.id);

      if (error) {
        alert(error);
      } else {
        setIsModalOpen(true);
      }

    } else {
      alert("서비스를 이용하시려면 먼저 로그인 해주세요.");
    }
  };

  return (
    <Menu>
      <div className="bottom-24 right-4 fixed">
        <MenuButton
          className="text-xl font-bold border-zinc-950 border rounded-full ... w-12 h-12"
          onClick={() => setIsDropDownOpen(!isDropDownOpen)}
        >
          {isDropDownOpen ? "x" : "+"}
        </MenuButton>
        <MenuItems anchor="top">
          <MenuItem>
            <a
              className="block data-[focus]:bg-blue-100 right-4 whitespace-nowrap"
              onClick={() => getStudyList()}
            >
              모집글 쓰기
            </a>
          </MenuItem>
          <MenuItem>
            <a
              className="block data-[focus]:bg-blue-100 right-4 whitespace-nowrap"
              href="/write"
            >
              스터디 만들기
            </a>
          </MenuItem>
        </MenuItems>
      </div>
    </Menu>
  );
}
