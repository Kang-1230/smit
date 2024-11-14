"use client";

import supabase from "../../utils/supabase/client";
import { useState } from "react";
import RectangleSighUpBack from "../../../public/images/RectangleLoginBack.png";
import Image from "next/image";
import BackButton from "@/components/common/BackButton";
import TitleInput from "@/components/common/TitleInput";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ValidateInput from "@/components/common/ValidateInput";
import useValidateNickname from "@/hooks/useValidateNickname";
import MyButton from "@/components/common/Button";

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

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    trigger, // 추가: 특정 필드의 유효성 검사를 수동으로 트리거하기 위해
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange", // 추가: 입력값이 변경될 때마다 유효성 검사 실행
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
          .insert({
            id: authData.user.id,
            user_name: formData.name,
            name: userName,
            birth_date: formData.birthDate,
            email: formData.email,
            study_time: 0,
          })
          .select();

        if (insertError) {
          await supabase.auth.signOut();
          throw new Error(
            `사용자 정보 저장에 실패했습니다: ${insertError.message}`,
          );
        }

        alert("회원가입이 완료되었습니다!");
        await supabase.auth.signOut();
        window.location.href = "/login";
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
    <div className="relative flex h-full w-full flex-col items-center bg-[#f6f6f4]">
      <div className="absolute left-1/2 top-56 h-[165px] w-[165px] -translate-x-1/2 rounded-[82.5px] bg-primary-50" />
      <Image
        className="absolute z-0 h-full w-full backdrop-blur-xl"
        alt="Rectangle"
        src={RectangleSighUpBack}
      />
      <div className="relative mb-[-1.00px] h-[43px] w-full self-stretch bg-[#f6f6f4]">
        <div className="!relative left-[27px] top-[10px] !h-6 !w-6">
          <BackButton color="black" />
        </div>

        <div className="body-16-s absolute left-[99px] top-[10.96px] h-[22px] w-[176px] overflow-hidden text-center">
          회원가입
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="h-[690px] w-full">
        <div className="relative mt-[12px] flex items-center justify-center">
          <section className="flex flex-col gap-y-[20px]">
            <div className="-mb-[20px]">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TitleInput
                    placeholder="이메일 주소를 입력해주세요"
                    title="이메일"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger("email"); // 이메일 필드 유효성 검사 트리거
                    }}
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
                  placeholder="비밀번호를 입력해주세요"
                  title="비밀번호"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("password"); // 비밀번호 필드 유효성 검사 트리거
                    trigger("verifiedPassword"); // 비밀번호 확인 필드도 함께 검사
                  }}
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
                  placeholder="비밀번호를 한 번 더 입력해주세요"
                  title="비밀번호 확인"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("verifiedPassword"); // 비밀번호 확인 필드 유효성 검사 트리거
                  }}
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
                    placeholder="성함을 적어주세요"
                    title="이름"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger("name"); // 이름 필드 유효성 검사 트리거
                    }}
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
              <div className="item-end relative flex w-full flex-[0_0_auto] gap-3 self-stretch">
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field }) => (
                    <TitleInput
                      placeholder="YYYYMMDD"
                      title="생년월일"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        trigger("birthDate"); // 생년월일 필드 유효성 검사 트리거
                      }}
                      error={errors.birthDate ? true : false}
                    />
                  )}
                />
                <div className="relative inline-flex w-[116px] flex-[0_0_auto] items-center gap-3 px-1 py-2.5">
                  <label className="relative inline-flex flex-[0_0_auto] items-center gap-1">
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
                      onChange={(e) => setGender(e.target.value as "female")}
                      className="relative h-[20px] w-[20px] cursor-pointer appearance-none rounded-full border border-secondary-300 bg-white checked:border-secondary-700 checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[12px] checked:after:w-[12px] checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:rounded-full checked:after:bg-secondary-700"
                    />
                    <p className="body-14-r text-#666666 relative mt-[-0.50px] w-fit whitespace-nowrap">
                      여자
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </section>
          <div className="fixed bottom-0 left-0 flex h-[72px] w-full items-center justify-center border-t border-[#e6e6e6] bg-white px-6 py-4">
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
        </div>
      </form>
    </div>
  );
}
