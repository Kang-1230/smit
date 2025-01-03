"use client";

const ModalOverlay = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={(e) => {
        onClick();
        e.stopPropagation();
        e.preventDefault();
      }}
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/70"
    >
      <div
        className="flex h-auto w-[327px] flex-col items-center justify-center rounded-20 bg-white px-[20px] py-[32px] text-center text-secondary-900 md:w-[440px] md:px-[52px] md:py-[44px]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalOverlay;
