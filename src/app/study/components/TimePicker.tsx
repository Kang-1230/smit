interface TimePickerProps {
  time: string[];
  handleTimeScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  selectedTime: string;
}

const TimePicker = ({
  time,
  handleTimeScroll,
  selectedTime,
}: TimePickerProps) => {
  return (
    <div className="h-[140px] relative w-16">
      <div
        className={`absolute pointer-events-none  ${
          time[0].length === 2
            ? "w-10 top-[50px] right-[14px]"
            : "w-[50px] top-[50px] right-[8.5px]"
        }  h-10 w-10 border-y-2`}
      />
      <div
        className="h-full overflow-auto scrollbar-hide snap-y snap-mandatory overscroll-contain py-[60px]"
        onScroll={handleTimeScroll}
      >
        {time.map((t) => (
          <div
            key={t}
            className={`h-[40px] flex items-center justify-center snap-center
        ${
          selectedTime === t
            ? "text-black font-medium mt:border-solid"
            : "text-gray-400"
        }`}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimePicker;
