export default function Loading() {
  const text = "LOADING...";
  const textArr = text.split("");

  return (
    <div className="flex flex-col items-center justify-center gap-9">
      {/* 시계 */}
      <div className="clock absolute top-[40%] h-[52px] w-[52px] rotate-45">
        {Array.from({ length: 12 }, (_, index) => (
          <span
            className="absolute h-full w-full"
            key={index}
            style={{ "--i": index + 1 } as React.CSSProperties}
          />
        ))}
      </div>

      {/* 시침 */}
      <div className="hand absolute top-[40%]"></div>

      {/* 문구 */}
      <div
        className="animate-loading absolute top-[40%] flex gap-[0.05rem] pt-[6.25rem] font-pretendard text-sm font-normal text-secondary-200"
        style={{ lineHeight: "135%", fontStyle: "normal" }}
      >
        {textArr.map((item, idx) => (
          <span
            className={`animate-loading delay-${idx * 100} ${idx === 0 ? "text-secondary-900" : ""}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
