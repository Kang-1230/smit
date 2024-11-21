import Image from "next/image";
import { useState } from "react";

const SquareInput = ({
  value,
  onChange,
  placeholder,
  title,
  essential = false,
  maxLength,
  caption,
  viewLength = false,
  error,
  inputClassname,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  title?: string;
  essential?: boolean;
  maxLength?: number;
  caption?: string;
  viewLength?: boolean;
  error?: string;
  inputClassname?: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <p className="body-16-m mb-[8px] pl-[4px] text-secondary-700">
        {title} {essential && <span className="text-primary-50">*</span>}
        {caption && <span className="text-primary-50">{caption}</span>}
      </p>
      <input
        className={
          inputClassname
            ? `${inputClassname}`
            : `body-16-m w-full rounded-12 bg-c-background p-3 text-secondary-900 placeholder-secondary-300 ring-[1px] ring-inset ring-transparent focus:bg-white focus:outline-none focus:ring-secondary-500 ${error && "ring-alarm-red"}`
        }
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {viewLength && (
        <p
          className={`caption mt-[4px] flex flex-row-reverse justify-between ${isFocused && "text-black"} ${error ? "text-alarm-red" : "text-secondary-300"}`}
        >
          {value.length}/{maxLength}
          {error && (
            <span className="flex items-center gap-x-[2px] text-alarm-red">
              <Image
                src={`/icons/input/Alert.svg`}
                alt="alert"
                width={16}
                height={16}
              ></Image>
              {error}
            </span>
          )}
        </p>
      )}
    </div>
  );
};

export default SquareInput;
