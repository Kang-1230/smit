"use client";

import supabase from "../../utils/supabase/client";
import { useState } from "react";
import Link from "next/link";

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
    <>
      <form>
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
            <button onClick={() => handleGoogleSignIn()}>구글 로그인</button>
            <button onClick={() => handleKaKaoSignIn()}>카카오 로그인</button>
          </>
        )}
      </form>
      <Link href={"/signup"}>회원가입하러 가기</Link>
    </>
  );
}
