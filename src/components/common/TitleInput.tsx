import Image from "next/image";
import { useState } from "react";

const TitleInput = ({
  placeholder,
  value = "",
  onChange,
  title,
  classname,
  error,
  disabled = false,
  useEyes = false,
}: {
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  classname?: string;
  error?: string;
  disabled?: boolean;
  useEyes?: boolean;
}) => {
  const [isShow, setIsShow] = useState(!useEyes);
  const img = isShow ? "/icons/EyeOff.svg" : "/icons/EyeOn.svg";
  return (
    <>
      <div className="relative w-full">
        <p className="body-14-m mb-2 ml-3 w-full text-secondary-700">{title}</p>
        <div className="flex w-full flex-row items-center gap-x-1">
          <div className="relative w-full">
            <input
              placeholder={placeholder}
              className={`border-inset body-14-r h-[40px] w-full rounded-20 border-[1px] px-4 py-3 text-secondary-900 placeholder:text-secondary-400 disabled:bg-secondary-100 disabled:text-secondary-300 ${classname} focus:border-secondary-600 focus:bg-white focus:outline-none ${error && "border-alarm-red text-alarm-red"} ${!error ? "border-transparent" : "bg-white"}`}
              value={value}
              onChange={onChange}
              disabled={disabled}
              type={isShow ? "text" : "password"}
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
              {useEyes && (
                <Image
                  src={img}
                  alt="show&hide"
                  width={24}
                  height={24}
                  onClick={() => setIsShow(!isShow)}
                  className="ml-[4px]"
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

export default TitleInput;
