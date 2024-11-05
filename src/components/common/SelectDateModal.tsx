"use client";

interface DateModalProps {
  handleClose: () => void;
  handleConfirm: () => void;
  selectedDate: string;
  children: React.ReactNode;
}

const SelectDateModal = ({
  handleClose,
  handleConfirm,
  selectedDate,
  children,
}: DateModalProps) => {
  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 flex items-end justify-center w-full h-full bg-black/70 z-50"
    >
      <div
        className="w-full bg-white rounded-t-2xl flex-col items-center justify-center animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <section className="w-full px-6">
          <p className="text-center text-xl mt-9 font-medium">{selectedDate}</p>
          <hr className="my-4" />
          <div className="flex justify-center items-center">{children}</div>
        </section>
        <div className="flex justify-center items-center gap-2 text-white mt-4 border-t py-[10px] px-6">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 rounded-3xl border border-secondary-900 bg-white body-16-s text-secondary-900"
          >
            취소하기
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 rounded-3xl bg-secondary-900 body-16-s text-white"
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectDateModal;
