"use client";

import { useEffect, useRef } from "react";

interface ScrollPickerProps {
  options: string[];
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  selectedItem: string | number | undefined;
}

const ScrollPicker = ({
  options,
  handleScroll,
  selectedItem,
}: ScrollPickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const executionCount = useRef(0); // useRef를 사용하여 실행 횟수 추적

  useEffect(() => {
    // 실행 횟수가 5번 미만일 때만 실행
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
  }, [selectedItem, options]); // selectedItem, options가 변경될 때만 실행

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
                ? "mt:border-solid font-medium text-black"
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
