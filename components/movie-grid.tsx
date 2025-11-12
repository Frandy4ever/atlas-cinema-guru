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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {titles.map((title) => (
          <MovieCard key={title.id} title={title} />
        ))}
      </div>
      
      <Pagination currentPage={page} />
    </div>
  );
}