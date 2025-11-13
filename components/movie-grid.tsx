import { fetchTitles } from "@/lib/data";
import { auth } from "@/auth";
import { MovieCard } from "./movie-card";
import { Pagination } from "./pagination";

interface MovieGridProps {
  page: number;
  query: string;
  minYear: number;
  maxYear: number;
  genres: string[];
}

export async function MovieGrid({ page, query, minYear, maxYear, genres }: MovieGridProps) {
  const session = await auth();
  
  if (!session?.user?.email) return null;

  const titles = await fetchTitles(page, minYear, maxYear, query, genres, session.user.email);
  
  // Check if there are more results by fetching one extra item
  const hasMore = titles.length === 6; // If we got exactly 6, there might be more

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {titles.map((title) => (
          <MovieCard key={title.id} title={title} />
        ))}
      </div>
      
      {titles.length > 0 && (
        <Pagination currentPage={page} hasMore={hasMore} />
      )}
    </div>
  );
}