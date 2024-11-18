const Badge = ({
  category,
  idx,
  color,
}: {
  category: string;
  idx: number;
  color: "secondary" | "primary" | "tertiary" | "secondarymore";
}) => {
  const studyBadge = {
    secondary: "bg-secondary-500 text-white",
    primary: "bg-primary-50 text-white",
    tertiary: "bg-tertiary-75",
    secondarymore: "",
  };
  const jobBadge = {
    secondary: "bg-secondary-700 text-white",
    primary: "bg-tertiary-300 text-white",
    tertiary: "bg-tertiary-200",
    secondarymore: "bg-primary-50 text-white",
  };
  return (
    <span
      className={`caption xl:body-14-m rounded-16 px-[10px] py-[4px] ${
        idx === 0 ? jobBadge[color] : studyBadge[color]
      }`}
    >
      {category}
    </span>
  );
};

export default Badge;
