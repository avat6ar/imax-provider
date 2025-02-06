import { useEffect, useState } from "react";
import { ProductCard } from "@/components/cards/ProductCard";
import InputLabel from "@/components/ui/InputLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TextInput from "@/components/ui/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Product, Region } from "@/types/dashboard";
import { Head, router, useForm } from "@inertiajs/react";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { asset } from "@/lib/utils";

const Show = ({
  product,
  products,
  regions,
}: {
  product: Product;
  products: Product[];
  regions: Region[];
}) => {
  const { reset, post, processing, data, setData } = useForm({
    product_id: product.id,
    fields: {} as { [key: string]: string | number | any },
  });

  const [region, setRegion] = useState(product.region_id?.toString());
  const [regionProducts, setRegionProducts] = useState<Product[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const selectedRegion = regions.find((r) => r.id.toString() == region);
    if (selectedRegion) {
      setRegionProducts(selectedRegion.products);
    } else {
      setRegionProducts([]);
    }
  }, [region, regions]);

  const handleFieldChange = (fieldKey: string, value: any) => {
    setData("fields", {
      ...data.fields,
      [fieldKey]: value,
    });
    if (value) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[fieldKey];
        return newErrors;
      });
    }
  };

  const validateFields = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    product.fields.forEach((field) => {
      if (!data.fields[field.key]) {
        valid = false;
        newErrors[field.key] = `Please enter ${field.title_en}`;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      post(route("orders.store"));

      if (!processing) {
        reset();
        toast({
          title: "Success Message",
          description: "Order created successfully",
          variant: "success",
        });
      }
    }
  };

  return (
    <Authenticated>
      <Toaster />
      <Head title="ddd" />
      <section className="w-full">
        <div className="grid grid-cols-3 gap-8 items-center">
          <div className="col-span-2">
            <h2 className="text-stone-800 text-2xl font-bold font-['Cairo']">
              {product.title_en}
            </h2>
            <p className="text-neutral-600 text-lg font-semibold font-['Cairo']">
              {product.category_name}
            </p>
            <p className="text-neutral-900 text-base font-semibold font-['Cairo']">
              {product.description_en}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {regions.length > 0 && (
                <div dir="ltr" className="space-y-2">
                  <InputLabel
                    htmlFor="regions"
                    value="Regions"
                    className="text-lg capitalize"
                  />

                  <>
                    <Select
                      onValueChange={(value) => setRegion(value)}
                      value={region}
                      defaultValue={product.region_id?.toString()}
                    >
                      <SelectTrigger className="w-full bg-white border-none text-neutral-400">
                        <SelectValue placeholder="Choose Region" />
                      </SelectTrigger>
                      <SelectContent className="w-full bg-white border-none text-neutral-400">
                        {regions.map((region) => (
                          <SelectItem
                            key={region.id}
                            value={region.id.toString()}
                          >
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                </div>
              )}
              {regions.length > 0 && (
                <div dir="ltr" className="space-y-2">
                  <InputLabel
                    htmlFor="regionProducts"
                    value="Values"
                    className="text-lg capitalize"
                  />
                  <Select
                    onValueChange={(value) =>
                      router.visit(`/products/${value}`)
                    }
                    defaultValue={product.slug}
                  >
                    <SelectTrigger className="w-full bg-white border-none text-neutral-400">
                      <SelectValue placeholder="Choose Product" />
                    </SelectTrigger>
                    <SelectContent className="w-full bg-white border-none text-neutral-400">
                      {regionProducts.map((product) => (
                        <SelectItem key={product.id} value={product.slug}>
                          {product.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {product.fields.map((field) => {
                const options = field.options ? JSON.parse(field.options) : [];
                return (
                  <div key={field.key} dir="ltr" className="space-y-2">
                    <InputLabel
                      htmlFor={field.key}
                      value={field.title_en}
                      className="text-lg capitalize"
                    />

                    {field.type == "text" ? (
                      <>
                        <TextInput
                          id={field.key}
                          type="text"
                          name={field.key}
                          className="mt-2 block w-full"
                          placeholder={"Enter " + field.title_en}
                          onChange={(e) =>
                            handleFieldChange(field.key, e.target.value)
                          }
                        />
                        {errors[field.key] && (
                          <p className="text-red-500 text-sm">
                            {errors[field.key]}
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <Select
                          onValueChange={(value) =>
                            handleFieldChange(field.key, value)
                          }
                          value={data.fields[field.key]}
                        >
                          <SelectTrigger className="w-full bg-white border-none text-neutral-400">
                            <SelectValue
                              placeholder={"Enter " + field.title_en}
                            />
                          </SelectTrigger>
                          <SelectContent className="w-full bg-white border-none text-neutral-400">
                            {options.map((option: any) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors[field.key] && (
                          <p className="text-red-500 text-sm">
                            {errors[field.key]}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-2 mt-6 gap-6">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600"
              >
                <span className="text-white text-base font-semibold font-['Cairo']">
                  شراء
                </span>
              </button>
              <p
                className="text-stone-800 text-lg font-bold font-['Cairo']"
                dir="ltr"
              >
                {product.price} <span className="text-base">USD</span>
              </p>
            </div>
          </div>
          <img
            src={asset(product.image)}
            alt={product.title_en}
            className="w-full rounded-xl object-cover h-[340px]"
          />
        </div>
      </section>
      <section className="mt-8 w-full">
        <h4 className="text-stone-800 text-xl font-bold font-['Cairo']">
          منتجات مشابهه
        </h4>
        <div className="grid grid-cols-4 gap-6 mt-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Authenticated>
  );
};

export default Show;
