import Image from "next/image";

type Props = {
  text: string;
  color: "white" | "black" | "gray";
};

export default function Filter({ text, color }: Props) {
  const styleFilter = {
    white: "text-secondary-700 bg-white",
    black: "text-white bg-secondary-900",
    gray: "text-secondary-700 bg-secondary-50",
  };

  return (
    <button
      className={`rounded-16 py-1 pl-3 pr-1 text-sm font-normal ${styleFilter[color]} flex gap-1`}
    >
      {text}
      <Image
        src={`/icons/ArrowBottom${color === "black" ? "white" : "black"}.svg`}
        alt="heart"
        width={20}
        height={20}
      />
    </button>
  );
}
