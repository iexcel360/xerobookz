import React from "react";
import { cn } from "../utils/cn";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  columns: Array<{ key: string; label: string; render?: (value: any, row: any) => React.ReactNode }>;
  data: Array<Record<string, any>>;
  loading?: boolean;
  striped?: boolean;
  hover?: boolean;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, columns, data, loading, striped = true, hover = true, ...props }, ref) => {
    if (loading) {
      return (
        <div className="w-full animate-pulse">
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 bg-grey-200 rounded-xl" />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full overflow-auto rounded-2xl border border-grey-200 bg-white/50 backdrop-blur-sm">
        <table
          ref={ref}
          className={cn("w-full border-collapse", className)}
          {...props}
        >
          <thead>
            <tr className="bg-gradient-primary-soft border-b-2 border-grey-200">
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={cn(
                    "h-14 px-6 text-left align-middle font-semibold text-secondary-700 text-sm uppercase tracking-wider",
                    index === 0 && "rounded-tl-2xl",
                    index === columns.length - 1 && "rounded-tr-2xl"
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-32 text-center text-grey-500 font-medium"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={cn(
                    "border-b border-grey-100 transition-all duration-200",
                    striped && rowIndex % 2 === 0 && "bg-grey-50/50",
                    hover && "hover:bg-primary-50/50 hover:shadow-soft cursor-pointer"
                  )}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="h-14 px-6 align-middle text-sm text-secondary-600">
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
);

Table.displayName = "Table";
