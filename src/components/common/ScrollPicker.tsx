"use client";

interface ScrollPickerProps {
  options: string[];
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  selectedItem: string;
}

const ScrollPicker = ({
  options,
  handleScroll,
  selectedItem,
}: ScrollPickerProps) => {
  return (
    <div className="h-[140px] relative w-16">
      <div
        className={`absolute pointer-events-none  ${
          options.length > 0 && options[0].length < 5
            ? "w-10 top-[50px] right-[14px]"
            : "w-[50px] top-[50px] right-[8.5px]"
        }  h-10 w-10 border-y-2`}
      />
      <div
        className="h-full overflow-auto scrollbar-hide snap-y snap-mandatory overscroll-contain py-[60px]"
        onScroll={handleScroll}
      >
        {options.map((item) => (
          <div
            key={item}
            className={`h-[40px] flex items-center justify-center snap-center
        ${
          selectedItem === item
            ? "text-black font-medium mt:border-solid"
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
