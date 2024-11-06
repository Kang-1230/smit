"use client";

import supabase from "../../utils/supabase/client";
import { FormEvent, useEffect, useState } from "react";
import RectangleSighUpBack from "../../../public/icons/RectangleLoginBack.svg";
import Image from "next/image";
import BackButton from "@/components/common/BackButton";

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
        .from("user")
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
          .from("user")
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
    <div className=" flex flex-col w-[375px] h-full"><div className="absolute w-[165px] h-[165px] top-56 left-[163px] bg-primary-50 rounded-[82.5px]" />
    <Image
      className="absolute w-[375px] h-[690px] z-0 backdrop-blur-xl "
      alt="Rectangle"
      src={RectangleSighUpBack}
    />
      <div className="relative self-stretch mb-[-1.00px] w-full h-[43px] bg-white">
        <div className="!relative !w-6 !h-6 top-[10px] left-[27px]"><BackButton color="black" /></div>
        
        <div className="absolute left-[99px] top-[10.96px] w-[176px] h-[22px] body-16-s text-center overflow-hidden text-ellipsis [display:-webkit] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] ">회원가입</div>
      </div>
      <form onSubmit={(e) => handleSignUp(e)} className="w-[375px] h-[690px]">
      <div className="relative h-full flex items-center justify-center">
        
        <section className="absolute left-[24px] top-[17px] z-10">
          <div className="w-[327px]">
            <div className="relative body-14-m left-[12px] mb-[8px]">
              이메일
            </div>
            <input
              type="email"
              placeholder="이메일 주소를 입력해주세요"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className = {`w-full h-[40px] white-fill rounded-20 placeholder:body-14-r pl-[16px] placeholder:text-secondary-300 body-14-r${email ? "text-black" : ""}`}
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
              value={password}
              className = {`w-full h-[40px] white-fill rounded-20 placeholder:body-14-r pl-[16px] placeholder:text-secondary-300 body-14-r${password ? "text-black" : ""}`}
            />
            <div className="caption text-secondary-500 ml-[12px] mt-[8px]">
              영문,숫자,특수문자(*&^_-)포함
            </div>
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
              value={verifyPassword}
              className = {`w-full h-[40px] white-fill rounded-20 placeholder:body-14-r pl-[16px] placeholder:text-secondary-300 body-14-r${verifyPassword ? "text-black" : ""}`}
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
              value={name}
              className = {`w-full h-[40px] white-fill rounded-20 placeholder:body-14-r pl-[16px] placeholder:text-secondary-300 body-14-r${name ? "text-black" : ""}`}
            />
          </div>
          <div>
            <div className="relative body-14-m left-[12px] mt-[20px] mb-[8px]">
              닉네임
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="스밋에서 활동할 닉네임을 적어주세요"
                onChange={(e) => setNickName(e.target.value)}
                value={nickName}
                className = {`w-full h-[40px] white-fill rounded-20 placeholder:body-14-r pl-[16px] placeholder:text-secondary-300 body-14-r${nickName ? "text-black" : ""}`}
              />
              <button className="black-fill text-white w-[80px] rounded-[18px] body-14-s ml-[8px]">
                중복확인
              </button>
            </div>
          </div>
          <div className="w-full">
            <div className="relative body-14-m left-[12px] mt-[20px] mb-[8px]">
              생년월일
            </div>
            <div className="flex item-end gap-3 relative self-stretch w-full flex-[0_0_auto]">
              <input
                type="text"
                placeholder="YYYY.MM.DD"
                onChange={(e) => setBirthDate(e.target.value)}
                value={birthDate}
                className = {`w-full h-[40px] white-fill rounded-20 placeholder:body-14-r pl-[16px] placeholder:text-secondary-300 body-14-r${birthDate ? "text-black" : ""}`}
              />

              <div className="w-[116px] inline-flex items-center gap-3 px-1 py-2.5 relative flex-[0_0_auto]">
                <label className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value as "male")}
                    className="!flex-[0_0_auto] accent-black	w-[20px] h-[20px]"
                  />
                  <p className="relative w-fit mt-[-0.50px] body-14-r whitespace-nowrap text-#666666">
                    남자
                  </p>
                </label>
                <label className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value as "male")}
                    className="!flex-[0_0_auto] accent-black w-[20px] h-[20px]"
                  />
                  <p className="relative w-fit mt-[-0.50px] body-14-r whitespace-nowrap text-#666666">
                    여자
                  </p>
                </label>
              </div>
            </div>
          </div>
        </section>
        <div className="fixed bottom-0 left-0 w-full h-[72px] px-6 py-4 bg-white border-t border-[#e6e6e6] z-10 flex justify-center items-center">
          <div className="w-[327px] h-[48px] black-fill rounded-[24px]">
            <button
              type="submit"
              className={`w-full h-[44px] text-white body-16-s  ${
                !isPasswordValid && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isPasswordValid}
            >
              가입하기
            </button>
          </div>
        </div>
      </div>
    </form>
    </div>
  );
}
