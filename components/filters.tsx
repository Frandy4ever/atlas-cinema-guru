"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [genres, setGenres] = useState<string[]>([]);
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch("/api/genres");
      const data = await response.json();
      setAvailableGenres(data.genres);
    };
    fetchGenres();
  }, []);

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
    const newGenres = genres.includes(genre)
      ? genres.filter(g => g !== genre)
      : [...genres, genre];
    
    setGenres(newGenres);
    updateSearchParams({ genres: newGenres.join(",") });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Search movies..."
            defaultValue={searchParams.get("query") || ""}
            onChange={(e) => updateSearchParams({ query: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Min Year */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Min Year
          </label>
          <input
            type="number"
            placeholder="Min year"
            defaultValue={searchParams.get("minYear") || ""}
            onChange={(e) => updateSearchParams({ minYear: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Max Year */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Max Year
          </label>
          <input
            type="number"
            placeholder="Max year"
            defaultValue={searchParams.get("maxYear") || ""}
            onChange={(e) => updateSearchParams({ maxYear: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Genres */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Genres
          </label>
          <select
            multiple
            value={genres}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, option => option.value);
              setGenres(selected);
              updateSearchParams({ genres: selected.join(",") });
            }}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
          >
            {availableGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">Hold Ctrl to select multiple</p>
        </div>
      </div>
    </div>
  );
}