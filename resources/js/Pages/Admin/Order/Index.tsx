import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import { Head, Link, useForm } from "@inertiajs/react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { format } from "date-fns";
import { Toaster } from "@/components/ui/toaster";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "product_title",
    header: "Product Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("product_title")}</div>
    ),
  },
  {
    accessorKey: "user_name",
    header: "User Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("user_name")}</div>
    ),
  },
  {
    accessorKey: "user_email",
    header: "User Email",
    cell: ({ row }) => <div>{row.getValue("user_email")}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("price")}$</div>
    ),
  },
  {
    accessorKey: "fields",
    header: "Fields",
    cell: ({ row }) => {
      const fields = row.getValue("fields")
        ? JSON.parse(row.getValue("fields"))
        : null;

      if (fields && Object.entries(fields).length > 0) {
        return (
          <div className="flex flex-col space-y-1">
            {Object.entries(fields).map(([key, value]: any, index) => (
              <div key={index} className="text-sm text-neutral-600">
                <strong>{key}:</strong> {value || "N/A"}
              </div>
            ))}
          </div>
        );
      }
      return <div>No fields available</div>;
    },
  },
  {
    accessorKey: "response",
    header: "Response",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("response") ?? "-"}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-start">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status");
      if (status == "complete") {
        return (
          <div className="capitalize bg-green-600/80 text-white p-2 rounded-xl inline-block">
            Complated
          </div>
        );
      }

      if (status == "pending") {
        return (
          <div className="capitalize bg-yellow-600/80 text-white p-2 rounded-xl inline-block">
            Pending
          </div>
        );
      }

      return (
        <div className="capitalize bg-red-600/80 text-white p-2 rounded-xl inline-block">
          Canceled
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      const formattedDate = format(date, "dd/MM/yyyy HH:mm");
      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "action",
    header: () => <div className="text-end">Action</div>,
    cell: ({ row }) => (
      <Link
        href={route("admin.orders.show", row.getValue("id"))}
        className="text-end text-blue-600 underline block"
      >
        Show
      </Link>
    ),
  },
];

const Index = ({ orders }: { orders: any[] }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: orders,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Authenticated>
      <Toaster />
      <Head title="ddd" />
      <div className="w-full rounded-xl bg-white py-6 px-3 space-y-3">
        <h2 className="text-stone-800 text-2xl font-semibold font-['Cairo']">
          الطلبات
        </h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              name="search"
              id="search"
              className="px-10 py-2 bg-white rounded-xl border text-neutral-600 text-base font-normal font-['Cairo'] focus-visible:outline-none w-96"
              placeholder="بحث..."
              value={
                (table
                  .getColumn("product_title")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn("product_title")
                  ?.setFilterValue(event.target.value)
              }
            />
            <LuSearch className="text-neutral-600 text-xl absolute start-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="bg-transparent">
          <Table dir="rtl">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-indigo-50">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="py-3">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      "p-2",
                      index % 2 === 0 ? "bg-white" : "bg-indigo-50"
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4" dir="ltr">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="disabled:cursor-default cursor-pointer text-neutral-600 text-base font-normal font-['Cairo']"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="disabled:cursor-default cursor-pointer text-neutral-600 text-base font-normal font-['Cairo']"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default Index;
