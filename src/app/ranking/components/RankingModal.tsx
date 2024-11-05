import { fetchByStudyId } from "@/service/posts";
import { useQuery } from "@tanstack/react-query";

const fetchAllStudy = async (id: string) => {
  const data = await fetchByStudyId(id);
  return data;
};

export default function RankingModal({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["modal", id],
    queryFn: () => fetchAllStudy(id),
  });

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return <div>{data?.study_name}</div>;
}
