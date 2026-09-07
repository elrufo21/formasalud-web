"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Buscar registros...",
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft/60" />
          <input
            type="text"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-line bg-white text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
          />
        </div>
        <div className="text-xs font-mono text-ink-soft">
          Total: <b className="text-navy">{table.getFilteredRowModel().rows.length}</b> registros
        </div>
      </div>

      {/* Table Surface */}
      <div className="rounded-xl border border-line bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-alt/80 border-b border-line text-xs font-semibold text-ink-soft uppercase tracking-wider font-mono">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort();
                    const isSorted = header.column.getIsSorted();

                    return (
                      <th
                        key={header.id}
                        className={cn(
                          "px-4 py-3.5 select-none",
                          canSort ? "cursor-pointer hover:bg-line/40 transition-colors" : ""
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center gap-1.5">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort && (
                            <span className="text-ink-soft/50">
                              {isSorted === "asc" ? (
                                <ChevronUp className="w-3.5 h-3.5 text-teal" />
                              ) : isSorted === "desc" ? (
                                <ChevronDown className="w-3.5 h-3.5 text-teal" />
                              ) : (
                                <ChevronsUpDown className="w-3.5 h-3.5" />
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-line">
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="h-32 text-center text-ink-soft text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-teal border-t-transparent animate-spin" />
                      <span>Cargando datos...</span>
                    </div>
                  </td>
                </tr>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-bg-alt/40 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-ink">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="h-32 text-center text-ink-soft text-sm">
                    No se encontraron registros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-line bg-bg-alt/40 text-xs text-ink-soft">
          <div className="flex items-center gap-2">
            <span>Filas por página:</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="rounded border border-line bg-white px-2 py-1 text-xs text-ink focus:outline-none"
            >
              {[8, 15, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span>
              Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount() || 1}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-2.5 py-1 rounded border border-line bg-white font-medium hover:bg-bg-alt disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Anterior
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-2.5 py-1 rounded border border-line bg-white font-medium hover:bg-bg-alt disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
