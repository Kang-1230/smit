const Category = ({ category }: { category: string }) => {
  return (
    <span className="px-[10px] py-1 caption bg-secondary-500 rounded-16">
      {category}
    </span>
  );
};

export default Category;
