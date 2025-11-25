import React from "react";
import { Table } from "./Table";
import { Pagination } from "./Pagination";
import { Skeleton } from "./Skeleton";

export interface DataGridColumn {
  key: string;
  label: string;
  render?: (value: any) => React.ReactNode;
  sortable?: boolean;
}

export interface DataGridProps {
  columns: DataGridColumn[];
  data: Array<Record<string, any>>;
  loading?: boolean;
  pagination?: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
  };
}

export const DataGrid: React.FC<DataGridProps> = ({
  columns,
  data,
  loading,
  pagination,
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table columns={columns} data={data} loading={loading} />
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          pageSize={pagination.pageSize}
          totalItems={pagination.totalItems}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
};

