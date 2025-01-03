interface ArrowLeftProps {
  color?: string;
  className?: string;
}

const ArrowLeft = ({ color = "#FFFFFF", className = "" }: ArrowLeftProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1807 4.74825C10.9268 4.49441 10.5153 4.49441 10.2614 4.74825L3.19038 11.8193C2.93654 12.0732 2.93654 12.4847 3.19038 12.7386L10.2614 19.8096C10.5153 20.0635 10.9268 20.0635 11.1807 19.8096C11.4345 19.5558 11.4345 19.1442 11.1807 18.8904L5.21924 12.9289L20.4848 12.9275C20.8438 12.9275 21.1348 12.6365 21.1348 12.2775C21.1348 11.9186 20.8438 11.6275 20.4848 11.6275L5.21924 11.6289L11.1807 5.66749C11.4345 5.41365 11.4345 5.00209 11.1807 4.74825Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowLeft;
