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
  const hasMore = favorites.length === 6;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Favorites</h1>
      
      {favorites.length === 0 ? (
        <p className="text-gray-400 text-center py-12">No favorites yet. Start adding some movies!</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((title) => (
              <MovieCard key={title.id} title={title} />
            ))}
          </div>
          
          <Pagination currentPage={page} hasMore={hasMore} />
        </>
      )}
    </div>
  );
}