import Image from "next/image";
import Link from "next/link";

type Props = {
  href: string;
  icon: string;
  clickedIcon: string;
  text: string;
  isActive: boolean;
};

export const MenuItem = ({
  href,
  icon,
  clickedIcon,
  text,
  isActive,
}: Props) => (
  <li className="h-full">
    <Link href={href}>
      <div
        className={`flex h-full w-[3.375rem] flex-col items-center justify-center gap-[1px] rounded-full p-[0.625rem] px-[0.875rem] md:w-auto md:flex-row md:gap-2 ${
          isActive ? "bg-white" : ""
        }`}
      >
        <Image
          src={`/icons/${isActive ? clickedIcon : icon}.svg`}
          width={17}
          height={17}
          alt={text}
        />
        <span
          className={`whitespace-nowrap text-[11px] font-medium md:pr-[0.125rem] md:text-base text-${
            isActive ? "black" : "[#523D2E]"
          }`}
        >
          {text}
        </span>
      </div>
    </Link>
  </li>
);
