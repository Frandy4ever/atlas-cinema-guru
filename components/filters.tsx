"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch("/api/genres");
      const data = await response.json();
      setAvailableGenres(data.genres);
    };
    fetchGenres();
    
    // Initialize selected genres from URL
    const genresParam = searchParams.get("genres");
    if (genresParam) {
      setSelectedGenres(genresParam.split(","));
    }
  }, [searchParams]);

  const updateSearchParams = useDebouncedCallback((updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    router.push(`/?${params.toString()}`);
  }, 300);

  const handleGenreToggle = (genre: string) => {
    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    
    setSelectedGenres(newGenres);
    updateSearchParams({ genres: newGenres.join(",") });
  };

  return (
    <div className="space-y-4">
      {/* Search and Years Row */}
      <div className="flex gap-4 items-end">
        {/* Search */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-white mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Ghost"
            defaultValue={searchParams.get("query") || ""}
            onChange={(e) => updateSearchParams({ query: e.target.value })}
            className="w-full bg-[hsl(240,100%,19%)] border-2 border-[#1FD9C3] rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1FD9C3]"
          />
        </div>

        {/* Min Year */}
        <div className="w-48">
          <label className="block text-sm font-medium text-white mb-2">
            Min Year
          </label>
          <input
            type="number"
            placeholder="1990"
            defaultValue={searchParams.get("minYear") || ""}
            onChange={(e) => updateSearchParams({ minYear: e.target.value })}
            className="w-full bg-[hsl(240,100%,19%)] border-2 border-[#1FD9C3] rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1FD9C3]"
          />
        </div>

        {/* Max Year */}
        <div className="w-48">
          <label className="block text-sm font-medium text-white mb-2">
            Max Year
          </label>
          <input
            type="number"
            placeholder="2024"
            defaultValue={searchParams.get("maxYear") || ""}
            onChange={(e) => updateSearchParams({ maxYear: e.target.value })}
            className="w-full bg-[hsl(240,100%,19%)] border-2 border-[#1FD9C3] rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1FD9C3]"
          />
        </div>
      </div>

      {/* Genres Row */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-white whitespace-nowrap">
          Genres
        </label>
        <div className="flex flex-wrap gap-2">
          {availableGenres.map((genre) => {
            const isSelected = selectedGenres.includes(genre);
            return (
              <button
                key={genre}
                onClick={() => handleGenreToggle(genre)}
                className={`px-6 py-2 rounded-full font-medium transition-colors border-2 ${
                  isSelected
                    ? "bg-[hsl(168,76%,47%)] text-black border-[hsl(168,76%,47%)]"
                    : "bg-transparent text-white border-[#1FD9C3] hover:bg-[hsl(168,76%,47%)] hover:text-black"
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}