"use client";

import Link from "next/link";
import CustomButton from "../ui/CustomButton";
import { usePathname, useRouter } from "next/navigation";
import supabase from "../../utils/supabase/client";
import { useSession } from "@/hooks/useUserProfile";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";
import SearchModal from "../home/SearchModal";

const MENU_ICONS = [
  <Image
    src={`/icons/Search.svg`}
    width={24}
    height={24}
    alt="search-icon"
    key="search"
  />,
];
const HIDDEN_HEADER_PATHS = ["/login", "/signup", "/write", "/write/study"];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user } = useSession();
  const [isSearchModal, setIsSearchModal] = useState(false);

  // 로그인 상태 구독!!
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      queryClient.invalidateQueries({ queryKey: ["user", "session"] });
      queryClient.invalidateQueries({ queryKey: ["user", "public"] });
    });
    // 컴포넌트 나가면 구독 해제~
    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  const handleLogin = () => {
    router.replace("/login");
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { error: logoutError } = await supabase.auth.signOut();
    if (logoutError) {
      console.error("SignUp Error :", logoutError);
    } else {
      console.log("로그아웃 완료");
    }
  };

  // pathname이 study/{id} 형식인지 확인
  const isStudyDetailPath = () => {
    const pathSegments = pathname.split("/");
    return pathSegments[1] === "study" && pathSegments[2]; // study 다음에 id가 있는지 체크
  };

  // 헤더를 숨겨야 하는지 확인
  const shouldHideHeader = () => {
    return HIDDEN_HEADER_PATHS.includes(pathname) || isStudyDetailPath();
  };

  if (shouldHideHeader()) {
    return null;
  }

  return (
    <>
      <header className="absolute z-30 flex h-[44px] w-full items-center justify-between bg-white bg-opacity-20 px-[24px] backdrop-blur-sm">
        <Link href="/">
          <Image src={"/images/logo.svg"} alt="logo" width={72} height={30} />
        </Link>
        <nav>
          <ul className="flex items-center gap-[10px] py-4">
            {MENU_ICONS.map((icon) => (
              <li
                key={icon.key}
                className="cursor-pointer"
                onClick={() => setIsSearchModal(true)}
              >
                {icon}
              </li>
            ))}
            <li>
              {user ? (
                <CustomButton
                  text="로그아웃"
                  onClick={(e) => handleLogout(e)}
                />
              ) : (
                <CustomButton text="로그인" onClick={() => handleLogin()} />
              )}
            </li>
          </ul>
        </nav>
      </header>
      {isSearchModal && <SearchModal onClick={() => setIsSearchModal(false)} />}
    </>
  );
}
