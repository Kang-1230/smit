import { useState } from "react";

const SelectStyle =
  "text-primary-900 bg-[#F8F8FA] border-b border-black relative h-12";

type Props = {
  onConfirm: (data: boolean) => void;
};

const ManageOptions = (props: Props) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = (selected: boolean) => {
    setIsSelected(selected);
    props.onConfirm(selected);
  };

  return (
    <div className="body-16-m mb-[52px] flex h-12 border-b border-secondary-300 text-secondary-300 md:mb-[36px] xl:w-[886px]">
      <button
        onClick={() => handleSelect(false)}
        className={`flex flex-1 items-center justify-center p-2 ${!isSelected ? SelectStyle : ""}`}
      >
        스터디원 관리
        {!isSelected ? (
          <span className="mb-6 h-1 w-1 rounded-full bg-primary-50"></span>
        ) : null}
      </button>
      <button
        onClick={() => handleSelect(true)}
        className={`flex flex-1 items-center justify-center p-2 ${isSelected ? SelectStyle : ""}`}
      >
        스터디 편집
        {isSelected ? (
          <span className="mb-6 h-1 w-1 rounded-full bg-primary-50"></span>
        ) : null}
      </button>
    </div>
  );
};

export default ManageOptions;
