import { useEffect, useRef } from "react";

interface AutoResizeTextAreaProps {
  value: string;
  onChange: (value: string) => void;
}

const AutoResizeTextArea = ({ value, onChange }: AutoResizeTextAreaProps) => {
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
      placeholder="메모: 최대 150자까지 작성 가능"
      maxLength={150}
      className="flex resize-none items-center justify-center gap-2.5 self-stretch rounded-[28px] bg-secondary-600 px-4 py-2 text-white placeholder-white"
    />
  );
};

export default AutoResizeTextArea;
