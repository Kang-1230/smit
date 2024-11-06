"use client";

import supabase from "../../utils/supabase/client";
import { FormEvent, useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [birthDate, setBirthDate] = useState("YYYY.MM.DD");

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
      alert("회원가입 완료!");
    }
  };

  return (
    <form onSubmit={(e) => handleSignUp(e)}>
      <div>
        <div>이메일</div>
        <input
          type="email"
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <div>비밀번호</div>
        <input
          type="password"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <div>비밀번호 확인</div>
        <input
          type="password"
          placeholder="비밀번호를 한 번 더 입력해주세요"
          onChange={(e) => setVerifyPassword(e.target.value)}
        />
      </div>
      <div>
        <div>이름</div>
        <input
          type="password"
          placeholder="이름"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <div>닉네임</div>
        <input
          type="text"
          placeholder="닉네임"
          onChange={(e) => setNickName(e.target.value)}
        />
      </div>
      <div>
        <div>생년월일</div>
        <input
          type="password"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button>회원가입</button>
    </form>
  );
}
