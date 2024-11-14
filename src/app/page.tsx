import Banner from "@/components/home/Banner";
import FilterablePosts from "@/components/home/FilterablePosts";
import FeaturedPosts from "@/components/home/FeaturedPosts";
import MultiCarousel from "@/components/home/MultiCarousel";
import FloatingButtons from "@/components/common/FloatingButtons";
import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  const supabase = createClient();
  console.log(await supabase.auth.getUser());

  return (
    <section className="mx-auto flex flex-col">
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
