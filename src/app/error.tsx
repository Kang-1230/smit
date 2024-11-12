"use client";

import MyButton from "@/components/common/Button";
import Image from "next/image";
import { useEffect } from "react";

type Props = {
  error: Error;
  reset: () => void;
};

export default function ProductsError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Image src="/icons/Error.svg" alt="Error" width={160} height={146} />

      <h1 className="mt-3 text-base font-semibold text-secondary-300">
        일시적인 오류가 발생했습니다.
      </h1>

      <div className="text-center text-sm font-normal text-secondary-200">
        <p>서비스 이용에 불편을 드려 죄송합니다</p>
        <p>잠시 후 다시 이용해주세요.</p>
      </div>

      <MyButton style="black-fill" size="lg" onClick={() => reset()}>
        다시 시도하기
      </MyButton>
    </section>
  );
}
