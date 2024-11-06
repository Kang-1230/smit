type Props<T extends string> = {
  array: T[];
  onClick: (item: T) => void;
};

export default function Dropdown<T extends string>({
  array,
  onClick,
}: Props<T>) {
  return (
    <ul
      className="absolute top-8 z-10 w-max rounded-8 bg-white py-1 font-pretendard text-base font-normal"
      style={{ boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.25)" }}
    >
      {array.map((item, idx) => (
        <li key={item + idx}>
          <button className="px-4 py-1" onClick={() => onClick(item)}>
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}
