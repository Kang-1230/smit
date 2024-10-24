"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

export const page = () => {
  const params = useSearchParams();
  const id = params.get("solo");

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <h2>대표 이미지</h2>
        <Image
          src="/profile.png"
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>
    </div>
  );
};

export default page;
