"use client";

import Image from "next/image";
import Carousel from "react-multi-carousel";
import { ArrowProps } from "react-multi-carousel/lib/types";
import "react-multi-carousel/lib/styles.css";

const CustomLeftButton = ({ onClick }: ArrowProps) => (
  <div className="absolute left-1/2 h-full w-full max-w-[83rem] -translate-x-1/2">
    <button
      className="lg: absolute left-3 md:bottom-8 md:left-auto md:right-[6.5rem]"
      onClick={onClick}
    >
      <Image
        src="/icons/CarouselLeftArrow.svg"
        width={32}
        height={32}
        alt="customLeftArrow"
      />
    </button>
  </div>
);

const CustomRightButton = ({ onClick }: ArrowProps) => (
  <div className="absolute left-1/2 h-full w-full max-w-[83rem] -translate-x-1/2">
    <button
      className="absolute right-3 md:bottom-8 md:right-8"
      onClick={onClick}
    >
      <Image
        src="/icons/CarouselRightArrow.svg"
        width={32}
        height={32}
        alt="customRightArrow"
      />
    </button>
  </div>
);
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
        customLeftArrow={<CustomLeftButton />}
        customRightArrow={<CustomRightButton />}
        renderButtonGroupOutside
      >
        {children}
      </Carousel>
    </div>
  );
}
