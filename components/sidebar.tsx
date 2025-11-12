"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Star, 
  Clock, 
  Activity,
  Film
} from "lucide-react";
import { ActivityFeed } from "./activity-feed";

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/favorites", icon: Star, label: "Favorites" },
    { href: "/watch-later", icon: Clock, label: "Watch Later" },
  ];

  return (
    <div
      className={`bg-gray-800 border-r border-gray-700 transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      } relative`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className="p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? "bg-green-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <Icon size={24} />
              {isExpanded && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <ActivityFeed />
        </div>
      )}
    </div>
  );
}