import { useState } from "react";

const SelectStyle =
  "text-primary-900 bg-[#F8F8F6] border-b border-black relative";

const ManageOptions = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div className="body-16-m mb-[52px] flex justify-center border-b border-secondary-300 text-secondary-300">
      <button
        onClick={() => setIsSelected(true)}
        className={`flex flex-1 justify-center p-2 ${isSelected ? "" : SelectStyle}`}
      >
        스터디원 관리
      </button>
      <button
        onClick={() => setIsSelected(true)}
        className={`flex flex-1 justify-center p-2 ${isSelected ? SelectStyle : ""}`}
      >
        스터디 편집
      </button>
    </div>
  );
};

export default ManageOptions;
