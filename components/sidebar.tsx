"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Folder, 
  Star,
} from "lucide-react";

interface SidebarProps {
  activityFeed: React.ReactNode;
}

// Custom Clock Icon for sidebar
const ClockIcon = ({ size = 28 }: { size?: number }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="white"/>
      <path d="M12 6V12L16 14" stroke="#1dd2af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export function Sidebar({ activityFeed }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Folder, label: "Home", isCustom: false },
    { href: "/favorites", icon: Star, label: "Favorites", isCustom: false },
    { href: "/watch-later", icon: null, label: "Watch Later", isCustom: true },
  ];

  return (
    <div
      className={`bg-[#1dd2af] transition-all duration-300 ${
        isExpanded ? "w-80" : "w-20"
      } flex flex-col h-full`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className="p-4 flex-shrink-0">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-3 p-3 mb-4 transition-opacity hover:opacity-80"
            >
              {item.isCustom ? (
                <ClockIcon size={28} />
              ) : (
                item.icon && <item.icon size={28} className="flex-shrink-0 text-white" fill="white" strokeWidth={0} />
              )}
              {isExpanded && <span className="text-white font-medium text-lg whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {isExpanded && (
        <div className="px-4 pb-4 flex-1 overflow-y-auto">
          <div className="bg-[#54f4d0] rounded-2xl p-4">
            {activityFeed}
          </div>
        </div>
      )}
    </div>
  );
}