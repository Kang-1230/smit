"use client";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import { ArrowProps } from "react-multi-carousel/lib/types";
import "react-multi-carousel/lib/styles.css";

const CustomLeftButton = ({ onClick }: ArrowProps) => (
  <button className="absolute left-3" onClick={onClick}>
    <Image
      src="/icons/CarouselLeftArrow.svg"
      width={32}
      height={32}
      alt="customLeftArrow"
    />
  </button>
);

const CustomRightButton = ({ onClick }: ArrowProps) => (
  <button className="absolute right-3" onClick={onClick}>
    <Image
      src="/icons/CarouselRightArrow.svg"
      width={32}
      height={32}
      alt="customRightArrow"
    />
  </button>
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
  );
}
