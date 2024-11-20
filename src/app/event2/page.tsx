"use client";

import MyButton from "@/components/common/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full overflow-auto">
      <MyButton
        style="orange-fill"
        size="lg"
        className="absolute bottom-[8.5%] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-24 px-[3.75rem] py-[0.5rem] text-base md:bottom-[15.5%]"
        onClick={() => router.push("/")}
      >
        스터디 둘러보기
      </MyButton>
      <Image
        src="/images/EventPage2.png"
        alt="event-page"
        width={1920}
        height={7595}
        className="hidden md:block"
      />
      <Image
        src="/images/EventPage2Mobile.png"
        alt="event-page"
        width={800}
        height={7595}
        className="md:hidden"
      />
    </div>
  );
}
