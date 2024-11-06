const TitleInput = ({
  placeholder,
  value,
  onChange,
  title,
  bg,
  disabled = false,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  bg?: boolean;
  disabled?: boolean;
}) => {
  return (
    <>
      <p className="body-14-m text-secondary-700 ml-3 mb-2">{title}</p>
      <div className="flex flex-row items-center gap-x-1">
        <input
          placeholder={placeholder}
          className={`rounded-20 text-secondary-900 px-4 py-3 w-full placeholder:text-secondary-400 body-14-r  focus:border-[1px] focus:border-secondary-600 focus:outline-none 
            disabled:bg-secondary-100 disabled:text-secondary-300
            ${bg && "bg-c-background"}`}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default TitleInput;
