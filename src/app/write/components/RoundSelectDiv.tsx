import Image from "next/image";

const RoundSelectDiv = ({
  onClick,
  title,
  value,
  children,
}: {
  onClick: () => void;
  title: string;
  value: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col justify-between rounded-12 border border-secondary-100 p-[12px]">
      <div className="flex w-full justify-between">
        <p className="text-secondary-700">{title}</p>
        <div className="flex cursor-pointer items-center">
          <p className="body-16-m text-secondary-500" onClick={onClick}>
            {value}
          </p>
          <Image
            src={`/icons/Next.svg`}
            alt="selectBtn"
            width={24}
            height={24}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default RoundSelectDiv;
