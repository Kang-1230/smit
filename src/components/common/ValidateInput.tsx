import Image from "next/image";
import MyButton from "./Button";

const ValidateInput = ({
  placeholder,
  value = "",
  onChange,
  title,
  onClick,
  bg = false,
  error,
  success,
  disabled = false,
}: {
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  onClick: () => void;
  bg?: boolean;
  error?: string;
  success?: string;
  disabled?: boolean;
}) => {
  return (
    <>
      <div className="w-full relative">
        <p className="body-14-m text-secondary-700 ml-3 mb-2">{title}</p>
        <div className="flex flex-row items-center gap-x-1">
          <div className="relative">
            <input
              placeholder={placeholder}
              className={`rounded-20 text-secondary-900 px-4 py-3 w-full placeholder:text-secondary-400 body-14-r ${
                bg && "bg-c-background"
              } ${error && "border-alarm-red border-[1px] text-alarm-red"} ${
                success && "border-success-blue border-[1px] text-success-blue"
              } focus:border-[1px] focus:border-secondary-600 focus:outline-none`}
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
        <div className="ml-3 h-8 mt-2">
          {error && <p className={"caption text-alarm-red"}>{error}</p>}
          {success && <p className={"caption text-success-blue"}>{success}</p>}
        </div>
      </div>
    </>
  );
};

export default ValidateInput;
