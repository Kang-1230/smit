"use client";

import Image from "next/image";

const ApplyStudyModal = ({
  onClose,
  message,
  setMessage,
  onApply,
}: {
  onClose: () => void;
  message: string;
  setMessage: (value: string) => void;
  onApply: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="flex h-auto min-w-[327px] items-center justify-center rounded-2xl bg-white px-5 py-8 xl:h-[525px] xl:w-[440px] xl:px-[52px] xl:py-11"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex w-full flex-col items-center justify-end pb-1 pt-[37px] xl:pb-0 xl:pt-[50px]">
          <Image
            src={"/icons/Rectangle.svg"}
            alt="ractangle"
            width={104}
            height={92}
            className="shrink-0 xl:h-[104px] xl:w-[117px]"
          />
          <div className="absolute top-[68px] flex gap-[10px] xl:top-[87px]">
            {[0, 1, 2].map((el, idx) => (
              <Image
                key={idx}
                src={"/icons/Ellipse2.svg"}
                alt="el"
                width={9}
                height={9}
              />
            ))}
          </div>
          <Image
            src={"/icons/Ellipse.svg"}
            alt="ellipse"
            width={83}
            height={6}
            className="mt-1 shrink-0"
          />
          <p className="title-20-s text-Secondary-900 xl:title-24-b mt-[38px] leading-[1.2] tracking-[-0.4px] xl:mt-11 xl:font-semibold">
            스터디에 신청하시겠습니까?
          </p>
          <p className="body-14-m xl:body-16-m mb-4 mt-3 text-center tracking-[-0.28px] text-[#484741] xl:mb-5 xl:mt-4">
            신청하기에 앞서 나의 각오를 작성해주세요!
          </p>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mb-8 flex h-12 items-center self-stretch rounded-3xl bg-[#F8F8FA] px-5 py-3 focus:border focus:border-[#808080] focus:bg-white focus:outline-none xl:mb-[42px] xl:placeholder:text-center"
            placeholder="각오 한 마디 (최대 12자)"
            type="text"
            maxLength={12}
          />
          <div className="flex w-full gap-1.5">
            <button
              onClick={onClose}
              className="body-16-s h-12 w-[80px] rounded-3xl border border-secondary-900 px-5 xl:w-[100px]"
            >
              취소
            </button>
            <button
              onClick={onApply}
              className="body-16-s h-12 flex-1 rounded-3xl bg-secondary-900 px-5 text-white"
            >
              신청하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyStudyModal;
