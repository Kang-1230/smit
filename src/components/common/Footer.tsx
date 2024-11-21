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
    text: "내 스터디",
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

const STATIC_HIDDEN_PATHS = ["/post"];
const ALWAYS_HIDDEN_PATHS = ["/write", "/write/study", "/login", "/signup"];

export default function Footer() {
  const pathName = usePathname();

  const shouldHideFooter = () => {
    // 항상 숨겨야 하는 경로는 모든 화면에서 숨김
    if (ALWAYS_HIDDEN_PATHS.includes(pathName)) {
      return "hidden";
    }

    // 정적 경로는 모바일에서만 숨김
    if (STATIC_HIDDEN_PATHS.includes(pathName)) {
      return "hidden md:block";
    }

    const pathSegments = pathName.split("/");

    // /post/로 시작하는 경로는 모바일에서만 숨김
    if (pathSegments[1] === "post") {
      return "hidden md:block";
    }

    // study/[id]/manage 경로는 모든 화면에서 푸터 숨김
    if (pathSegments[1] === "study" && pathSegments[3] === "manage") {
      return "hidden";
    }

    // study/[id] 경로는 모바일에서만 푸터 숨김
    if (pathSegments[1] === "study" && pathSegments[2] && !pathSegments[3]) {
      return "hidden xl:block";
    }

    return "";
  };

  const hideStatus = shouldHideFooter();

  return (
    <div
      className={`fixed bottom-[12px] z-40 max-h-16 w-full px-[24px] text-tertiary-700 md:left-[9.5rem] md:top-4 md:w-[28rem] lg:left-[14%] lg:w-[30.3rem] xl:left-[20%] 2xl:left-[33%] ${hideStatus}`}
    >
      <nav className="h-[3.75rem] rounded-[30px] bg-[#C4C4C3] bg-opacity-60 p-[3px] backdrop-blur-2xl md:h-[48px] md:bg-[rgba(242,242,242,0.60)] md:p-1 md:backdrop-blur-sm">
        <ul className="flex h-full items-center justify-between">
          {menus.map((menu) => (
            <MenuItem
              key={menu.href}
              {...menu}
              isActive={pathName === menu.href}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
