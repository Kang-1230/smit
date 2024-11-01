import Banner from "@/components/home/Banner";
import FilterablePosts from "@/components/home/FilterablePosts";
import FeaturedPosts from "@/components/home/FeaturedPosts";
import MultiCarousel from "@/components/home/MultiCarousel";

export default async function HomePage() {
  return (
    <section className="max-w-xl mx-auto flex flex-col p-4">
      <MultiCarousel>
        <Banner
          title="스밋과 함께 공부하자!"
          description="어쩌구저쩌구샬라샬라어쩌구저쩌구어쩌구저쩌구샬라샬라어쩌구저쩌구어쩌구저쩌구샬라샬라어쩌구저쩌구어쩌구"
          link="/event"
        />
      </MultiCarousel>
      <FeaturedPosts />
      <FilterablePosts />
    </section>
  );
}
