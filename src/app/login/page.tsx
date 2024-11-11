"use client";

import supabase from "../../utils/supabase/client";
import { useState } from "react";
import Link from "next/link";
import KakaoLogo from "../../../public/icons/Kakao.svg";
import GoogleLogo from "../../../public/icons/Google.svg";
import SmitLogo from "../../../public/icons/SmitLogo.svg";
import SNSVector from "../../../public/icons/SNSSignUpVector.svg";
import RectangleLoginBack from "../../../public/icons/RectangleLoginBack.svg";
import Eye from "../../../public/icons/Eye.svg";
import Image from "next/image";
import { Checkbox } from "@headlessui/react";
import BackButton from "@/components/common/BackButton";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false);

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
      window.location.href = "/";
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
    <div className="relative h-full w-[375px] bg-[#f6f6f4]">
      <div className="absolute left-0 top-0 h-[628px] w-[375px]">
        <div className="absolute z-10 flex">
          <BackButton
            color="black"
            className="ml-[14px] flex h-[44px] w-[44px] items-center justify-center"
          />
        </div>
        <div className="absolute left-[163px] top-56 h-[165px] w-[165px] rounded-[82.5px] bg-primary-50" />
        <Image
          className="absolute left-0 top-0 z-0 h-[628px] w-[375px] backdrop-blur-xl"
          alt="Rectangle"
          src={RectangleLoginBack}
          fill
        />
        <div className="itmes-start absolute left-6 top-16 inline-flex h-[93px] w-[196px] flex-col gap-2">
          <Image
            className="!relative z-10 !h-[63,42px] !w-[152px]"
            src={SmitLogo}
            alt="SmilLogo"
          />
          <div className="relative mb-[-0.42px] inline-flex flex-[0_0_auto] items-center justify-center gap-2.5 py-0 pl-2 pr-0">
            <h1 className="body-16-r">스밋에서 모여서 함께 공부하자</h1>
          </div>
        </div>
        <section className="item-start absolute left-6 top-[198px] z-10 flex w-[327px] flex-col gap-2">
          <div className="item-start selt-stretch relative flex w-full flex-[0_0_auto] flex-col">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="body-16-r mb-[12px] h-[48px] w-[327px] rounded-[24px] pl-[20px] text-secondary-400"
            />
            <div className="relative">
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="body-16-r h-[48px] w-[327px] rounded-[24px] pl-[20px] text-secondary-400"
              />
              <button
                type="button"
                className="z-15 absolute right-[17.35px] top-[17.35px]"
              >
                <Image src={Eye} alt="PasswordEye" />
              </button>
            </div>
          </div>

          <div className="relative inline-flex flex-[0_0_auto] items-center gap-1 py-0 pl-3 pr-0">
            <Checkbox
              checked={checked}
              onChange={setChecked}
              className={`h-[15px] w-[15px] rounded-sm border-2 border-[#c2c2c2] ${checked ? "border-primary bg-primary" : "bg-white"} relative`}
            >
              {checked && (
                <svg
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 6L5 8.5L9.5 4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Checkbox>
            <span className="caption text-#7E7B72 text-center">
              자동 로그인
            </span>
          </div>
          <div>
            {isLoggedIn ? (
              <button onClick={(e) => handleLogout(e)}>로그아웃</button>
            ) : (
              <>
                <button
                  className="black-fill lgBtn mt-[30px] h-[48px] w-[327px] rounded-[24px]"
                  onClick={(e) => handleSignIn(e)}
                >
                  로그인
                </button>
              </>
            )}
            <Link href={"/signup"}>
              <button className="beige lgBtn mt-[8px] flex h-[48px] w-[327px] items-center justify-center rounded-[24px]">
                계정 만들기
              </button>
            </Link>
          </div>
          <div className="mt-[32px] flex w-[327px] flex-col items-center gap-5">
            <div className="flex-{0_0_auto] relative flex w-full items-center justify-center gap-2 self-stretch">
              <Image alt="Vector" src={SNSVector} />

              <div className="caption text-#7e7b72 relative mt-[-1.00px] w-fit whitespace-nowrap text-center">
                SNS 계정으로 가입하기
              </div>
              <Image alt="Vector" src={SNSVector} />
            </div>
            <div className="flex gap-[9px]">
              <button
                onClick={() => handleKaKaoSignIn()}
                className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white"
              >
                <Image
                  src={KakaoLogo}
                  alt="Kakao Login"
                  width={32}
                  height={32}
                />
              </button>
              <button
                onClick={() => handleGoogleSignIn()}
                className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white"
              >
                <Image
                  src={GoogleLogo}
                  alt="Google Login"
                  width={32}
                  height={32}
                />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
