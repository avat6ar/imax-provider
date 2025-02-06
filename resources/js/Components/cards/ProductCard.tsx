import { asset } from "@/lib/utils";
import { Product } from "@/types/dashboard";
import { Link } from "@inertiajs/react";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="rounded-xl overflow-hidden">
      <img src={asset(product.image)} alt="image" className="w-full" />
      <div className="p-4 bg-white">
        <div className="flex justify-between">
          <h4 className="text-stone-800 text-xl font-semibold font-['Cairo']">
            {product.title_en}
          </h4>
          <p
            className="text-stone-800 text-base font-medium font-['Cairo']"
            dir="ltr"
          >
            {product.price} <span className="text-sm">USD</span>
          </p>
        </div>
        <p className="text-neutral-600 text-base font-normal font-['Cairo'] mt-2">
          {product.description_en.slice(0, 100)}
        </p>
        <div className="flex mt-5 justify-between items-center">
          <p
            className="text-stone-800 text-lg font-medium font-['Cairo']"
            dir="ltr"
          >
            {product.price} <span className="text-sm">USD</span>
          </p>
          <Link
            href={route("products.show", product.slug)}
            className="px-7 py-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600"
          >
            <span className="text-white text-base font-semibold font-['Cairo']">
              تفاصيل
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
