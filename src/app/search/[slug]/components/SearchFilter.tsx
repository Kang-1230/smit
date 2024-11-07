"use client";

import Dropdown from "@/components/common/Dropdown";
import Filter from "@/components/common/Filter";
import { SortCategory } from "@/service/posts";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  category: SortCategory;
  setCategory: Dispatch<SetStateAction<SortCategory>>;
};

export default function SearchFilter({ category, setCategory }: Props) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const categories: SortCategory[] = ["최신순", "인기순", "댓글순"];

  const handleCategoryClick = (category: SortCategory) => {
    setCategory(category);
    setIsCategoryOpen(false);
  };

  return (
    <div className="relative">
      <Filter
        text={category}
        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        color="gray"
      />
      {isCategoryOpen && (
        <Dropdown array={categories} onClick={handleCategoryClick} />
      )}
    </div>
  );
}
