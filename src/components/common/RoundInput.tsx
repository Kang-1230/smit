import Image from "next/image";

const RoundInput = ({
  placeholder,
  value,
  onChange,
  disabled,
  error,
  classname,
}: {
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  classname: string;
}) => {
  return (
    <>
      <div className="relative w-full">
        <div className="flex flex-row items-center gap-x-[4px]">
          <div className="relative">
            <input
              placeholder={placeholder}
              className={`border-inset body-14-r h-[48px] w-full rounded-20 border-[1px] px-4 py-3 text-secondary-900 placeholder:text-secondary-400 disabled:bg-secondary-100 disabled:text-secondary-300 ${classname} focus:border-secondary-600 focus:bg-white focus:outline-none ${error && "border-alarm-red"} ${!error ? "border-transparent" : "bg-white"}`}
              value={value}
              onChange={onChange}
              disabled={disabled}
            />
            <div className="absolute right-[16px] top-1/2 -translate-y-1/2">
              {error && (
                <Image
                  alt="error"
                  src={`/icons/input/Alert.svg`}
                  height={22}
                  width={22}
                />
              )}
            </div>
          </div>
        </div>
        <div className="ml-3 mt-2 h-[12px]">
          {error && <p className="caption text-alarm-red">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default RoundInput;
