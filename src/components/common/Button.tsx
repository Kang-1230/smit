interface buttonProps {
  children: React.ReactNode;
  style:
    | "black-fill"
    | "black-line"
    | "orange-fill"
    | "orange-line"
    | "white-fill"
    | "beige";
  size: "lg" | "md" | "sm";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const MyButton = ({
  children,
  style,
  size,
  onClick,
  disabled,
  className,
}: buttonProps) => {
  const sizeClass = {
    lg: "py-3 px-5 rounded-24 body-16-s",
    md: "py-2 px-4 rounded-[18px] body-14-s",
    sm: "py-1 px-3 rounded-[14px] body-14-s",
  };

  return (
    <button
      className={`min-w-fit
      ${style}
      ${sizeClass[size]}
      ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default MyButton;
