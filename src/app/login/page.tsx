"use client";

import supabase from "../../utils/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import KakaoLogo from "../../../public/icons/Kakao.svg";
import GoogleLogo from "../../../public/icons/Google.svg";
import SmitLogo from "../../../public/icons/SmitLogo.svg";
import LoginIllust from "../../../public/icons/illust/LoginIllust.svg";
import Image from "next/image";
import { Checkbox } from "@headlessui/react";
import BackButton from "@/components/common/BackButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import RoundLoginInput from "@/components/common/RoundLoginInput";

const loginSchema = z.object({
  email: z.string().email({ message: "이메일 형식이 필요합니다." }),
  password: z
    .string()
    .min(1, { message: "비밀번호를 입력해주세요" })
    .min(6, { message: "8자 이상의 비밀번호가 필요합니다" })
    .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/, {
      message:
        "영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.",
    }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    };

    getUser();
  }, []);

  const onSubmit = async (formData: LoginFormData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      console.error("SignIn Error :", error);
      alert("이메일과 비밀번호를 확인하세요");
    } else {
      alert("로그인 되었습니다.");
      router.push("/event2");
      // router.refresh();
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
      if (data.url) {
        window.location.href = data.url;
      }
    } else if (error) {
      throw error;
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

    if (error) {
      console.log("kakaoError");
    }

    if (data.url) {
      window.location.href = data.url;
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { error: logoutError } = await supabase.auth.signOut();
    if (logoutError) {
      console.error("SignUp Error :", logoutError);
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="md:item-center relative z-0 flex h-full w-full md:h-[1053px] md:justify-center md:gap-[11px]">
      <div className="z-0">
        <div className="absolute left-[163px] top-[169px] z-0 h-[165px] w-[165px] rounded-full bg-primary-50 opacity-80 md:left-1/2 md:h-[215px] md:w-[215px] md:-translate-x-1/2" />
      </div>
      <div className="z-10 h-full w-full items-center justify-center rounded-[20px] bg-[rgba(246,242,239,0.6)] backdrop-blur-xl md:my-[20px] md:flex md:h-[1013px] md:w-[652px] md:shadow-[inset_-4px_0px_8px_0px_rgba(255,255,255,0.25)]">
        <header className="z-50 flex md:hidden">
          <BackButton
            color="black"
            className="ml-[14px] flex h-[44px] w-[44px] items-center justify-center"
          />
        </header>
        <main className="flex w-full flex-col items-center px-6 pt-16 md:max-w-[448px]">
          <section className="mb-8 flex w-full flex-col items-start">
            <Link href={"/"}>
              <Image
                className="z-10 !h-[63,42px] !w-[152px]"
                src={SmitLogo}
                alt="SmitLogo"
              />
            </Link>

            <div className="mt-2 pl-2">
              <h1 className="body-16-r">스밋에서 모여서 함께 공부하자</h1>
            </div>
          </section>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-2"
          >
            <div className="item-start relative flex w-full flex-[0_0_auto] flex-col">
              <input
                placeholder="이메일"
                className="border-inset body-14-r !mt-[12px] h-[48px] !w-full rounded-[24px] border-[1px] px-4 py-3 text-secondary-900 placeholder:text-secondary-400 focus:border-secondary-600 focus:bg-white focus:outline-none"
                {...register("email")}
              />

              {errors.email?.message && (
                <div className="ml-3 mt-[8px] h-[12px]">
                  <p className="caption text-alarm-red">
                    {errors.email?.message.toString()}
                  </p>
                </div>
              )}
              <div className="relative">
                <RoundLoginInput
                  placeholder="비밀번호"
                  useEyes
                  classname="!w-full !mt-[12px] rounded-[24px]"
                  // value = {{...register("password")}}
                  register={register}
                  error={errors.password?.message}
                />
              </div>
            </div>

            <div className="!-pt-[10px] relative inline-flex items-center gap-1 py-0 pl-3 pr-0">
              <Checkbox
                checked={checked}
                onChange={setChecked}
                className={`h-[15px] w-[15px] rounded-[2px] border-2 border-[#c2c2c2] ${checked ? "!border-primary-50 !bg-primary-50" : "!bg-white"} ![&>span>svg]:text-black relative`}
              >
                {checked && (
                  <svg
                    className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 8.5 L6 10.5 L11.5 4.5"
                      stroke="black"
                      strokeWidth="1.5"
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
                    className="black-fill lgBtn mt-[30px] h-[48px] w-full rounded-[24px]"
                    type="submit"
                  >
                    로그인
                  </button>
                </>
              )}
              <Link href={"/signup"}>
                <button className="beige lgBtn mt-[8px] flex h-[48px] w-full items-center justify-center rounded-[24px]">
                  계정 만들기
                </button>
              </Link>
            </div>
            <div className="mt-[32px] flex w-full flex-col items-center gap-5">
              <div className="relative flex w-full items-center justify-center">
                <div className="mx- absolute h-[0.5px] w-full bg-[#B1AEA5]" />
                <div className="relative z-10 text-center">
                  <span className="caption translate-y-[-50%] bg-[rgba(246,242,239,1)] px-[8px] text-[#7e7b72]">
                    SNS 계정으로 가입하기
                  </span>
                </div>
              </div>
              <div className="flex gap-[9px]">
                <button
                  type="button"
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
                  type="button"
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
          </form>
        </main>
      </div>
      <div className="z-20 hidden h-[665px] w-[569px] md:block">
        <Image
          src={LoginIllust}
          alt="LoginIllust"
          className="mt-[368px] h-full w-full"
          width={569}
          height={665}
        />
      </div>
    </div>
  );
}
