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

const signupSchema = z
  .object({
    email: z.string().email({ message: "이메일 형식이 필요합니다." }),
    password: z
      .string()
      .min(1, { message: "비밀번호를 입력해주세요" })
      .min(8, { message: "8자 이상의 비밀번호가 필요합니다" })
      .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/, {
        message:
          "영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.",
      }),
    nickname: z.string().min(1, { message: "닉네임을 입력해주세요" }),
    name: z.string().min(1, { message: "이름을 입력해주세요" }),
    verifiedPassword: z
      .string()
      .min(1, { message: "비밀번호 확인을 입력해주세요" }),
    birthDate: z
      .string()
      .regex(/^\d{4}\.\d{2}\.\d{2}$/, "날짜는 YYYY.MM.DD 형식이어야 합니다"),
  })
  .refine((data) => data.password === data.verifiedPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["verifiedPassword"],
  });

type SignUpFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [gender, setGender] = useState<"male" | "female">();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
  });

  const preventDuplicationNickName = async (formDataNickname: string) => {
    const { data: existingUser } = await supabase
      .from("user")
      .select("name")
      .eq("name", formDataNickname)
      .single();

    if (existingUser) {
      alert("이미 존재하는 닉네임입니다.");
      return false;
    }

    alert("사용 가능한 닉네임입니다.");
    return true;
  };

  const onSubmit = async (formData: SignUpFormData) => {
    if (formData.verifiedPassword) {
      if (formData.verifiedPassword !== formData.password) {
        return <p>{errors.password?.message}</p>;
      }
    }

    // 모든 필드 검증
    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.nickname ||
      !formData.birthDate
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

      console.log("authdata:", authData);

      if (authError) throw authError;
      if (!authData.user) throw new Error("User data is missing");

      try {
        // user 테이블에 정보 저장
        const { error: insertError } = await supabase
          .from("user")
          .insert({
            id: authData.user.id,
            user_name: formData.name,
            name: formData.nickname,
            birth_date: formData.birthDate,
            email: formData.email,
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
        <div className="relative flex h-full items-center justify-center">
          <section className="absolute left-1/2 top-[12px] z-10 w-full max-w-[327px] -translate-x-1/2">
            <Controller
              name="email"
              control={control} // useForm에서 control 가져오기
              render={({ field }) => (
                <TitleInput
                  placeholder="이메일 주소를 입력해주세요"
                  title="이메일"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.email?.message}
                />
              )}
            />

            <div className="relative mb-[20px]">
              <Controller
                name="password"
                control={control} // useForm에서 control 가져오기
                render={({ field }) => (
                  <TitleInput
                    placeholder="비밀번호를 입력해주세요"
                    title="비밀번호"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.password?.message}
                    useEyes
                  />
                )}
              />
              {!errors.password?.message && (
                <div className="caption absolute ml-[12px] mt-[-12px] text-secondary-500">
                  영문,숫자,특수문자(*&^_-)포함
                </div>
              )}
            </div>
            <div>
              <Controller
                name="verifiedPassword"
                control={control} // useForm에서 control 가져오기
                render={({ field }) => (
                  <TitleInput
                    placeholder="비밀번호를 한 번 더 입력해주세요"
                    title="비밀번호 확인"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="name"
                control={control} // useForm에서 control 가져오기
                render={({ field }) => (
                  <TitleInput
                    placeholder="성함을 적어주세요"
                    title="이름"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="nickname"
                control={control} // useForm에서 control 가져오기
                render={({ field }) => (
                  <ValidateInput
                    placeholder="스밋에서 활동할 닉네임을 적어주세요"
                    title="닉네임"
                    value={field.value}
                    onChange={field.onChange}
                    onClick={() => preventDuplicationNickName(field.value)}
                    error={errors.nickname?.message}
                  />
                )}
              />
            </div>
            <div className="w-full">
              <div className="item-end relative flex w-full flex-[0_0_auto] gap-3 self-stretch">
                <Controller
                  name="birthDate"
                  control={control} // useForm에서 control 가져오기
                  render={({ field }) => (
                    <TitleInput
                      placeholder="YYYY.MM.DD"
                      title="생년월일"
                      value={field.value}
                      onChange={field.onChange}
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
            <div className="black-fill h-[48px] w-[327px] rounded-[24px]">
              <button
                type="submit"
                className="body-16-s h-[44px] w-full text-white"
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
