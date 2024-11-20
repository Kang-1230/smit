const MemoSkeleton = () => {
  return (
    <div className="mb-[55px] flex w-full flex-col">
      <div className="xl:absolute xl:bottom-[474px]">
        <header className="caption mb-3 flex h-6 items-center p-1 xl:mb-2 xl:w-[388px] xl:justify-between">
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-secondary-900" />
            <div className="ml-1 h-4 w-24 bg-secondary-900" />
          </div>
        </header>
        <div className="overflow-hidden">
          <div className="mb-[18px] hidden w-[400px] gap-2 xl:flex">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-14 w-14 rounded-full bg-secondary-900"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="h-[474px] w-[388px] rounded-[20px] bg-secondary-900" />
    </div>
  );
};

export default MemoSkeleton;
