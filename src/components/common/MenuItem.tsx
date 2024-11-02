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
        className={`rounded-full w-16 h-16 flex flex-col items-center justify-center gap-[0.1rem] ${
          isActive ? "bg-white" : ""
        }`}
      >
        <Image
          src={`/icons/${isActive ? clickedIcon : icon}.svg`}
          width={20}
          height={20}
          alt={text}
        />
        <span
          className={`text-[0.8rem] text-${isActive ? "black" : "[#523D2E]"}`}
        >
          {text}
        </span>
      </div>
    </Link>
  </li>
);
