import { ProductCard } from "@/components/cards/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/types/dashboard";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";

export const Products = ({ products }: { products: Product[] }) => {

  const { get, data, errors, processing, reset, setData } = useForm({
    search: "",
    select: "",
  });
  return (
    <section className="mt-6 w-full">
      <h3 className="text-stone-800 text-base font-medium font-['Cairo']">
        المنتجات
      </h3>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              name="search"
              id="search"
              className="px-10 py-2 bg-white rounded-xl border text-neutral-600 text-base font-normal font-['Cairo'] focus-visible:outline-none w-96"
              placeholder="بحث..."
            />
            <LuSearch className="text-neutral-600 text-xl absolute start-3 top-1/2 -translate-y-1/2" />
          </div>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600">
            <span className="text-white text-base font-semibold font-['Cairo']">
              بحث
            </span>
          </button>
        </div>
        <div className="flex gap-4 items-center">
          <h5 className="text-stone-800 text-base font-semibold font-['Cairo']">
            القسم
          </h5>
          <Select
            onValueChange={(value) => setData("select", value)}
            defaultValue={data.select}
            dir="rtl"
          >
            <SelectTrigger className="w-52 bg-white border-none text-neutral-400">
              <SelectValue placeholder="اختار" />
            </SelectTrigger>
            <SelectContent className="w-52 bg-white border-none text-neutral-400">
              <SelectItem value="m@example.com">m@example.com</SelectItem>
              <SelectItem value="m@google.com">m@google.com</SelectItem>
              <SelectItem value="m@support.com">m@support.com</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
