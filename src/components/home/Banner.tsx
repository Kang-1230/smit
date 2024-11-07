import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  link: string;
};

export default function Banner({ title, link }: Props) {
  return (
    <section className="flex h-[472px] flex-col justify-end bg-[url('/images/BannerImage.jpg')] bg-cover bg-center px-6 py-8 text-white">
      <Link href={link}>
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-opacity-35 bg-gradient-to-t from-[#010101] via-transparent"></div>
        <div className="absolute inset-0 bg-opacity-35 bg-gradient-to-br from-[rgba(34,34,34,0.6)] to-transparent"></div>

        <div className="relative z-10">
          <div className="mb-4 px-2">
            <h2 className="text-xs font-medium">EVENT</h2>
            <h1 className="text-2xl font-semibold">{title}</h1>
          </div>

          <button className="flex items-center gap-11 rounded-24 bg-white bg-opacity-35 py-1 pl-5 pr-1 text-base font-light text-white backdrop-blur-sm">
            바로가기
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary-900">
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
