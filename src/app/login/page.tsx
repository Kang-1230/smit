"use client";

import supabase from "../../utils/supabase/client";
import { useState } from "react";
import { useAuthStore } from "../../../src/auth-store";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isLoggedIn } = useAuthStore();

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
      useAuthStore.setState({
        isLoggedIn: true,
        userId: data.user.email,
        accessToken: data.session.access_token,
      });
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { error: logoutError } = await supabase.auth.signOut();

    if (logoutError) {
      console.error("SignUp Error :", logoutError);
    } else {
      console.log("로그아웃 완료");
      const logout = useAuthStore.getState().logout;
      logout();
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
          <button onClick={(e) => handleSignIn(e)}>로그인</button>
        )}
      </form>
      <Link href={"/signup"}>회원가입하러 가기</Link>
    </>
  );
}
