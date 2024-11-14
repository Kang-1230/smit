export type ToastPosition = "bc" | "ct" | "tc";
export type ToastStyle = "gray" | "darkgray";

interface ToastProps {
  message: string;
  isVisible: boolean;
  position: ToastPosition;
  style: ToastStyle;
}

export const Toast = ({
  message,
  isVisible,
  position = "bc",
  style = "darkgray",
}: ToastProps) => {
  const positionClass = {
    bc: "bottom-20 left-1/2 -translate-x-1/2",
    ct: "bottom-[313px] left-1/2 -translate-x-1/2 -translate-y-1/2",
    tc: "top-16 left-1/2 -translate-x-1/2",
  };

  const styleClass = {
    gray: "bg-white/40",
    darkgray: "bg-black/60",
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed z-50 ${positionClass[position]}`}>
      <div
        className={`absolute inset-0 rounded-[20px] ${styleClass[style]} backdrop-blur-lg`}
      />
      <div
        className={`relative flex items-center transition-all duration-200 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <span className="body-14-s whitespace-nowrap px-5 py-2 text-white">
          {message}
        </span>
      </div>
    </div>
  );
};
