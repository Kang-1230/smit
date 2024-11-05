"use client";

import supabase from "../../utils/supabase/client";
import { useState } from "react";
import Link from "next/link";
import KakaoLogo from "../../../public/icons/Kakao.svg";
import GoogleLogo from "../../../public/icons/Google.svg";
import SmitLogo from "../../../public/icons/SmitLogo.svg";
import RectangleLoginBack from "../../../public/icons/RectangleLoginBack.svg";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error("SignIn Error :", error);
    } else {
      console.log("로그인 완료", data);
      alert("로그인 되었습니다.");
    }
  };

  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (data) {
      alert("구글 로그인 성공");
    } else if (error) {
      console.log("구글 로그인 실패", error);
    }
  };

  const handleKaKaoSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (data) {
      alert("카카오 로그인 성공");
    } else if (error) {
      console.log("카카오 로그인 실패", error);
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { error: logoutError } = await supabase.auth.signOut();
    if (logoutError) {
      console.error("SignUp Error :", logoutError);
    } else {
      console.log("로그아웃 완료");
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="relative w-[375px] h-[628px] bg-lightui-background">
      <div className="absolute w-[375px] h-[628px] top-0 left-0">
        <div className="absolute w-[165px] h-[165px] top-56 left-[163px] bg-primary-50 rounded-[82.5px]" />
        <Image
          className="absolute w-[375px] h-[628px] top-0 left-0 z-0 backdrop-blur-xl"
          alt="Rectangle"
          src={RectangleLoginBack}
        />
        <div className="w-[196px] h-[93px] inline-flex flex-col itmes-start gap-2 absolute top-16 left-6">
          <Image
            className="!relative !w-[152px] !h-[63,42px] z-10"
            src={SmitLogo}
            alt="SmilLogo"
          />
          <div className="inline-flex items-center justify-center gap-2.5 pl-2 pr-0 py-0 relative flex-[0_0_auto] mb-[-0.42px]">
            <h1 className="body-16-r">스밋에서 모여서 함께 공부하자</h1>
          </div>
        </div>
        <form className="w-[327px] relative z-10">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isLoggedIn ? (
            <button onClick={(e) => handleLogout(e)}>로그아웃</button>
          ) : (
            <>
              <button onClick={(e) => handleSignIn(e)}>로그인</button>

              <button onClick={() => handleGoogleSignIn()}>
                <Image
                  src={GoogleLogo}
                  alt="Google Login"
                  width={24}
                  height={24}
                />
              </button>
              <button onClick={() => handleKaKaoSignIn()}>
                <Image
                  src={KakaoLogo}
                  alt="Kakao Login"
                  width={24}
                  height={24}
                />
              </button>
            </>
          )}
        </form>
        <Link href={"/signup"}>회원가입하러 가기</Link>
      </div>
    </div>
  );
}
