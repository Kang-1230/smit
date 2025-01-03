export type ToastPosition = "bc" | "ct" | "tc" | "web" | "webCalendar";
export type ToastStyle = "gray" | "darkgray";

interface ToastProps {
  message: string;
  isVisible: boolean;
  isFadingOut: boolean;
  position: ToastPosition;
  style: ToastStyle;
}

export const Toast = ({
  message,
  isVisible,
  isFadingOut,
  position = "bc",
  style = "darkgray",
}: ToastProps) => {
  const positionClass = {
    bc: "fixed bottom-20 left-1/2 -translate-x-1/2",
    ct: "fixed bottom-[313px] left-1/2 -translate-x-1/2 -translate-y-1/2",
    tc: "fixed top-16 left-1/2 -translate-x-1/2",
    web: "fixed top-[110px] left-1/2 -translate-x-1/2",
    webCalendar: "absolute -bottom-8",
  };

  const styleClass = {
    gray: "bg-white/40",
    darkgray: "bg-black/60",
  };

  if (!isVisible) return null;

  return (
    <div
      className={`z-50 ${positionClass[position]} ${
        isFadingOut ? "animate-fade-out" : "animate-fade-in"
      } backdrop-blur-lg`}
    >
      <div className={`absolute inset-0 rounded-[20px] ${styleClass[style]}`} />
      <div className={`relative flex items-center transition-all duration-200`}>
        <span className="body-14-s whitespace-nowrap px-5 py-2 text-white">
          {message}
        </span>
      </div>
    </div>
  );
};
