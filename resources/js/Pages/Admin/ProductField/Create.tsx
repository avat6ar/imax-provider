import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import InputError from "@/components/ui/InputError";
import InputLabel from "@/components/ui/InputLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TextArea from "@/components/ui/TextArea";
import TextInput from "@/components/ui/TextInput";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Product } from "@/types/dashboard";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

const Create = ({ products }: { products: Product[] }) => {
  const { reset, post, processing, errors, data, setData } = useForm({
    title_en: "",
    title_ar: "",
    title_ru: "",
    product_id: "",
    type: "text",
    key: "",
    options: "",
    required: true,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("admin.product-fields.store"));

    if (processing && Object.keys(errors).length === 0) {
      reset();
      toast({
        title: "Success Message",
        description: "Product field created successfully",
        variant: "success",
      });
    }
  };

  return (
    <Authenticated>
      <Toaster />
      <Head title="ddd" />
      <div className="w-full rounded-xl bg-white py-6 px-3 space-y-3" dir="ltr">
        <h2 className="text-stone-800 text-2xl font-semibold font-['Cairo']">
          Create a new Product Field
        </h2>
        <form action="#" onSubmit={submit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="product_id" className="text-right">
                Product
              </InputLabel>
              <Select onValueChange={(e) => setData("product_id", e)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chose product" />
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
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="key" className="text-right">
                Key
              </InputLabel>
              <TextInput
                id="key"
                value={data.key}
                className="col-span-3"
                onChange={(e) => setData("key", e.target.value)}
                placeholder="Enter Title English"
              />
              <InputError
                message={errors.title_en}
                className="col-span-3 col-start-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="title_en" className="text-right">
                Title English
              </InputLabel>
              <TextInput
                id="title_en"
                value={data.title_en}
                className="col-span-3"
                onChange={(e) => setData("title_en", e.target.value)}
                placeholder="Enter Title English"
              />
              <InputError
                message={errors.title_en}
                className="col-span-3 col-start-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="title_ar" className="text-right">
                Title Arabic
              </InputLabel>
              <TextInput
                id="title_ar"
                value={data.title_ar}
                className="col-span-3"
                onChange={(e) => setData("title_ar", e.target.value)}
                placeholder="Enter Title Arabic"
              />
              <InputError
                message={errors.title_ar}
                className="col-span-3 col-start-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="title_ru" className="text-right">
                Title Russia
              </InputLabel>
              <TextInput
                id="title_ru"
                value={data.title_ru}
                className="col-span-3"
                onChange={(e) => setData("title_ru", e.target.value)}
                placeholder="Enter Title Russia"
              />
              <InputError
                message={errors.title_ru}
                className="col-span-3 col-start-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="type" className="text-right">
                Type
              </InputLabel>
              <Select
                onValueChange={(e) => setData("type", e)}
                value={data.type}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chose type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                </SelectContent>
              </Select>
              <InputError
                message={errors.type}
                className="col-span-3 col-start-2"
              />
            </div>
            {data.type == "select" && (
              <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
                <InputLabel htmlFor="options" className="text-right">
                  Options
                </InputLabel>
                <TextArea
                  id="options"
                  value={data.options}
                  className="col-span-3"
                  onChange={(e) => setData("options", e.target.value)}
                  placeholder="Enter options separated by newlines"
                />
                <InputError
                  message={errors.options}
                  className="col-span-3 col-start-2"
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
            <InputLabel htmlFor="required" className="text-right">
              Required
            </InputLabel>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                id="required"
                type="checkbox"
                name="email"
                value="1"
                className="peer sr-only"
                onChange={(e) => setData("required", e.target.checked)}
                {...(data.required ? { checked: true } : {})}
              />
              <label htmlFor="required" className="hidden"></label>
              <div className="peer h-4 w-11 rounded border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-md after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
            </label>
            <InputError
              message={errors.required}
              className="col-span-3 col-start-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600"
              type="submit"
            >
              <span className="text-white text-base font-semibold font-['Cairo']">
                Store
              </span>
            </button>
          </div>
        </form>
      </div>
    </Authenticated>
  );
};

export default Create;
