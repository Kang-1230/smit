interface buttonProps {
  children: React.ReactNode;
  style:
    | "black-fill"
    | "black-line"
    | "orange-fill"
    | "orange-line"
    | "white-fill"
    | "beige";
  size: "lgBtn" | "mdBtn" | "smBtn";
  onClick?: () => void;
  disabled?: boolean;
}

const MyButton = ({
  children,
  style,
  size,
  onClick,
  disabled,
}: buttonProps) => {
  return (
    <button
      className={`
      ${style}
      ${size}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default MyButton;
