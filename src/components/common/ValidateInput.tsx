import Image from "next/image";
import MyButton from "./Button";

const ValidateInput = ({
  placeholder,
  value = "",
  onChange,
  title,
  onClick,
  classname,
  error,
  success,
  disabled = false,
  caption,
}: {
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  onClick: () => void;
  classname?: string;
  error?: string;
  success?: string;
  disabled?: boolean;
  caption?: string;
}) => {
  return (
    <>
      <div className="relative w-full">
        <p className="body-14-m mb-2 ml-3 text-secondary-700">{title}</p>
        <div className="flex flex-row items-center gap-x-1">
          <div className="relative">
            <input
              placeholder={placeholder}
              className={`body-14-r w-full rounded-20 border-[1px] px-4 py-3 text-secondary-900 placeholder:text-secondary-400 ${classname} focus:border-secondary-600 focus:bg-white focus:outline-none ${error && "border-alarm-red text-alarm-red"} ${success && "border-success-blue text-success-blue"} ${!error && !success ? "border-transparent" : "bg-white"}`}
              value={value}
              onChange={onChange}
              disabled={disabled}
            />
            {error && (
              <Image
                alt="error"
                src={`/icons/input/Alert.svg`}
                height={22}
                width={22}
                className="absolute right-5 top-1/2 -translate-y-1/2"
              />
            )}
          </div>
          <MyButton
            style="black-fill"
            size="md"
            onClick={onClick}
            disabled={!!success}
          >
            중복확인
          </MyButton>
        </div>
        <div className="ml-3 mt-2 h-[12px]">
          {error && <p className="caption text-alarm-red">{error}</p>}
          {success && <p className="caption text-success-blue">{success}</p>}
          {caption && !error && !success && (
            <p className="caption text-secondary-500">{caption}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ValidateInput;
