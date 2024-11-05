"use client";

const RankingModalOverlay = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="fixed inset-0 flex items-center justify-center w-full h-full bg-black/70 z-50"
    >
      <div
        className="h-auto bg-white rounded-20 flex items-center justify-center relative mx-[24px] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <button className="absolute top-3 right-5 text-xl" onClick={onClick}>
          x
        </button> */}

        {children}
      </div>
    </div>
  );
};

export default RankingModalOverlay;
