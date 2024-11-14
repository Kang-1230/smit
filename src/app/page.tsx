import Banner from "@/components/home/Banner";
import FilterablePosts from "@/components/home/FilterablePosts";
import MultiCarousel from "@/components/home/MultiCarousel";
import FloatingButtons from "@/components/common/FloatingButtons";

import TopPostList from "@/components/home/TopPostList";

export default function HomePage() {

  return (
    <section className="mx-auto flex flex-col">
      <MultiCarousel>
        <Banner title="스밋과 함께 공부하자!" link="/event" />
      </MultiCarousel>
      <section>
        <TopPostList />
        <FilterablePosts />
      </section>
      <FloatingButtons />
    </section>
  );
}
