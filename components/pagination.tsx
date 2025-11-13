"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  hasMore: boolean;
}

export function Pagination({ currentPage, hasMore }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigate = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/?${params.toString()}`);
  };

  const canGoPrevious = currentPage > 1;
  const canGoNext = hasMore;

  return (
    <div className="flex justify-center items-center">
      <div className="flex rounded-full overflow-hidden">
        <button
          onClick={() => canGoPrevious && navigate(currentPage - 1)}
          disabled={!canGoPrevious}
          className={`bg-[hsl(168,76%,47%)] disabled:bg-gray-600 disabled:opacity-50 w-36 py-3 text-black font-semibold transition-colors ${
            canGoPrevious ? 'cursor-pointer hover:bg-[hsl(168,76%,40%)]' : 'cursor-not-allowed'
          }`}
        >
          Previous
        </button>
        
        <div className="w-0.5 bg-[hsl(240,100%,12%)]"></div>
        
        <button
          onClick={() => canGoNext && navigate(currentPage + 1)}
          disabled={!canGoNext}
          className={`bg-[hsl(168,76%,47%)] disabled:bg-gray-600 disabled:opacity-50 w-36 py-3 text-black font-semibold transition-colors ${
            canGoNext ? 'cursor-pointer hover:bg-[hsl(168,76%,40%)]' : 'cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}