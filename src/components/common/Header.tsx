"use client";

import Link from "next/link";
import AlertIcon from "../ui/icons/AlertIcon";
import SearchIcon from "../ui/icons/SearchIcon";
import CustomButton from "../ui/CustomButton";
import { useRouter } from "next/navigation";

const MENU_ICONS = [<SearchIcon key="search" />, <AlertIcon key="alert" />];

export default function Header() {
  const router = useRouter();
  const isLoggedIn = false;

  const handleLogin = () => {
    router.replace("/login");
    // TODO: 로그인 처리 로직 추가
  };

  const handleLogout = () => {
    // TODO: 로그아웃 처리 로직 추가
  };

  return (
    <header className="flex justify-between items-center px-4 bg-white border-b">
      <Link href="/">
        <h1 className="text-3xl font-bold cursor-pointer">Smit</h1>
      </Link>
      <nav>
        <ul className="flex items-center gap-4 py-4">
          {MENU_ICONS.map((icon) => (
            <li key={icon.key} className="cursor-pointer">
              {icon}
            </li>
          ))}
          <li>
            {isLoggedIn ? (
              <CustomButton text="로그아웃" onClick={handleLogout} />
            ) : (
              <CustomButton text="로그인" onClick={handleLogin} />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
