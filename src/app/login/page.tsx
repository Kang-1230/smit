"use client";

import supabase from "../../utils/supabase/client";
import { useState } from "react";
import Link from "next/link";
import KakaoLogo from "../../../public/icons/Kakao.svg";
import GoogleLogo from "../../../public/icons/Google.svg";
import SmitLogo from "../../../public/icons/SmitLogo.svg";
import SNSVector from "../../../public/icons/SNSSignUpVector.svg";
import RectangleLoginBack from "../../../public/icons/RectangleLoginBack.svg";
import Image from "next/image";
import { Checkbox } from "@headlessui/react";

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
        <section className="flex flex-col w-[327px] item-start gap-2 absolute top-[198px] left-6 z-10">
          <div className="flex flex-col	item-start relative selt-stretch w-full flex-[0_0_auto]">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="body-16-r pl-[20px] w-[327px] h-[48px] mb-[12px] rounded-[24px] text-secondary-400 "
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="body-16-r w-[327px] h-[48px] rounded-[24px] pl-[20px] text-secondary-400"
            />
          </div>
          <div className="inline-flex items-center gap-1 pl-3 pr-0 py-0 relative flex-[0_0_auto]">
            <Checkbox
              checked={checked}
              onChange={setChecked}
              className={`
          w-[15px] h-[15px]
          border-2 border-[#c2c2c2] rounded-sm
          ${checked ? "bg-primary border-primary" : "bg-white"}
          relative
        `}
            >
              {checked && (
                <svg
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
                  className="black-fill lgBtn w-[327px] h-[48px] mt-[30px]"
                  onClick={(e) => handleSignIn(e)}
                >
                  로그인
                </button>
              </>
            )}
            <Link href={"/signup"}>
              <button className="beige lgBtn w-[327px] h-[48px] mt-[8px] flex items-center justify-center">
                계정 만들기
              </button>
            </Link>
          </div>

          <div className="mt-[32px] flex flex-col w-[327px] items-center gap-5 ">
            <div className="flex items-center justify-center gap-2 relative self-stretch w-full flex-{0_0_auto]">
              <Image alt="Vector" src={SNSVector} />
              <div className="relative w-fit mt-[-1.00px] caption text-center whitespace-nowrap text-#7e7b72">
                SNS 계정으로 가입하기
              </div>
              <Image alt="Vector" src={SNSVector} />
            </div>
            <div className="flex gap-[9px]">
              <button
                onClick={() => handleGoogleSignIn()}
                className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center"
              >
                <Image
                  src={KakaoLogo}
                  alt="Kakao Login"
                  width={32}
                  height={32}
                />
              </button>
              <button
                onClick={() => handleKaKaoSignIn()}
                className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center"
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
