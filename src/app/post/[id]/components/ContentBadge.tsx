import CustomButton from "@/components/ui/CustomButton";

const ContentBadge = ({ item, i }: { item: string; i: number }) => {
  return (
    <>
      <div className="xl:hidden">
        <CustomButton
          text={item}
          size="medium"
          bgColor={i === 0 ? "#BFA28D" : "#FF9945"}
          key={`${item}-mobile`}
        />
      </div>
      <div className="hidden xl:block">
        <CustomButton
          text={item}
          size="webBadge"
          bgColor={i === 0 ? "#BFA28D" : "#FF9945"}
          key={`${item}-desktop`}
        />
      </div>
    </>
  );
};

export default ContentBadge;
