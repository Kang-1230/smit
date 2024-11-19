import { useEffect, useRef } from "react";

interface AutoResizeTextAreaProps {
  value?: string;
  onChange: (value: string) => void;
  maxLength?: number;
  classname?: string;
  placeholder?: string;
}

const AutoResizeTextArea = ({
  value,
  onChange,
  maxLength = 150,
  classname = "rounded-[28px] bg-secondary-600 px-4 py-2 text-white placeholder-secondary-300 focus:ring-1 focus:ring-secondary-100 focus:outline-none focus:[&::-webkit-scrollbar]:hidden focus:[scrollbar-width:none]",
  placeholder = "메모: 최대 150자까지 작성 가능",
}: AutoResizeTextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={1}
      placeholder={placeholder}
      maxLength={maxLength}
      className={`flex resize-none items-center justify-center gap-2.5 self-stretch ${classname}`}
    />
  );
};

export default AutoResizeTextArea;
