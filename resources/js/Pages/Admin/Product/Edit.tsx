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
import { Category, Product } from "@/types/dashboard";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

const Edit = ({
  product,
  categories,
}: {
  product: Product;
  categories: Category[];
}) => {
  const { reset, put, processing, errors, data, setData } = useForm({
    title_en: product.title_en,
    title_ar: product.title_ar,
    title_ru: product.title_ru,
    description_en: product.description_en,
    description_ar: product.description_ar,
    description_ru: product.description_ru,
    category_id: product.category_id.toString(),
    image: product.image,
    price: product.price.toString(),
    status: product.status,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("admin.products.update", { id: product.id }));

    if (processing && Object.keys(errors).length === 0) {
      reset();
      toast({
        title: "Success Message",
        description: "Product updated successfully",
        variant: "success",
      });
    }
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    const validImageTypes = ["image/jpeg", "image/png"];

    if (!validImageTypes.includes(file.type)) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result;
      if (result && typeof result === "string") {
        setData("image", result);
      } else if (result instanceof ArrayBuffer) {
        const convertedImage = arrayBufferToBase64(result);
        setData("image", convertedImage);
      }
      event.target.value = "";
    };
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const binary = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${binary}`;
  };

  return (
    <Authenticated>
      <Toaster />
      <Head title="Edit Product" />
      <div className="w-full rounded-xl bg-white py-6 px-3 space-y-3" dir="ltr">
        <h2 className="text-stone-800 text-2xl font-semibold font-['Cairo']">
          Edit Product
        </h2>
        <form action="#" onSubmit={submit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <div className="col-span-3 col-start-2 flex gap-4 items-center">
                {data.image && (
                  <img
                    className="h-16 w-16 object-cover rounded-lg"
                    src={data.image}
                    alt="Current product image"
                  />
                )}
                <label className="block">
                  <span className="sr-only">Choose image</span>
                  <input
                    type="file"
                    className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                    onChange={onImageChange}
                  />
                </label>
                <InputError
                  message={errors.image}
                  className="col-span-3 col-start-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="category_id" className="text-right">
                Category
              </InputLabel>
              <Select
                value={data.category_id}
                onValueChange={(e) => setData("category_id", e)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name_en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputError
                message={errors.category_id}
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
            {/* Title Russian */}
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="title_ru" className="text-right">
                Title Russian
              </InputLabel>
              <TextInput
                id="title_ru"
                value={data.title_ru}
                className="col-span-3"
                onChange={(e) => setData("title_ru", e.target.value)}
                placeholder="Enter Title Russian"
              />
              <InputError
                message={errors.title_ru}
                className="col-span-3 col-start-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="description_en" className="text-right">
                Description English
              </InputLabel>
              <TextArea
                id="description_en"
                value={data.description_en}
                className="col-span-3"
                onChange={(e) => setData("description_en", e.target.value)}
                placeholder="Enter Description English"
              />
              <InputError
                message={errors.description_en}
                className="col-span-3 col-start-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="description_ar" className="text-right">
                Description Arabic
              </InputLabel>
              <TextArea
                id="description_ar"
                value={data.description_ar}
                className="col-span-3"
                onChange={(e) => setData("description_ar", e.target.value)}
                placeholder="Enter Description Arabic"
              />
              <InputError
                message={errors.description_ar}
                className="col-span-3 col-start-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="description_ru" className="text-right">
                Description Russian
              </InputLabel>
              <TextArea
                id="description_ru"
                value={data.description_ru}
                className="col-span-3"
                onChange={(e) => setData("description_ru", e.target.value)}
                placeholder="Enter Description Russian"
              />
              <InputError
                message={errors.description_ru}
                className="col-span-3 col-start-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="price" className="text-right">
                Price
              </InputLabel>
              <TextInput
                id="price"
                value={data.price}
                className="col-span-3"
                onChange={(e) => setData("price", e.target.value)}
                placeholder="Enter Price"
              />
              <InputError
                message={errors.price}
                className="col-span-3 col-start-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="phone" className="text-right">
                Status
              </InputLabel>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  id="switch-3"
                  type="checkbox"
                  name="email"
                  value="1"
                  className="peer sr-only"
                  onChange={(e) => setData("status", e.target.checked)}
                  {...(data.status ? { checked: true } : {})}
                />
                <label htmlFor="switch-3" className="hidden"></label>
                <div className="peer h-4 w-11 rounded border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-md after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
              </label>
              <InputError
                message={errors.status}
                className="col-span-3 col-start-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600"
                type="submit"
              >
                <span className="text-white text-base font-semibold font-['Cairo']">
                  Update
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Authenticated>
  );
};

export default Edit;
