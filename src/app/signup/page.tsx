"use client";

import supabase from "../../utils/supabase/client";
import { FormEvent, useEffect, useState } from "react";
import RectangleSighUpBack from "../../../public/icons/RectangleLoginBack.svg";
import Image from "next/image";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [gender, setGender] = useState<"male" | "female">();

  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    if (verifyPassword) {
      if (password === verifyPassword) {
        setPasswordMessage("");
        setIsPasswordValid(true);
      } else {
        setPasswordMessage("비밀번호가 동일하지 않습니다.");
        setIsPasswordValid(false);
      }
    }
  }, [password, verifyPassword]);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPasswordValid) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 모든 필드 검증
    if (!email || !password || !name || !nickName || !birthDate) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      // 이메일 중복 체크
      const { data: existingUser } = await supabase
        .from("users")
        .select("email")
        .eq("email", email)
        .single();

      if (existingUser) {
        alert("이미 존재하는 이메일입니다.");
        return;
      }

      // auth 회원가입
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      console.log("authdata:", authData);

      if (authError) throw authError;
      if (!authData.user) throw new Error("User data is missing");

      try {
        // user 테이블에 정보 저장
        const { error: insertError } = await supabase
          .from("users")
          .insert({
            id: authData.user.id,
            user_name: name,
            name: nickName,
            birth_date: birthDate,
            email: email,
            study_time: 0,
          })
          .select();

        if (insertError) {
          // 실패 시 auth 데이터 정리 시도
          await supabase.auth.signOut();
          console.error("Full Insert Error:", insertError);
          throw new Error(
            `사용자 정보 저장에 실패했습니다: ${insertError.message}`,
          );
        }

        // 성공
        alert("회원가입이 완료되었습니다!");
        await supabase.auth.signOut(); // 성공해도 일단 로그아웃
        window.location.href = "/login";
      } catch (error) {
        // user 테이블 저장 실패 시
        await supabase.auth.signOut();
        throw error;
      }
    } catch (error) {
      console.error("Full SignUp Error:", error);
      await supabase.auth.signOut();

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <form onSubmit={(e) => handleSignUp(e)} className="w-[375px] h-[690px]">
      <div className="relative h-[690px]">
        <div className="absolute w-[165px] h-[165px] top-56 left-[163px] bg-primary-50 rounded-[82.5px]" />
        <Image
          className="absolute w-[375px] h-[690px] top-0 left-0 z-0 backdrop-blur-xl"
          alt="Rectangle"
          src={RectangleSighUpBack}
        />
        <section className="absolute left-[24px] top-[60px] z-10">
          <div className="w-[327px]">
            <div className="relative body-14-m left-[12px] mb-[8px]">
              이메일
            </div>
            <input
              type="email"
              placeholder="이메일 주소를 입력해주세요"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[40px] white-fill text-secondary-300 rounded-20 placeholder:body-14-r pl-[16px] "
            />
          </div>
          <div>
            <div className="relative body-14-m left-[12px] mt-[20px] mb-[8px]">
              비밀번호
            </div>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[40px] white-fill text-secondary-300 rounded-20 placeholder:body-14-r pl-[16px] "
            />
          </div>
          <div>
            <div className="relative body-14-m left-[12px] mt-[20px] mb-[8px]">
              비밀번호 확인
            </div>
            <input
              type="password"
              placeholder="비밀번호를 한 번 더 입력해주세요"
              onChange={(e) => {
                setVerifyPassword(e.target.value);
              }}
              className="w-full h-[40px] white-fill text-secondary-300 rounded-20 placeholder:body-14-r pl-[16px]"
            />
            <p className="caption text-red-600">{passwordMessage}</p>
          </div>
          <div>
            <div className="relative body-14-m left-[12px] mt-[20px] mb-[8px]">
              이름
            </div>
            <input
              type="text"
              placeholder="성함을 적어주세요"
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[40px] white-fill text-secondary-300 rounded-20 placeholder:body-14-r pl-[16px] "
            />
          </div>
          <div>
            <div className="relative body-14-m left-[12px] mt-[20px] mb-[8px]">
              닉네임
            </div>
            <input
              type="text"
              placeholder="스밋에서 활동할 닉네임을 적어주세요"
              onChange={(e) => setNickName(e.target.value)}
              className="w-full h-[40px] white-fill text-secondary-300 rounded-20 placeholder:body-14-r pl-[16px] "
            />
          </div>
          <div className="w-[199px]">
            <div className="relative body-14-m left-[12px] mt-[20px] mb-[8px]">
              생년월일
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="YYYY.MM.DD"
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full h-[40px] white-fill text-secondary-300 rounded-20 placeholder:body-14-r pl-[16px]"
              />
              <div className="flex items-center gap-4 mt-4">
                <div className="flex gap-4">
                  <label className="flex items-center gap-[0.5px] body-14-r text-#666666">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value as "male")}
                    />
                    남자
                  </label>
                  <label className="flex items-center gap-1 body-14-r text-#666666">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value as "female")}
                    />
                    여자
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`${!isPasswordValid && "opacity-50 cursor-not-allowed"}`}
            disabled={!isPasswordValid}
          >
            가입하기
          </button>
        </section>
      </div>
    </form>
  );
}
