import { useRef, useState } from "react";

const useCarousel = (itemWidth: number, length: number | undefined) => {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 인덱스
  const trackRef = useRef<HTMLDivElement | null>(null); // 캐러셀 트랙 참조

  const handleNext = () => {
    if (trackRef.current && length && currentIndex < length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      trackRef.current.style.transform = `translateX(-${(currentIndex + 1) * itemWidth}px)`;
    }
  };

  const handlePrev = () => {
    if (trackRef.current && length && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      trackRef.current.style.transform = `translateX(-${(currentIndex - 1) * itemWidth}px)`;
    }
  };
  return { handleNext, handlePrev, trackRef };
};

export default useCarousel;
