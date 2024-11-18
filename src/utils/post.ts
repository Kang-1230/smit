import { Post } from "@/types/posts";

export function filterPostsBySearch(posts: Post[], search: string) {
  const searchTerm = search.trim().toLowerCase();
  if (!searchTerm) return posts;

  return posts.filter((post) => {
    const titleMatch = post.title.trim().toLowerCase().includes(searchTerm);
    const studyNameMatch = post.study.name
      .trim()
      .toLowerCase()
      .includes(searchTerm);
    const leaderNameMatch =
      post.leader.name?.trim().toLowerCase().includes(searchTerm) || null;
    const tagsMatch = post.study.tags
      .join("")
      .toLowerCase()
      .includes(searchTerm);

    return titleMatch || studyNameMatch || leaderNameMatch || tagsMatch;
  });
}

export function sortPostsByCategory(posts: Post[], category: string) {
  switch (category) {
    case "댓글순":
      return posts.sort((a, b) => b.likes - a.likes);
    case "인기순":
      return posts.sort((a, b) => b.comments - a.comments);
    default:
      return posts;
  }
}
