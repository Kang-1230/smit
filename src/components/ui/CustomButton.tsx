type Props = {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
};

export default function CustomButton({ text, onClick }: Props) {
  return (
    <button
      className={`bg-[#1E1E1E] text-white py-[4px] px-[12px] rounded-[14px] text-[14px] font-[00]`}
      style={{
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
