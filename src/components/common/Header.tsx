"use client";

import Link from "next/link";
import AlertIcon from "../ui/icons/AlertIcon";
import AlertFillIcon from "../ui/icons/AlertFillIcon";
import SearchIcon from "../ui/icons/SearchIcon";
import SearchFillIcon from "../ui/icons/SearchFillIcon";
import { usePathname } from "next/navigation";
import CustomButton from "../ui/CustomButton";

const menus = [
  {
    href: "/search",
    icon: <SearchIcon />,
    clicckedIcon: <SearchFillIcon />,
  },
  {
    href: "/alert",
    icon: <AlertIcon />,
    clicckedIcon: <AlertFillIcon />,
  },
];

export default function Header() {
  const pathName = usePathname();
  const session = false;

  return (
    <header className="flex justify-between items-center px-4 bg-white border-b">
      <Link href="/">
        <h1 className="text-3xl font-bold">Smit</h1>
      </Link>
      <nav>
        <ul className="flex items-center gap-4 py-4">
          {menus.map(({ href, icon, clicckedIcon }) => (
            <li key={href}>
              {
                <Link href={href}>
                  {pathName === href ? clicckedIcon : icon}
                </Link>
              }
            </li>
          ))}
          <li>
            {session ? (
              <CustomButton
                text="로그아웃"
                onClick={() => {
                  // signout
                }}
              />
            ) : (
              <CustomButton
                text="로그인"
                onClick={() => {
                  // signIn
                }}
              />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
