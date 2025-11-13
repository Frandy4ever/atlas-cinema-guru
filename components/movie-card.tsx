"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { UsersTitle } from "@/lib/definitions";

interface MovieCardProps {
  title: UsersTitle;
}

// Custom Clock Icon component that shows hands when filled
const ClockIcon = ({ filled, size = 32 }: { filled: boolean; size?: number }) => {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="white"/>
        <path d="M12 6V12L16 14" stroke="#1a1f2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
      <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export function MovieCard({ title }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (title.favorited) {
      await fetch(`/api/favorites/${title.id}`, { method: "DELETE" });
    } else {
      await fetch(`/api/favorites/${title.id}`, { method: "POST" });
    }
    window.location.reload();
  };

  const handleWatchLater = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (title.watchLater) {
      await fetch(`/api/watch-later/${title.id}`, { method: "DELETE" });
    } else {
      await fetch(`/api/watch-later/${title.id}`, { method: "POST" });
    }
    window.location.reload();
  };

  return (
    <div
      className="relative rounded-3xl overflow-hidden cursor-pointer border-4 border-[hsl(168,76%,47%)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ aspectRatio: '1/1' }}
    >
      <div className="relative w-full h-full">
        <Image
          src={title.image}
          alt={title.title}
          fill
          className="object-cover"
        />
      </div>
      
      {isHovered && (
        <>
          {/* Action Icons - Top Right */}
          <div className="absolute top-4 right-4 flex gap-3 z-20">
            <button
              onClick={handleFavorite}
              className="bg-transparent p-2 rounded-full transition-all hover:scale-110"
            >
              <Star
                size={32}
                className="text-white"
                fill={title.favorited ? "white" : "none"}
                strokeWidth={2}
              />
            </button>
            <button
              onClick={handleWatchLater}
              className="bg-transparent p-2 rounded-full transition-all hover:scale-110"
            >
              <ClockIcon filled={title.watchLater} size={32} />
            </button>
          </div>

          {/* Info Overlay - Bottom 50% */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[hsl(240,100%,12%)] via-[hsl(240,100%,12%)] to-transparent p-6 flex flex-col justify-end z-10">
            <h3 className="text-2xl font-bold text-white mb-2">
              {title.title} ({title.released})
            </h3>
            <p className="text-gray-300 text-sm mb-3 line-clamp-2">
              {title.synopsis}
            </p>
            <div className="inline-block self-start bg-[hsl(168,76%,47%)] text-black px-4 py-1.5 rounded-full font-semibold text-sm">
              {title.genre}
            </div>
          </div>
        </>
      )}
    </div>
  );
}