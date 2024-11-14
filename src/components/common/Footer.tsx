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

const STATIC_HIDDEN_PATHS = [
  "/post",
  "/write",
  "/write/study",
  "/login",
  "/signup",
];

const DYNAMIC_HIDDEN_PATHS = [{ prefix: "/post/" }, { prefix: "/study/" }];

export default function Footer() {
  const pathName = usePathname();

  // 푸터를 숨겨야 하는지 확인
  const shouldHideFooter = () => {
    // 정적 경로 체크
    if (STATIC_HIDDEN_PATHS.includes(pathName)) {
      return true;
    }
    // 동적 경로 체크
    return DYNAMIC_HIDDEN_PATHS.some(({ prefix }) =>
      pathName.startsWith(prefix),
    );
  };

  if (shouldHideFooter()) {
    return null;
  }

  return (
    <footer className="fixed bottom-[12px] w-full px-[24px]">
      <nav className="z-10 h-[60px] rounded-full bg-[#C4C4C3] bg-opacity-60 p-[4px] backdrop-blur-2xl">
        <ul className="flex items-center justify-between">
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
