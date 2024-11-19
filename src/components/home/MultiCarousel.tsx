"use client";

import Image from "next/image";
import Carousel from "react-multi-carousel";
import { ArrowProps, DotProps } from "react-multi-carousel/lib/types";
import "react-multi-carousel/lib/styles.css";

const CustomLeftButton = ({ onClick }: ArrowProps) => (
  <button
    className="absolute left-3 z-20 md:bottom-8 md:left-auto md:right-[7rem] xl:right-[23%]"
    onClick={onClick}
  >
    <Image
      src="/icons/CarouselLeftArrow.svg"
      width={32}
      height={32}
      alt="customLeftArrow"
    />
  </button>
);

const CustomRightButton = ({ onClick }: ArrowProps) => (
  <button
    className="absolute right-3 z-20 md:bottom-8 md:right-[1.5rem] xl:right-[17%]"
    onClick={onClick}
  >
    <Image
      src="/icons/CarouselRightArrow.svg"
      width={32}
      height={32}
      alt="customRightArrow"
    />
  </button>
);

const CustomDot = ({ index, active }: DotProps) => {
  return (
    <li
      className={`absolute bottom-4 w-full md:bottom-[2.375rem] ${active ? "" : "hidden"} xl:hidden`}
    >
      <section className="mx-6 flex items-center gap-2 md:gap-20 xl:mx-auto xl:max-w-[80rem] xl:gap-28">
        <div className="h-[0.0625rem] w-full bg-[#808080]">
          <div
            className={`h-full bg-white`}
            style={{
              width: `${((Number(index) + 1) / 3) * 100}%`,
            }}
          ></div>
        </div>
        <div className="flex items-center gap-[0.25rem] text-[0.5625rem] font-medium text-white md:mr-[2.9rem] md:text-sm xl:mr-[6%]">
          <div>{Number(index) + 1}</div>
          <div className="text-secondary-300">/</div>
          <div>3</div>
        </div>
      </section>
    </li>
  );
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

type Props = {
  children: React.ReactNode;
};
export default function MultiCarousel({ children }: Props) {
  return (
    <div className="h-[29.5rem] w-full bg-secondary-200 md:h-[50rem]">
      <Carousel
        infinite
        autoPlay
        responsive={responsive}
        showDots={true}
        customLeftArrow={<CustomLeftButton />}
        customRightArrow={<CustomRightButton />}
        renderButtonGroupOutside
        customDot={<CustomDot />}
        dotListClass="custom-dot-list-style"
      >
        {children}
      </Carousel>
    </div>
  );
}
