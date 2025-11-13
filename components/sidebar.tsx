"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Folder, 
  Star, 
  Clock,
} from "lucide-react";

interface SidebarProps {
  activityFeed: React.ReactNode;
}

export function Sidebar({ activityFeed }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Folder, label: "Home" },
    { href: "/favorites", icon: Star, label: "Favorites" },
    { href: "/watch-later", icon: Clock, label: "Watch Later" },
  ];

  return (
    <div
      className={`bg-[hsl(168,76%,47%)] transition-all duration-300 ${
        isExpanded ? "w-80" : "w-20"
      } flex flex-col h-full`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className="p-4 flex-shrink-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 p-3 rounded-lg mb-4 transition-colors ${
                isActive
                  ? "bg-white bg-opacity-30"
                  : "hover:bg-white hover:bg-opacity-20"
              }`}
            >
              <Icon size={28} className="flex-shrink-0 text-white" fill="white" />
              {isExpanded && <span className="text-white font-medium text-lg whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {isExpanded && (
        <div className="px-4 pb-4 flex-1 overflow-y-auto">
          <div className="bg-[hsl(173,76%,60%)] rounded-2xl p-4">
            {activityFeed}
          </div>
        </div>
      )}
    </div>
  );
}