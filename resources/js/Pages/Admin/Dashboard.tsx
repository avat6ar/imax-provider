import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRef } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

export default function Dashboard({
  monthlySales,
  products,
  usersCount,
  ordersCount,
  productsCount,
}: {
  monthlySales: { month: string; total_sales: number }[];
  products: Product[];
  usersCount: number;
  ordersCount: number;
  productsCount: number;
}) {
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
  const chartRef = useRef<ChartJs | null | any>(null);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: "#fff",
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Sales",
        },
      },
    },
  };

  const formattedData = {
    labels: monthlySales.map((sale) => sale.month),
    datasets: [
      {
        label: "Total Sales",
        data: monthlySales.map((sale) => sale.total_sales),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const handleDownloadImage = () => {
    if (chartRef.current) {
      const chartCanvas = chartRef.current.toBase64Image();
      const link = document.createElement("a");
      link.href = chartCanvas;
      link.download = "chart.png";
      link.click();
    } else {
      console.error("Chart reference is not available for download.");
    }
  };

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <section className="w-full">
        <div className="space-y-4">
          <h3 className="text-neutral-600 text-2xl font-semibold font-['Cairo']">
            لوحة المعلومات
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="px-3 pt-8 pb-6 bg-white rounded-xl shadow border border-white text-center">
              <div className="text-blue-600 text-2xl font-semibold font-['Cairo']">
                {usersCount}
              </div>
              <div className="text-stone-800 text-base font-normal font-['Cairo'] mt-2">
                Users
              </div>
            </div>
            <div className="px-3 pt-8 pb-6 bg-white rounded-xl shadow border border-white text-center">
              <div className="text-blue-600 text-2xl font-semibold font-['Cairo']">
                {productsCount}
              </div>
              <div className="text-stone-800 text-base font-normal font-['Cairo'] mt-2">
                Products
              </div>
            </div>
            <div className="px-3 pt-8 pb-6 bg-white rounded-xl shadow border border-white text-center">
              <div className="text-blue-600 text-2xl font-semibold font-['Cairo']">
                {ordersCount}
              </div>
              <div className="text-stone-800 text-base font-normal font-['Cairo'] mt-2">
                Orders
              </div>
            </div>
          </div>
          <div className="max-w-full p-5 bg-white rounded-xl relative">
            <div className=" h-96">
              <Line ref={chartRef} options={options} data={formattedData} />
            </div>
            <button
              onClick={handleDownloadImage}
              className=" bg-green-600 rounded z-10 py-1 px-2"
            >
              <span className="text-sm text-white font-medium font-['Cairo']">
                Save
              </span>
            </button>
          </div>
          <div className="bg-white p-5 rounded-xl">
            <h3 className="text-neutral-600 text-2xl font-semibold font-['Cairo'] mb-4">
              أهم المنتجات
            </h3>
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
        </div>
      </section>
    </AuthenticatedLayout>
  );
}
