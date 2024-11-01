"use client";

import { usePathname } from "next/navigation";
import { MenuItem } from "./MenuItem";

const menus = [
  {
    href: "/",
    icon: "Home",
    clickedIcon: "HomeFill",
    text: "모집",
  },
  {
    href: "/study",
    icon: "Study",
    clickedIcon: "StudyFill",
    text: "스터디",
  },
  {
    href: "/ranking",
    icon: "Ranking",
    clickedIcon: "RankingFill",
    text: "랭킹",
  },
  {
    href: "/mypage",
    icon: "User",
    clickedIcon: "UserFill",
    text: "마이",
  },
];

export default function Footer() {
  const pathName = usePathname();

  return (
    <footer className="sticky bottom-2 bg-[#C4C4C3] z-10 rounded-full mx-4 p-1 bg-opacity-60 backdrop-blur-sm">
      <nav>
        <ul className="flex justify-between items-center gap-4">
          {menus.map((menu) => (
            <MenuItem
              key={menu.href}
              {...menu}
              isActive={pathName === menu.href}
            />
          ))}
        </ul>
      </nav>
    </footer>
  );
}
