import { SortCategory } from "@/service/posts";
import { Dispatch, SetStateAction, useState } from "react";

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
    <div className="flex gap-2 relative">
      {/* 카테고리 */}
      <button
        className="flex items-center gap-1 rounded-full border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
      >
        {selectedCategory}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isCategoryOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          {categories.map((category) => (
            <button
              key={category}
              className="flex items-center gap-1 w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* 직업 */}
      <button
        className="flex items-center gap-1 rounded-full border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
        onClick={() => setIsJobOpen(!isJobOpen)}
      >
        {selectedJobs.length > 0 ? selectedJobs.join(", ") : "직업 선택"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isJobOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          {jobs.map((job) => (
            <button
              key={job}
              className={`flex items-center gap-1 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${
                selectedJobs.includes(job) ? "bg-gray-200" : ""
              }`}
              onClick={() => handleJobClick(job)}
            >
              {job}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
