"use client";

import { handleWheelScroll } from "@/utils/scroll";
import { useEffect, useRef, useState } from "react";

interface ScrollPickerProps {
  options: string[];
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  selectedItem: string | number | undefined;
  isWebCalender?: boolean;
}

const ScrollPicker = ({
  options,
  handleScroll,
  selectedItem,
  isWebCalender,
}: ScrollPickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const executionCount = useRef(0); // useRef를 사용하여 실행 횟수 추적
  const isScrolling = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(() => {
    // currentIndex 초기값을 selectedItem의 인덱스로 설정
    return selectedItem ? options.indexOf(selectedItem.toString()) : 0;
  });

  // 초기 스크롤 위치 설정을 위한 useEffect
  useEffect(() => {
    if (executionCount.current < 2) {
      if (containerRef.current && selectedItem !== undefined) {
        const selectedIndex = options.indexOf(selectedItem.toString());
        if (selectedIndex !== -1) {
          // 스크롤을 selectedItem에 맞게 설정
          containerRef.current.scrollTop = selectedIndex * 40;
        }
      }

      // 실행 횟수 증가
      executionCount.current += 1;
    }
  }, [selectedItem, options]);

  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      const wheelHandler = (e: WheelEvent) =>
        handleWheelScroll(e, {
          containerRef,
          currentIndex,
          setCurrentIndex,
          options,
          isScrolling,
          handleScroll,
        });

      element.addEventListener("wheel", wheelHandler, { passive: false });
      return () => {
        element.removeEventListener("wheel", wheelHandler);
      };
    }
  }, [currentIndex, options]);

  return (
    <div className="relative h-[140px] w-16">
      <div
        className={`pointer-events-none absolute ${
          options.length > 0 && options[0].length < 5
            ? "right-[14px] top-[50px] w-10"
            : "right-[8.5px] top-[50px] w-[50px]"
        } h-10 w-10 border-y-2`}
      />
      <div
        className="scrollbar-hide h-full snap-y snap-mandatory overflow-auto overscroll-contain py-[60px]"
        onScroll={handleScroll}
        ref={containerRef} // ref 연결
      >
        {options.map((item) => (
          <div
            key={item}
            className={`flex h-[40px] snap-center items-center justify-center ${
              selectedItem === item
                ? `mt:border-solid font-medium ${isWebCalender ? "text-white" : "text-black"}`
                : "text-gray-400"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollPicker;
