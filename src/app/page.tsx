import Banner from "@/components/home/Banner";
import FilterablePosts from "@/components/home/FilterablePosts";
import FeaturedPosts from "@/components/home/FeaturedPosts";
import MultiCarousel from "@/components/home/MultiCarousel";
import FloatingButtons from "@/components/common/FloatingButtons";

export default async function HomePage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col">
      <MultiCarousel>
        <Banner title="스밋과 함께 공부하자!" link="/event" />
      </MultiCarousel>

      <section>
        <FeaturedPosts />
        <FilterablePosts />
      </section>

      <FloatingButtons />
    </section>
  );
}
