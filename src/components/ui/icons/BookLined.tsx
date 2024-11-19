interface BookLinedProps {
  className?: string;
}

const BookLined = ({ className }: BookLinedProps) => {
  return (
    <svg
      className={`h-3 w-3 md:h-4 md:w-4 ${className}`}
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector 925 (Stroke)"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.56658 1.75156L5.03266 1.48459C3.96286 0.949692 2.37031 0.949738 1.30051 1.48464L1.19992 1.53493V8.9532C2.49596 8.44649 4.28737 8.50736 5.54445 9.1359L5.56658 9.14696V1.75156ZM6.43325 9.14696V1.75156L6.96717 1.48459C8.03698 0.949692 9.59678 0.999987 10.6666 1.53489L10.7672 1.58518V9.00345C9.47113 8.49674 7.71246 8.50736 6.45538 9.1359L6.43325 9.14696ZM6.84297 9.91107C7.99096 9.33707 9.6428 9.38737 10.7908 9.96136C11.1781 10.155 11.6338 9.87337 11.6338 9.44033V1.46158C11.6338 1.20906 11.4912 0.97822 11.2653 0.865292L11.0542 0.759719C9.74037 0.102821 7.89338 0.0525268 6.57959 0.709424L5.99992 0.999259L5.42025 0.709424C4.10645 0.0525267 2.22672 0.0525726 0.912922 0.70947L0.701776 0.815043C0.47592 0.927971 0.333252 1.15881 0.333252 1.41133V9.39008C0.333252 9.82312 0.788975 10.1048 1.1763 9.91111C2.32429 9.33712 4.00887 9.33707 5.15687 9.91107L5.99992 10.3326L6.84297 9.91107Z"
        className="fill-white md:fill-secondary-300"
      />
    </svg>
  );
};

export default BookLined;
