type Props = {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  size?: "small" | "medium" | "big";
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
  }

  return (
    <button
      className={`text-white py-[4px] px-[12px] rounded-[14px] text-[14px] font-[0] ${sizeClasses} flex items-center`}
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
