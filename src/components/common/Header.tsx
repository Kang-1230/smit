"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import supabase from "../../utils/supabase/client";
import { useSession } from "@/hooks/useUserProfile";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";
import SearchModal from "../home/SearchModal";
import MyButton from "./Button";

const HIDDEN_HEADER_PATHS = ["/login", "/signup", "/write", "/write/study"];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user } = useSession();
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      handleResize();

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // 로그인 상태 구독!!
  supabase.auth.onAuthStateChange(() => {
    queryClient.invalidateQueries({ queryKey: ["user", "session"] });
    queryClient.invalidateQueries({ queryKey: ["user", "public"] });
  });

  const handleLogin = () => {
    router.replace("/login");
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { error: logoutError } = await supabase.auth.signOut();
    if (logoutError) {
      console.error("SignUp Error :", logoutError);
    }
  };

  const handleSearchModal = () => {
    if (pathname.startsWith("/search")) return;
    setIsSearchModal(true);
  };

  const isHome = pathname === "/" && !isSearchModal;

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
      <header
        className={`fixed top-0 z-40 h-[2.75rem] w-full md:h-[4.8rem] bg-${isHome ? "black" : "white"} px-[24px] ${pathname === "/search" ? "" : "bg-opacity-20 backdrop-blur-2xl"}`}
      >
        <div className="mx-auto flex h-full max-w-[83rem] items-center justify-between">
          <Link href="/">
            <Image
              src={`/images/logo${isHome ? "White" : ""}.svg`}
              alt="logo"
              width={isMobile ? 72 : 120}
              height={isMobile ? 30 : 50}
            />
          </Link>
          <nav>
            <ul className="flex items-center gap-[10px] py-4">
              <li className="cursor-pointer">
                <button
                  onClick={handleSearchModal}
                  className="flex items-center justify-center rounded-full md:h-12 md:w-12 md:bg-white"
                >
                  <Image
                    src={`/icons/Search${isHome && isMobile ? "White" : ""}.svg`}
                    width={24}
                    height={24}
                    alt="search-icon"
                    key="search"
                  />
                </button>
              </li>

              <li>
                {user ? (
                  <MyButton
                    onClick={handleLogout}
                    style={`${isHome ? "white-fill" : "black-fill"}`}
                    size={isMobile ? "sm" : "lg"}
                    className={!isMobile ? "bg-tertiary-75" : ""}
                  >
                    로그아웃
                  </MyButton>
                ) : (
                  <MyButton
                    onClick={handleLogin}
                    style={`${isHome ? "white-fill" : "black-fill"}`}
                    size={isMobile ? "sm" : "lg"}
                    className={!isMobile ? "bg-tertiary-75" : ""}
                  >
                    로그인
                  </MyButton>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {isSearchModal && (
        <SearchModal
          onClick={() => setIsSearchModal(false)}
          isMobile={isMobile}
        />
      )}
    </>
  );
}
