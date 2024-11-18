interface buttonProps {
  children: React.ReactNode;
  style:
    | "black-fill"
    | "black-line"
    | "orange-fill"
    | "orange-line"
    | "white-fill"
    | "beige"
    | "gray"
    | "darkgray"
    | "gray-2";
  size: "lg" | "md" | "sm";
  responsiveSize?: "lg" | "md" | "sm";
  onClick?:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement>) => void);
  disabled?: boolean;
  className?: string;
  type?: "submit" | "button";
}

const MyButton = ({
  children,
  style,
  size,
  onClick,
  disabled,
  className,
  type = "button",
  responsiveSize,
}: buttonProps) => {
  const sizeClass = {
    lg: "py-[12px] px-[20px] rounded-24 body-16-s",
    md: "py-[8px] px-[16px] rounded-[18px] body-14-s",
    sm: "py-[4px] px-[12px] rounded-[14px] body-14-s",
  };

  const responsiveSizeClass = {
    lg: "xl:py-[12px] xl:px-[20px] xl:rounded-24 xl:body-16-s",
    md: "xl:py-[8px] xl:px-[16px] xl:rounded-[18px] xl:body-14-s",
    sm: "xl:py-[4px] xl:px-[12px] xl:rounded-[14px] xl:body-14-s",
  };

  return (
    <button
      className={`mit-h-fit min-w-fit ${style} ${sizeClass[size]} ${className} ${responsiveSize && responsiveSizeClass[responsiveSize]}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default MyButton;
