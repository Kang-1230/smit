import Banner from "@/components/home/Banner";
import FilterablePosts from "@/components/home/FilterablePosts";
import FeaturedPosts from "@/components/home/FeaturedPosts";
import MultiCarousel from "@/components/home/MultiCarousel";
import Dropdown from "./write/components/Dropdown";

export default async function HomePage() {
  return (
    <section className="max-w-xl mx-auto flex flex-col">
      <MultiCarousel>
        <Banner title="스밋과 함께 공부하자!" link="/event" />
      </MultiCarousel>
<<<<<<< HEAD
      {/* <FeaturedPosts /> */}
      {/* <FilterablePosts /> */}
=======

      <section className="my-12">
        <FeaturedPosts />
        <FilterablePosts />
      </section>
>>>>>>> e99c7b9006e1d7f23f95788d5fac01cabaf5287e
      <Dropdown></Dropdown>
    </section>
  );
}
