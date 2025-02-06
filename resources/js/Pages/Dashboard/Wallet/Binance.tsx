import { Copy } from "lucide-react";
import { arrayBufferToBase64, asset } from "@/lib/utils";
import TextInput from "@/components/ui/TextInput";
import InputLabel from "@/components/ui/InputLabel";
import InputError from "@/components/ui/InputError";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export const Binance = () => {
  const { data, setData, post, errors, reset, processing } = useForm({
    fields: {} as { [key: string]: string | number | any },
    screenshot: "",
    amount: "",
    payment_method: "binance",
  });

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
        setData("screenshot", result);
      } else if (result instanceof ArrayBuffer) {
        const convertedImage = arrayBufferToBase64(result);
        setData("screenshot", convertedImage);
      }
      event.target.value = "";
    };
  };

  const handleFieldChange = (fieldKey: string, value: any) => {
    setData("fields", {
      ...data.fields,
      [fieldKey]: value,
    });
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("wallet.store"));

    if (!processing && Object.keys(errors).length === 0) {
      reset();
      toast({
        title: "Success Message",
        description: "Wallet created successfully",
        variant: "success",
      });
    }
  };

  return (
    <>
      <Toaster />
      <div className="grid grid-cols-4 items-center gap-4">
        <div className="col-span-3">
          <h3 className="text-stone-800 text-2xl font-semibold font-['Cairo']">
            Binance
          </h3>
          <p className="text-stone-800 text-base font-semibold font-['Cairo'] mt-2">
            يمكنك التحويل علي الايدي التالي
          </p>
          <div className="flex gap-5">
            <div className="flex mt-2 gap-2 items-center">
              <p className="inline-block bg-gray-800 px-3 py-1.5 text-white rounded-xl">
                550292503
              </p>
              <button
                className="bg-gray-800 p-2 size-9 flex justify-center items-center text-white rounded-full"
                onClick={() => navigator.clipboard.writeText("550292503")}
              >
                <Copy />
              </button>
            </div>
          </div>
          <p className="text-stone-800 text-base font-semibold font-['Cairo'] mt-2">
            يمكنك التحويل علي الحساب الاتية
          </p>
          <ul className="flex flex-col gap-2 list-decimal mt-4 ps-4">
            <li className="text-stone-800 text-base font-semibold font-['Cairo']">
              انسخ الايدي الي في الاعلي
            </li>
            <li className="text-stone-800 text-base font-semibold font-['Cairo']">
              قم بدخول علي تطبيق Binance وارسل المبلغ الذي تريد تحويله
            </li>
            <li className="text-stone-800 text-base font-semibold font-['Cairo']">
              ارسل صورة من التحويل (Screen Shot)
            </li>
            <li className="text-stone-800 text-base font-semibold font-['Cairo']">
              قم بكتابة المبلغ الذي حولته
            </li>
            <li className="text-stone-800 text-base font-semibold font-['Cairo']">
              قم بضغط علي زر التحويل
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <img src={asset("images/binance.png")} alt="" className="w-full" />
        </div>
        <div className="col-span-3">
          <h4 className="text-stone-800 text-xl font-semibold font-['Cairo']">
            برجاء ادخال جميع الحقول المطلوبة
          </h4>
          <form action="#" onSubmit={submit} className="mt-3 space-y-2">
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="name_en" className="text-right">
                صورة التحويل (Screen Shot)
              </InputLabel>
              <div className="col-span-3 col-start-2 flex gap-4 items-center">
                {data.screenshot && (
                  <img
                    className="h-16 w-16 object-cover rounded-lg"
                    src={data.screenshot}
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
                  message={errors.screenshot}
                  className="col-span-3 col-start-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="name_en" className="text-right">
                المبلغ الذي حولته
              </InputLabel>
              <TextInput
                id="amount"
                className="col-span-3 !py-2"
                placeholder="ادخل المبلغ"
                value={data.amount}
                onChange={(e) => setData("amount", e.target.value)}
              />
              <InputError
                message={errors.amount}
                className="col-span-3 col-start-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="binance_account_name" className="text-right">
                اسم الحساب الذي قمت بتحويل منه
              </InputLabel>
              <TextInput
                id="binance_account_name"
                className="col-span-3 !py-2"
                value={data.fields.binance_account_name}
                placeholder="ادخل اسم الحساب"
                onChange={(e) =>
                  handleFieldChange("binance_account_name", e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <button
                className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600"
                type="submit"
              >
                <span className="text-white text-base font-semibold font-['Cairo']">
                  تحويل
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
