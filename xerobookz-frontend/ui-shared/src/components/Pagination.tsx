import React from "react";
import { cn } from "../utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  totalItems?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  totalItems,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const startItem = (currentPage - 1) * (pageSize || 10) + 1;
  const endItem = Math.min(currentPage * (pageSize || 10), totalItems || 0);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
      <div className="text-sm text-gray-600">
        {totalItems && (
          <span>
            Showing {startItem} to {endItem} of {totalItems} results
          </span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "p-2 rounded-md border border-gray-300",
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-grey"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "px-3 py-1 rounded-md text-sm",
              currentPage === page
                ? "bg-primary text-white"
                : "border border-gray-300 hover:bg-grey"
            )}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "p-2 rounded-md border border-gray-300",
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-grey"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

