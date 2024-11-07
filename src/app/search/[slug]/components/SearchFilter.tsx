"use client";

import Dropdown from "@/components/common/Dropdown";
import Filter from "@/components/common/Filter";
import { SortCategory } from "@/service/posts";
import { useState } from "react";

export default function SearchFilter() {
  const [selectedCategory, setSelectedCategory] =
    useState<SortCategory>("최신순");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const categories: SortCategory[] = ["최신순", "인기순", "댓글순"];

  const handleCategoryClick = (category: SortCategory) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  return (
    <div className="relative">
      <Filter
        text={selectedCategory}
        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        color="gray"
      />
      {isCategoryOpen && (
        <Dropdown array={categories} onClick={handleCategoryClick} />
      )}
    </div>
  );
}
