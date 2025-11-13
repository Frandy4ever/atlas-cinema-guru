import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { fetchFavorites } from "@/lib/data";
import { MovieCard } from "@/components/movie-card";
import { Pagination } from "@/components/pagination";

interface SearchParams {
  page?: string;
}

export default async function FavoritesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth();
  const params = await searchParams;

  if (!session?.user?.email) {
    redirect("/login");
  }

  const page = Number(params.page) || 1;

  const favorites = await fetchFavorites(page, session.user.email);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-400">Favorites</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((title) => (
          <MovieCard key={title.id} title={title} />
        ))}
      </div>
      
      <Pagination currentPage={page} />
    </div>
  );
}