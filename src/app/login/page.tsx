"use client";

import supabase from "../../utils/supabase/client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogIn, setIsLogIn] = useState(false);

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
      setIsLogIn(false);
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { error: logoutError } = await supabase.auth.signOut();

    if (logoutError) {
      console.error("SignUp Error :", logoutError);
    } else {
      console.log("로그아웃 완료");
      setIsLogIn(true);
    }
  };

  return (
    <form>
      <input
        type="email"
        placeholder="이메일"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
      />
      {isLogIn ? (
        <button onClick={(e) => handleSignIn(e)}>로그인</button>
      ) : (
        <button onClick={(e) => handleLogout(e)}>로그아웃</button>
      )}
    </form>
  );
}
