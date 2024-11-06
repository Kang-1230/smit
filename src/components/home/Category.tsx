import { SortCategory } from "@/service/posts";
import { Dispatch, SetStateAction, useState } from "react";
import Filter from "../common/Filter";
import Dropdown from "../common/Dropdown";

type Props = {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<SortCategory>>;
  selectedJobs: string[];
  setSelectedJobs: Dispatch<SetStateAction<string[]>>;
};

export default function CategoryComponent({
  selectedCategory,
  setSelectedCategory,
  selectedJobs,
  setSelectedJobs,
}: Props) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isJobOpen, setIsJobOpen] = useState(false);

  const categories: SortCategory[] = ["최신순", "인기순", "댓글순"];
  const jobs = ["개발", "고등학생", "토익"];

  const handleCategoryClick = (category: SortCategory) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  const handleJobClick = (job: string) => {
    setSelectedJobs((prev) => {
      if (prev.includes(job)) {
        return prev.filter((j) => j !== job);
      } else {
        return [...prev, job];
      }
    });
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
          text={selectedJobs.length > 0 ? selectedJobs.join(", ") : "직업 선택"}
          onClick={() => setIsJobOpen(!isJobOpen)}
          color="white"
        />
        {isJobOpen && <Dropdown array={jobs} onClick={handleJobClick} />}
      </div>
    </div>
  );
}

// <div className="absolute left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg top-full">
// {categories.map((category) => (
//   <button
//     key={category}
//     className="flex items-center w-full gap-1 px-4 py-2 text-sm text-left hover:bg-gray-50"
//     onClick={() => handleCategoryClick(category)}
//   >
//     {category}
//   </button>
// ))}
// </div>
