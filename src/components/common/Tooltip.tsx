import Image from "next/image";

function Tooltip({
  message,
  onClose,
  position = "left",
}: {
  message: string;
  onClose: () => void;
  position: "right" | "left" | "max-left";
}) {
  const posi =
    (position === "right" && "right-[30px]") ||
    (position === "left" && "left-[30px]") ||
    (position === "max-left" && "left-[48px]");
  return (
    <div className="body-14-m relative inline-block w-[200px] rounded-12 bg-primary-50 py-[16px] pl-[16px] pr-[20px] text-left text-white">
      <span dangerouslySetInnerHTML={{ __html: message }} />
      <button
        className="absolute right-[2px] top-[2px] h-[24px] w-[24px]"
        onClick={(e) => {
          onClose();
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Image src={`/icons/XSmall.svg`} fill alt="close" />
      </button>
      <div className={`absolute -bottom-[10px] h-[11px] w-[9px] ${posi}`}>
        <Image src={`/icons/TootipArrow.svg`} alt="tooltip arrow" fill />
      </div>
    </div>
  );
}

export default Tooltip;
