"use client";

import Link from "next/link";
import HomeFillIcon from "../ui/icons/HomeFillIcon";
import HomeIcon from "../ui/icons/HomeIcon";
import { usePathname } from "next/navigation";
import AlertIcon from "../ui/icons/AlertIcon";
import AlertFillIcon from "../ui/icons/AlertFillIcon";

const menus = [
  {
    href: "/",
    icon: <HomeIcon />,
    clicckedIcon: <HomeFillIcon />,
    text: "홈",
  },
  {
    href: "/study",
    icon: <HomeIcon />,
    clicckedIcon: <HomeFillIcon />,
    text: "내 스터디",
  },
  {
    href: "/ranking",
    icon: <HomeIcon />,
    clicckedIcon: <HomeFillIcon />,
    text: "랭킹",
  },
  {
    href: "/mypage",
    icon: <AlertIcon />,
    clicckedIcon: <AlertFillIcon />,
    text: "마이페이지",
  },
];

export default function Footer() {
  const pathName = usePathname();

  return (
    <footer className="sticky bottom-0 px-4 bg-white z-10 border-t rounded-t-xl">
      <nav>
        <ul className="flex justify-between items-center gap-4 p-4">
          {menus.map(({ href, icon, clicckedIcon, text }) => (
            <li key={href}>
              {
                <Link
                  href={href}
                  className="flex flex-col gap-[0.1rem] items-center"
                >
                  {pathName === href ? clicckedIcon : icon}
                  <span className="text-sm">{text}</span>
                </Link>
              }
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
