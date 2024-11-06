const Badge = ({
  category,
  idx,
  color,
}: {
  category: string;
  idx: number;
  color: "secondary" | "primary" | "tertiary";
}) => {
  const studyBadge = {
    secondary: "bg-secondary-500",
    primary: "bg-primary-50",
    tertiary: "bg-tertiary-75",
  };
  const jobBadge = {
    secondary: "bg-secondary-700",
    primary: "bg-tertiary-300",
    tertiary: "bg-tertiary-200",
  };
  return (
    <span
      className={`px-[10px] py-1 caption rounded-16 ${
        idx === 0 ? jobBadge[color] : studyBadge[color]
      }`}
    >
      {category}
    </span>
  );
};

export default Badge;
