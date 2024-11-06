"use client";

import Link from "next/link";
import CustomButton from "../ui/CustomButton";
import { useRouter } from "next/navigation";
import supabase from "../../utils/supabase/client";
import { useSession } from "@/hooks/useUserProfile";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import Image from "next/image";

const MENU_ICONS = [
  <Image
    src={`/icons/Search.svg`}
    width={24}
    height={24}
    alt="search-icon"
    key="search"
  />,
];

export default function Header() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user } = useSession();

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

  return (
    <header className="flex justify-between items-center px-[24px] bg-white h-[44px] absolute z-30 w-full bg-opacity-20 backdrop-blur-sm">
      <Link href="/">
        <Image src={"/images/logo.svg"} alt="logo" width={72} height={30} />
      </Link>
      <nav>
        <ul className="flex items-center gap-[10px] py-4">
          {MENU_ICONS.map((icon) => (
            <li key={icon.key} className="cursor-pointer">
              {icon}
            </li>
          ))}
          <li>
            {user ? (
              <CustomButton text="로그아웃" onClick={(e) => handleLogout(e)} />
            ) : (
              <CustomButton text="로그인" onClick={() => handleLogin()} />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
