import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputError from "@/components/ui/InputError";
import InputLabel from "@/components/ui/InputLabel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TextInput from "@/components/ui/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import { Code, Product } from "@/types/dashboard";
import { Head, Link, router, useForm } from "@inertiajs/react";
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
import { FormEventHandler, useEffect, useState } from "react";
import { LuSearch, LuTrash } from "react-icons/lu";
import { format } from "date-fns";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { LucideEdit3 } from "lucide-react";
import TextArea from "@/components/ui/TextArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const columns: ColumnDef<Code>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <div className="capitalize">{row.getValue("code")}</div>,
  },
  {
    accessorKey: "product_title",
    header: "Product Title",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("product_title")}</div>;
    },
  },
  {
    accessorKey: "expired",
    header: () => <div className="text-start">Expired</div>,
    cell: ({ row }) => {
      const expired = parseFloat(row.getValue("expired"));
      if (!expired) {
        return (
          <div className="capitalize bg-green-600/80 text-white p-2 rounded-xl inline-block">
            Not Expired
          </div>
        );
      }

      return (
        <div className="capitalize bg-red-600/80 text-white p-2 rounded-xl inline-block">
          Expired
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
          href={route("admin.code-products.edit", row.getValue("id"))}
          className="cursor-pointer"
        >
          <LucideEdit3 className="text-blue-600 size-5" />
        </Link>
        <Link
          href={route("admin.code-products.destroy", row.getValue("id"))}
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

const Index = ({
  codes,
  products,
  code,
}: {
  codes: {data:Code[]};
  products: Product[];
  code?: Code;
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = useState(false);

  const table = useReactTable({
    data: codes.data,
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

  const { reset, post, processing, errors, put, data, setData } = useForm({
    code: "",
    product_id: "",
    codes: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("admin.code-products.store"));

    if (!processing && Object.keys(errors).length === 0) {
      reset();
      toast({
        title: "Success Message",
        description: "Category created successfully",
        variant: "success",
      });
    }
  };

  const submitEdit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("admin.code-products.update", code?.id));

    if (processing && Object.keys(errors).length === 0) {
      setOpen(false);
      toast({
        title: "Success Message",
        description: "Category updated successfully",
        variant: "success",
      });
    }
  };

  useEffect(() => {
    if (code) {
      setOpen(true);
      setData({
        ...data,
        code: code.code,
        product_id: code.product_id,
      });
    }
  }, [code]);

  return (
    <Authenticated>
      <Toaster />
      <Head title="ddd" />
      <div className="w-full rounded-xl bg-white py-6 px-3 space-y-3">
        <h2 className="text-stone-800 text-2xl font-semibold font-['Cairo']">
          الاقسام
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
                  (table.getColumn("name_en")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("name_en")?.setFilterValue(event.target.value)
                }
              />
              <LuSearch className="text-neutral-600 text-xl absolute start-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600">
                <span className="text-white text-base font-semibold font-['Cairo']">
                  Create
                </span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[555px]" dir="ltr">
              <form action="#" onSubmit={submit}>
                <DialogHeader>
                  <DialogTitle>Create a new category</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
                    <InputLabel htmlFor="codes" className="text-right">
                      Codes
                    </InputLabel>
                    <TextArea
                      id="codes"
                      className="col-span-3"
                      onChange={(e) => setData("codes", e.target.value)}
                      placeholder="Enter Codes"
                      value={data.codes}
                    />
                    <InputError
                      message={errors.codes}
                      className="col-span-3 col-start-2"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
                    <InputLabel htmlFor="category_id" className="text-right">
                      Product
                    </InputLabel>
                    <Select onValueChange={(e) => setData("product_id", e)}>
                      <SelectTrigger className="w-[350px]">
                        <SelectValue placeholder="Chose Product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem
                            key={product.id}
                            value={product.id.toString()}
                          >
                            {product.title_en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <InputError
                      message={errors.product_id}
                      className="col-span-3 col-start-2"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <button
                    className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600"
                    type="submit"
                  >
                    <span className="text-white text-base font-semibold font-['Cairo']">
                      Store
                    </span>
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          reset();
          router.get("/admin/categories");
        }}
      >
        <DialogContent className="sm:max-w-[555px]" dir="ltr">
          <form action="#" onSubmit={submitEdit}>
            <DialogHeader>
              <DialogTitle>Edit category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
                <InputLabel htmlFor="code" className="text-right">
                  Code
                </InputLabel>
                <TextInput
                  id="code"
                  value={data.code}
                  className="col-span-3"
                  onChange={(e) => setData("code", e.target.value)}
                  placeholder="Enter Code"
                />
                <InputError
                  message={errors.code}
                  className="col-span-3 col-start-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="category_id" className="text-right">
                Product
              </InputLabel>
              <Select
                onValueChange={(e) => setData("product_id", e)}
                value={data.product_id}
              >
                <SelectTrigger className="w-[350px]">
                  <SelectValue placeholder="Chose Product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.title_en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputError
                message={errors.product_id}
                className="col-span-3 col-start-2"
              />
            </div>
            <DialogFooter>
              <button
                className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600"
                type="submit"
              >
                <span className="text-white text-base font-semibold font-['Cairo']">
                  Store
                </span>
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Authenticated>
  );
};

export default Index;
