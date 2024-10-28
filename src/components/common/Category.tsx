const Category = ({ category }: { category: string }) => {
  return (
    <span className="px-3 py-[2px] bg-gray-300 rounded-3xl text-xs font-medium">
      {category}
    </span>
  );
};

export default Category;
