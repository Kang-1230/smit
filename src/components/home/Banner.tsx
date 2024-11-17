import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  url: string;
  num: number;
  isEventPage: boolean;
};

const splitTitle = (title: string) => {
  return title.split("\n").map((str, index) => (
    <span key={index}>
      {str}
      <br />
    </span>
  ));
};

export default function Banner({ title, url, isEventPage, num = 1 }: Props) {
  return (
    <section
      className={`flex h-[472px] flex-col justify-end bg-[url("/images/BannerImage1.png")] bg-cover bg-center px-6 py-8 text-white`}
      style={{
        backgroundImage: `url("/images/BannerImage${num}.png")`,
      }}
    >
      <Link href={url}>
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-opacity-35 bg-gradient-to-t from-[rgba(0,0,0,0.6)] via-transparent"></div>
        {/* <div className="absolute inset-0 bg-opacity-35 bg-gradient-to-br from-[rgba(34,34,34,0.6)] to-transparent"></div> */}

        <div className="relative z-10">
          <div className="mb-4 px-2">
            {isEventPage && <h2 className="text-xs font-medium">EVENT</h2>}
            <h1 className="text-2xl font-semibold">{splitTitle(title)}</h1>
          </div>

          <button className="flex items-center gap-3 rounded-[26px] bg-white bg-opacity-35 py-1 pl-5 pr-1 text-base font-light text-white backdrop-blur-md">
            <div className="w-[4.75rem] text-left">바로가기</div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary-900">
              <Image
                src={`/icons/ArrowTopRight.svg`}
                width={24}
                height={24}
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
