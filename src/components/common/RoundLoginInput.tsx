import Image from "next/image";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

const RoundLoginInput = ({
  placeholder,
  disabled,
  error,
  classname,
  useEyes = false,
  register,
}: {
  placeholder: string;

  disabled?: boolean;
  error?: string;
  classname: string;
  useEyes?: boolean;
  register: UseFormRegister<{
    password: string;
    email: string;
  }>;
}) => {
  const [isShow, setIsShow] = useState(!useEyes);
  const img = isShow ? "/icons/EyeOff.svg" : "/icons/EyeOn.svg";
  return (
    <>
      <div className="w-full">
        <div className="flex w-full flex-row items-center gap-x-[4px]">
          <div className="relative w-full">
            <input
              placeholder={placeholder}
              className={`border-inset body-14-r h-[48px] w-full rounded-20 border-[1px] px-4 py-3 text-secondary-900 placeholder:text-secondary-400 disabled:bg-secondary-100 disabled:text-secondary-300 ${classname} focus:border-secondary-600 focus:bg-white focus:outline-none ${error && "border-alarm-red"} ${!error ? "border-transparent" : "bg-white"}`}
              disabled={disabled}
              type={isShow ? "text" : "password"}
              {...register("password")}
            />
            <div className="absolute right-[16px] top-[36px] flex -translate-y-1/2">
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

export default RoundLoginInput;
