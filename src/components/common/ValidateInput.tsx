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
      <div className="relative w-full">
        <p className="body-14-m mb-2 ml-3 text-secondary-700">{title}</p>
        <div className="flex flex-row items-center gap-x-1">
          <div className="relative">
            <input
              placeholder={placeholder}
              className={`body-14-r w-full rounded-20 border-[1px] border-transparent px-4 py-3 text-secondary-900 placeholder:text-secondary-400 ${
                bg && "bg-c-background"
              } ${error && "border-alarm-red text-alarm-red"} ${
                success && "border-success-blue text-success-blue"
              } focus:border-secondary-600 focus:outline-none`}
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
        <div className="ml-3 mt-2">
          {error && <p className={"caption text-alarm-red"}>{error}</p>}
          {success && <p className={"caption text-success-blue"}>{success}</p>}
        </div>
      </div>
    </>
  );
};

export default ValidateInput;
