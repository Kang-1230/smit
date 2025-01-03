"use client";

import supabase from "../../utils/supabase/client";
import { useState } from "react";

import LoginIllust from "../../../public/icons/illust/LoginIllust.svg";

import Image from "next/image";
import BackButton from "@/components/common/BackButton";
import TitleInput from "@/components/common/TitleInput";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ValidateInput from "@/components/common/ValidateInput";
import useValidateNickname from "@/hooks/useValidateNickname";
import MyButton from "@/components/common/Button";
import { useRouter } from "next/navigation";

const signupSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(1, { message: "비밀번호를 입력해주세요" })
      .min(8, { message: "8자 이상의 비밀번호가 필요합니다" })
      .regex(/^(?=.*[a-zA-Z])(?=.*[*&^_~@])(?=.*[0-9]).{8,15}$/, {
        message: "영문, 숫자, 특수문자(*&^_~@)가 포함되어야 합니다",
      }),
    name: z.string().min(1, { message: "이름을 입력해주세요" }),
    verifiedPassword: z.string(),
    birthDate: z
      .string()
      .regex(/^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/),
  })
  .refine((data) => data.password === data.verifiedPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["verifiedPassword"],
  });

type SignUpFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [gender, setGender] = useState<"male" | "female">();
  const {
    userName,
    validateNickname,
    inputChangeHandler,
    nicknameStatus,
    switchErrorMessage,
  } = useValidateNickname();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    trigger, // 추가: 특정 필드의 유효성 검사를 수동으로 트리거하기 위해
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      name: "",
      password: "",
      birthDate: "",
      verifiedPassword: "",
    },
  });

  const password = watch("password");
  const verifiedPassword = watch("verifiedPassword");

  const onSubmit = async (formData: SignUpFormData) => {
    // 모든 필드의 유효성 검사를 한 번 더 실행
    const isFormValid = await trigger();
    if (!isFormValid) {
      return;
    }

    // 모든 필드 검증
    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.birthDate ||
      !userName
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    //------------------아래 회원가입 함수

    try {
      // auth 회원가입
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("User data is missing");

      try {
        // user 테이블에 정보 저장
        const { error: insertError } = await supabase
          .from("user")
          .update({
            user_name: formData.name,
            name: userName,
            birth_date: formData.birthDate,
          })
          .eq("id", authData.user.id)
          .select();

        if (insertError) {
          // 실패 시 auth 데이터 정리 시도
          await supabase.auth.signOut();
          throw new Error(
            `사용자 정보 저장에 실패했습니다: ${insertError.message}`,
          );
        }

        // 성공
        alert("회원가입이 완료되었습니다!");
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
      } catch (error) {
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
    <div className="md:item-center relative z-0 flex h-full w-full md:h-[1053px] md:justify-center md:gap-[11px]">
      <div className="z-0">
        <div className="absolute left-[163px] top-[169px] z-0 h-[165px] w-[165px] rounded-full bg-primary-50 opacity-80 md:left-1/2 md:h-[215px] md:w-[215px] md:-translate-x-1/2" />
      </div>
      <div className="z-10 flex h-full w-full flex-col items-center rounded-[20px] bg-[rgba(246,242,239,0.6)] backdrop-blur-xl md:my-[20px] md:flex md:h-[1013px] md:w-[652px] md:justify-center md:shadow-[inset_-4px_0px_8px_0px_rgba(255,255,255,0.25)]">
        <header className="fixed top-0 z-50 mb-[-1.00px] flex h-[43px] w-full bg-[#f6f6f4] md:hidden">
          <BackButton
            color="black"
            className="ml-[14px] flex h-[44px] w-[44px] items-center justify-center"
          />

          <div className="body-16-s absolute top-[10.96px] flex h-[22px] w-full justify-center overflow-hidden text-center">
            회원가입
          </div>
        </header>
        <div className="w-full max-w-[400px] px-6">
          <div className="title-24-b mb-[36px] hidden text-start text-black md:block">
            회원가입
          </div>

          <div onSubmit={handleSubmit(onSubmit)}>
            <form className="mt-[55px] flex items-center md:justify-center">
              <main className="flex flex-col gap-y-[20px]">
                <div className="-mb-[20px]">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TitleInput
                        onBlur={field.onBlur}
                        placeholder="이메일 주소를 입력해주세요"
                        title="이메일"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.email ? true : false}
                      />
                    )}
                  />
                </div>

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TitleInput
                      onBlur={() => {
                        field.onBlur();
                        trigger("password");
                        trigger("verifiedPassword");
                      }}
                      placeholder="비밀번호를 입력해주세요"
                      title="비밀번호"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.password?.message}
                      useEyes={true}
                      caption="영문, 숫자, 특수문자(* & ^ _ ~) 포함"
                    />
                  )}
                />

                <Controller
                  name="verifiedPassword"
                  control={control}
                  render={({ field }) => (
                    <TitleInput
                      onBlur={() => {
                        field.onBlur();
                        trigger("verifiedPassword");
                      }}
                      placeholder="비밀번호를 한 번 더 입력해주세요"
                      title="비밀번호 확인"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.verifiedPassword?.message}
                      useEyes={true}
                      caption={
                        password === verifiedPassword &&
                        verifiedPassword &&
                        password
                          ? "비밀번호가 일치합니다"
                          : "비밀번호가 일치하지 않습니다"
                      }
                    />
                  )}
                />
                <div className="-mb-[20px]">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TitleInput
                        onBlur={() => {
                          field.onBlur();
                          trigger("name");
                        }}
                        placeholder="성함을 적어주세요"
                        title="이름"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.name ? true : false}
                      />
                    )}
                  />
                </div>

                <ValidateInput
                  placeholder="스밋에서 활동할 닉네임을 적어주세요"
                  title="닉네임"
                  value={userName}
                  onChange={inputChangeHandler}
                  onClick={validateNickname}
                  caption="15자 이내로 적어주세요"
                  error={
                    !userName && nicknameStatus !== "initial"
                      ? "닉네임을 입력하세요"
                      : switchErrorMessage()
                  }
                  success={
                    nicknameStatus === "available"
                      ? "사용 가능한 닉네임 입니다."
                      : undefined
                  }
                />

                <div className="w-full">
                  <div className="item-end flex w-full flex-[0_0_auto] gap-3 self-stretch">
                    <Controller
                      name="birthDate"
                      control={control}
                      render={({ field }) => (
                        <TitleInput
                          onBlur={() => {
                            field.onBlur();
                            trigger("birthDate");
                          }}
                          placeholder="YYYYMMDD"
                          title="생년월일"
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.birthDate ? true : false}
                        />
                      )}
                    />
                    <div className="inline-flex w-[116px] items-center gap-3 px-1 py-2.5">
                      <label className="relative inline-flex items-center gap-1">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={gender === "male"}
                          onChange={(e) => setGender(e.target.value as "male")}
                          className="relative h-[20px] w-[20px] cursor-pointer appearance-none rounded-full border border-secondary-300 bg-white checked:border-secondary-700 checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[12px] checked:after:w-[12px] checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:rounded-full checked:after:bg-secondary-700"
                        />
                        <p className="body-14-r text-#666666 relative mt-[-0.50px] w-fit whitespace-nowrap">
                          남자
                        </p>
                      </label>
                      <label className="relative inline-flex flex-[0_0_auto] items-center gap-1">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={gender === "female"}
                          onChange={(e) =>
                            setGender(e.target.value as "female")
                          }
                          className="relative h-[20px] w-[20px] cursor-pointer appearance-none rounded-full border border-secondary-300 bg-white checked:border-secondary-700 checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[12px] checked:after:w-[12px] checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:rounded-full checked:after:bg-secondary-700"
                        />
                        <p className="body-14-r text-#666666 relative mt-[-0.50px] w-fit whitespace-nowrap">
                          여자
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
                <MyButton
                  style="black-fill"
                  size="lg"
                  type="submit"
                  className="hidden w-full md:block"
                  disabled={!isValid && nicknameStatus !== "available"}
                >
                  가입하기
                </MyButton>
              </main>
              <div className="fixed bottom-0 left-0 flex h-[72px] w-full items-center justify-center border-t border-[#e6e6e6] bg-white px-6 py-4 md:hidden">
                <MyButton
                  style="black-fill"
                  size="lg"
                  type="submit"
                  className="w-full"
                  disabled={!isValid && nicknameStatus !== "available"}
                >
                  가입하기
                </MyButton>
              </div>
            </form>
          </div>
        </div>
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
