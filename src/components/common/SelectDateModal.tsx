"use client";

import MyButton from "./Button";

interface DateModalProps {
  handleClose: () => void;
  handleConfirm: () => void;
  selectedDate: string;
  children: React.ReactNode;
  className?: string;
}

const SelectDateModal = ({
  handleClose,
  handleConfirm,
  selectedDate,
  children,
  className,
}: DateModalProps) => {
  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex w-full items-end justify-center bg-black/70 md:mx-auto md:max-w-[1280px] md:items-center md:bg-transparent"
    >
      <div
        className={`w-full animate-slide-up flex-col items-center justify-center rounded-t-2xl bg-white md:absolute ${className ? className : "md:right-0 md:top-[323px]"} md:h-[308px] md:w-[375px] md:rounded-2xl md:shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <section className="w-full px-6">
          <p className="title-20-m mt-9 text-center text-black">
            {selectedDate}
          </p>
          <hr className="my-4 md:m-4" />
          <div className="flex items-center justify-center">{children}</div>
        </section>
        <div className="mt-4 flex items-center justify-center gap-2 border-t px-6 py-[10px] text-white md:mb-5 md:mt-0">
          <MyButton
            style="black-fill"
            size="lg"
            onClick={handleConfirm}
            className="body-16-s flex-1 rounded-3xl bg-secondary-900 px-4 py-2 text-white"
          >
            적용하기
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default SelectDateModal;
