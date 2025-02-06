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
import { Product } from "@/types/dashboard";
import { Head, Link } from "@inertiajs/react";
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
import { LuSearch, LuTrash } from "react-icons/lu";
import { format } from "date-fns";
import { Toaster } from "@/components/ui/toaster";
import { LucideEdit3 } from "lucide-react";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <img
        className="h-16 w-16 object-cover rounded-lg"
        src={row.getValue("image")}
        alt="Current product image"
      />
    ),
  },
  {
    accessorKey: "title_en",
    header: "Title En",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title_en")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="text-start">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="capitalize">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-start">Status</div>,
    cell: ({ row }) => {
      const status = parseFloat(row.getValue("status"));
      if (status) {
        return (
          <div className="capitalize bg-green-600/80 text-white p-2 rounded-xl inline-block">
            Active
          </div>
        );
      }

      return (
        <div className="capitalize bg-red-600/80 text-white p-2 rounded-xl inline-block">
          Inactive
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex gap-4 items-center">
        <Link
          href={route("admin.products.edit", row.getValue("id"))}
          className="cursor-pointer"
        >
          <LucideEdit3 className="text-blue-600 size-5" />
        </Link>
        <Link
          href={route("admin.products.destroy", row.getValue("id"))}
          method="delete"
          as="button"
          className="cursor-pointer"
        >
          <LuTrash className="text-red-600 size-5" />
        </Link>
      </div>
    ),
  },
];

const Index = ({ products }: { products: Product[] }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: products,
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
          المنتجات
        </h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                name="search"
                id="search"
                className="px-10 py-2 bg-white rounded-xl border text-neutral-600 text-base font-normal font-['Cairo'] focus-visible:outline-none w-96"
                placeholder="بحث..."
                value={
                  (table.getColumn("title_en")?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) =>
                  table
                    .getColumn("title_en")
                    ?.setFilterValue(event.target.value)
                }
              />
              <LuSearch className="text-neutral-600 text-xl absolute start-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <Link
            href={route("admin.products.create")}
            className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600"
          >
            <span className="text-white text-base font-semibold font-['Cairo']">
              Create
            </span>
          </Link>
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
