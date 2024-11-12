import { SortCategory } from "@/service/posts";
import { Dispatch, SetStateAction, useState } from "react";
import Filter from "../common/Filter";
import Dropdown from "../common/Dropdown";
import Modal from "../common/Modal";

type Props = {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<SortCategory>>;
  arr: string[];
  setArr: Dispatch<SetStateAction<string[]>>;
};

export default function CategoryComponent({
  selectedCategory,
  setSelectedCategory,
  arr,
  setArr,
}: Props) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCommonModalOpen, setIsCommonModalOpen] = useState<boolean>(false);
  const [commonModalMode, setCommonModalMode] = useState<string>("");

  const handleModalClick = (mode: string) => {
    setCommonModalMode(mode);
    setIsCommonModalOpen(true);
  };

  const categories: SortCategory[] = ["최신순", "인기순", "댓글순"];

  const handleCategoryClick = (category: SortCategory) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  return (
    <div className="relative my-4 flex gap-1">
      {/* 카테고리 */}
      <div className="flex flex-col items-center gap-1">
        <Filter
          text={selectedCategory}
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          color="white"
        />
        {isCategoryOpen && (
          <Dropdown array={categories} onClick={handleCategoryClick} />
        )}
      </div>

      <div>
        <Filter
          text={arr[0] === "" ? "직업" : arr[0]}
          onClick={() => handleModalClick("job")}
          color={arr[0] === "" ? "white" : "black"}
        />
      </div>
      <div>
        <Filter
          text={
            !arr[1]
              ? "스터디"
              : arr.slice(1).length === 1
                ? `${arr[1]}`
                : `${arr[1]} 외 ${arr.slice(1).length - 1}개`
          }
          onClick={() => handleModalClick("study")}
          color={!arr[1] ? "white" : "black"}
        />
      </div>

      <Modal
        isModalOpen={isCommonModalOpen}
        onClose={() => {
          setIsCommonModalOpen(false);
        }}
        onConfirm={(arr: string[]) => {
          setArr(arr);
          setIsCommonModalOpen(false);
        }}
        modalMode={commonModalMode}
        arr={arr}
      />
    </div>
  );
}
