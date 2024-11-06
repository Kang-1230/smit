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
  <li>
    <Link href={href}>
      <div
        className={`rounded-full w-[52px] h-[52px] flex flex-col items-center justify-center gap-[1px] ${
          isActive ? "bg-white" : ""
        }`}
      >
        <Image
          src={`/icons/${isActive ? clickedIcon : icon}.svg`}
          width={19}
          height={19}
          alt={text}
        />
        <span
          className={`text-[11px] font-[500] text-${
            isActive ? "black" : "[#523D2E]"
          }`}
        >
          {text}
        </span>
      </div>
    </Link>
  </li>
);
