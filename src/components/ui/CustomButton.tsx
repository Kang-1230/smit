type Props = {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  size?: "small" | "medium" | "big" | "webBadge";
  bgColor?: string;
};

export default function CustomButton({
  text,
  onClick,
  size = "big",
  bgColor = "#1E1E1E",
}: Props) {
  let sizeClasses = "py-1 px-3 text-[14px] h-7";

  if (size === "medium") {
    sizeClasses = "py-1 px-2 text-xs h-5";
  } else if (size === "small") {
    sizeClasses = "py-1 px-2 text-xs";
  } else if (size === "webBadge") {
    sizeClasses = "py-1 px-[10px] text-[14px] h-[27px]";
  }

  return (
    <button
      className={`rounded-[14px] px-[12px] py-[4px] text-[14px] font-[0] text-white ${sizeClasses} flex items-center`}
      style={{
        backgroundColor: bgColor,
        lineHeight: "135%",
        letterSpacing: "-0.28px",
        fontStyle: "normal",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
