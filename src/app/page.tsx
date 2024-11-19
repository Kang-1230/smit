import Banner from "@/components/home/Banner";
import FilterablePosts from "@/components/home/FilterablePosts";
import MultiCarousel from "@/components/home/MultiCarousel";
import FloatingButtons from "@/components/common/FloatingButtons";
import TopPostList from "@/components/home/TopPostList";

const bannerData = [
  { title: "스밋과 함께\n공부하자!", url: "/event", isEventPage: true },
  {
    title: "오늘의 공부를\n문서로 기록해보세요!",
    url: "/event",
    isEventPage: false,
  },
  {
    title: "쉽고 빠른 스터디\n활용 가이드!",
    url: "/event",
    isEventPage: false,
  },
];

export default function HomePage() {
  return (
    <section className="mx-auto flex flex-col">
      <MultiCarousel>
        {bannerData.map((item, index) => (
          <Banner
            key={item.title}
            title={item.title}
            url={item.url}
            num={index + 1}
            isEventPage={item.isEventPage}
          />
        ))}
      </MultiCarousel>
      <section className="mx-auto w-full max-w-[80rem]">
        <TopPostList />
        <FilterablePosts />
      </section>
      <FloatingButtons />
    </section>
  );
}
