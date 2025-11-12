import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { MovieGrid } from "@/components/movie-grid";
import { Filters } from "@/components/filters";

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
  searchParams: SearchParams;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const page = Number(searchParams.page) || 1;
  const query = searchParams.query || "";
  const minYear = Number(searchParams.minYear) || 0;
  const maxYear = Number(searchParams.maxYear) || new Date().getFullYear();
  const genres = searchParams.genres?.split(",") || [];

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