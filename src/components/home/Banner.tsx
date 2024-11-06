import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  link: string;
};

export default function Banner({ title, link }: Props) {
  return (
    <section className="bg-[url('/images/BannerImage.jpg')] bg-cover bg-center py-8 px-6 h-[472px] text-white flex flex-col justify-end">
      <Link href={link}>
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-[black] bg-opacity-45"></div>

        <div className="z-10 relative">
          <div className="px-2 mb-4">
            <h2 className="font-medium text-xs">EVENT</h2>
            <h1 className="font-semibold text-2xl">{title}</h1>
          </div>

          <button className="bg-white text-white rounded-24 pl-5 pr-1 py-1 flex font-light items-center gap-11 text-base bg-opacity-35 backdrop-blur-sm">
            바로가기
            <div className="rounded-full bg-secondary-900 w-11 h-11 flex justify-center items-center">
              <Image
                src={`/icons/ArrowTopRight.svg`}
                width={20}
                height={20}
                alt="user"
                className="text-secondary-500"
              />
            </div>
          </button>
        </div>
      </Link>
    </section>
  );
}
