"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
}

export function Pagination({ currentPage }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigate = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex rounded-full overflow-hidden">
        <button
          onClick={() => navigate(currentPage - 1)}
          disabled={currentPage <= 1}
          className="bg-[hsl(168,76%,47%)] hover:bg-[hsl(168,76%,40%)] disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 w-36 py-3 text-black font-semibold transition-colors"
        >
          Previous
        </button>
        
        <div className="w-0.5 bg-[hsl(240,100%,12%)]"></div>
        
        <button
          onClick={() => navigate(currentPage + 1)}
          className="bg-[hsl(168,76%,47%)] hover:bg-[hsl(168,76%,40%)] w-36 py-3 text-black font-semibold transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}