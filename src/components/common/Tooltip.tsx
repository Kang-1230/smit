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
    <div className="body-14-m relative inline-block w-[200px] rounded-12 bg-primary-50 px-[20px] py-[16px] text-white">
      <span dangerouslySetInnerHTML={{ __html: message }} />
      <button
        className="absolute right-[2px] top-[2px] h-[24px] w-[24px]"
        onClick={(e) => {
          onClose();
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Image src={`/icons/Xsmall.svg`} fill alt="close" />
      </button>
      <div className={`absolute -bottom-[10px] h-[11px] w-[9px] ${posi}`}>
        <Image src={`/icons/TootipArrow.svg`} alt="tooltip arrow" fill />
      </div>
    </div>
  );
}

export default Tooltip;
