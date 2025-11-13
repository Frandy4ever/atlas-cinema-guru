import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { MovieGrid } from "@/components/movie-grid";
import { Filters } from "@/components/filters";
import { fetchGenres } from "@/lib/data";

interface SearchParams {
  page?: string;
  query?: string;
  minYear?: string;
  maxYear?: string;
  genres?: string;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth();
  const params = await searchParams;

  if (!session) {
    redirect("/login");
  }

  const page = Number(params.page) || 1;
  const query = params.query || "";
  const minYear = Number(params.minYear) || 0;
  const maxYear = Number(params.maxYear) || new Date().getFullYear();
  
  // If no genres specified, fetch all available genres
  const genres = params.genres?.split(",").filter(Boolean) || await fetchGenres();

  return (
    <div className="space-y-6">
      <Filters />
      <MovieGrid
        page={page}
        query={query}
        minYear={minYear}
        maxYear={maxYear}
        genres={genres}
      />
    </div>
  );
}