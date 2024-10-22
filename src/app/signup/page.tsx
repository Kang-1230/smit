"use client";

import supabase from "../../utils/supabase/client";
import { FormEvent, useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error("SignUp Error :", error);
    } else {
      console.log("회원가입 완료", data);
    }
  };

  return (
    <form onSubmit={(e) => handleSignUp(e)}>
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
      <button>회원가입</button>
    </form>
  );
}
