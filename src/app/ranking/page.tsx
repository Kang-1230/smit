import FloatingButtons from "@/components/common/FloatingButtons";
import RankingHeader from "./components/RankingHeader";
import RankingList from "./components/_/RankingList";

export default function Page() {
  return (
    <section className="relative h-screen bg-gradient-to-b from-[#FF8F32] to-[#FFC799]">
      <RankingHeader />
      <RankingList />
      <FloatingButtons />
    </section>
  );
}
