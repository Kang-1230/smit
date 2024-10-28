import Banner from "@/components/home/Banner";
import browserClient from "@/utils/supabase/client";

export default async function HomePage() {
  return (
    <section className="max-w-xl mx-auto flex flex-col p-4">
      <Banner
        title="스밋과 함께 공부하자!"
        description="어쩌구저쩌구샬라샬라어쩌구저쩌구어쩌구저쩌구샬라샬라어쩌구저쩌구어쩌구저쩌구샬라샬라어쩌구저쩌구어쩌구"
        link="/event"
      />
    </section>
  );
}
