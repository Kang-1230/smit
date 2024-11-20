"use client";

// import Loading from "@/components/common/Loading";
import MyButton from "@/components/common/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EventPage() {
  const router = useRouter();
  return (
    <div className="relative flex min-h-screen w-screen flex-col items-center justify-center bg-[#333]">
      <div className="relative w-full max-w-[1200px]">
        <MyButton
          style="orange-fill"
          size="lg"
          className="absolute left-1/2 top-[39%] z-10 -translate-x-1/2 -translate-y-1/2 rounded-24 px-5 py-3 text-base md:px-[3.75rem]"
          onClick={() => router.push("/")}
        >
          스터디 둘러보기
        </MyButton>
        <Image
          src="/images/EventPage.png"
          alt="event-page"
          width={1200}
          height={1200}
          className="hidden w-full object-contain md:block"
        />
        <Image
          src="/images/EventPageMobile.png"
          alt="event-page"
          width={1200}
          height={1200}
          className="w-full object-contain md:hidden"
        />
      </div>
    </div>
  );
}
