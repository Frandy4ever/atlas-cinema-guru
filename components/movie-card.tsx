"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Clock } from "lucide-react";
import { UsersTitle } from "@/lib/definitions";

interface MovieCardProps {
  title: UsersTitle;
}

export function MovieCard({ title }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleFavorite = async () => {
    if (title.favorited) {
      await fetch(`/api/favorites/${title.id}`, { method: "DELETE" });
    } else {
      await fetch(`/api/favorites/${title.id}`, { method: "POST" });
    }
    window.location.reload();
  };

  const handleWatchLater = async () => {
    if (title.watchLater) {
      await fetch(`/api/watch-later/${title.id}`, { method: "DELETE" });
    } else {
      await fetch(`/api/watch-later/${title.id}`, { method: "POST" });
    }
    window.location.reload();
  };

  return (
    <div
      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={title.image}
        alt={title.title}
        width={400}
        height={400}
        className="w-full h-96 object-cover"
      />
      
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-90 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{title.title}</h3>
            <p className="text-gray-300 text-sm mb-2 line-clamp-3">
              {title.synopsis}
            </p>
            <div className="text-gray-400 text-sm">
              <p>Released: {title.released}</p>
              <p>Genre: {title.genre}</p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={handleFavorite}
              className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
            >
              <Star
                size={24}
                fill={title.favorited ? "currentColor" : "none"}
              />
            </button>
            <button
              onClick={handleWatchLater}
              className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
            >
              <Clock
                size={24}
                fill={title.watchLater ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}