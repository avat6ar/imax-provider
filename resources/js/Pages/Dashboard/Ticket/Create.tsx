import InputError from "@/components/ui/InputError";
import InputLabel from "@/components/ui/InputLabel";
import TextArea from "@/components/ui/TextArea";
import TextInput from "@/components/ui/TextInput";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export const Create = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    subject: "",
    category: "payment",
    message: "",
    file: null as File | null,
  });

  const handleCategoryChange = (category: string) => {
    setData("category", category);
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("tickets.store"));

    if (processing && Object.keys(errors).length === 0) {
      reset();
      setData("category", "payment");
      toast({
        title: "Success Message",
        description: "Category created successfully",
        variant: "success",
      });
    }
  };

  return (
    <>
      <Toaster />
      <div className="ps-4 pe-10 py-6 bg-white rounded-xl">
        <h3 className="text-blue-600 text-2xl font-semibold font-['Cairo']">
          طلب دعم
        </h3>
        <form action="#" onSubmit={submit} className="mt-4">
          <div className="grid grid-cols-5 gap-4 items-start">
            <div className="col-span-1">
              <div className="space-y-3">
                <input
                  type="radio"
                  name="category"
                  value="payment"
                  id="payment"
                  className="hidden"
                  checked={data.category === "payment"}
                  onChange={() => handleCategoryChange("payment")}
                />
                <label
                  htmlFor="payment"
                  className="px-3 py-2 bg-indigo-50 rounded-xl border border-blue-200 justify-start items-center gap-2.5 flex"
                >
                  <span
                    className={cn(
                      "w-5 h-5 border rounded-full bg-transparent border-blue-600",
                      data.category === "payment"
                        ? "bg-blue-600"
                        : "bg-transparent"
                    )}
                  />
                  <span className="text-blue-600 text-base font-normal font-['Cairo']">
                    دفع
                  </span>
                </label>
                <input
                  type="radio"
                  name="category"
                  value="order"
                  id="order"
                  className="peer/order hidden"
                  checked={data.category === "order"}
                  onChange={() => handleCategoryChange("order")}
                />
                <label
                  htmlFor="order"
                  className="px-3 py-2 bg-indigo-50 rounded-xl border border-blue-200 justify-start items-center gap-2.5 flex"
                >
                  <span
                    className={cn(
                      "w-5 h-5 border rounded-full bg-transparent border-blue-600",
                      data.category === "order"
                        ? "bg-blue-600"
                        : "bg-transparent"
                    )}
                  />
                  <span className="text-blue-600 text-base font-normal font-['Cairo']">
                    طلب
                  </span>
                </label>
                <input
                  type="radio"
                  name="category"
                  value="other"
                  id="other"
                  className="peer/other hidden"
                  checked={data.category === "other"}
                  onChange={() => handleCategoryChange("other")}
                />
                <label
                  htmlFor="other"
                  className="px-3 py-2 bg-indigo-50 rounded-xl border border-blue-200 justify-start items-center gap-2.5 flex"
                >
                  <span
                    className={cn(
                      "w-5 h-5 border rounded-full border-blue-600",
                      data.category === "other"
                        ? "bg-blue-600"
                        : "bg-transparent"
                    )}
                  />
                  <span className="text-blue-600 text-base font-normal font-['Cairo']">
                    اخر
                  </span>
                </label>
              </div>
            </div>
            <div className="col-span-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <InputLabel htmlFor="subject" value="الموضوع" />

                  <TextInput
                    id="subject"
                    type="text"
                    name="subject"
                    value={data.subject}
                    className="block w-full"
                    placeholder="الموضوع"
                    onChange={(e) => setData("subject", e.target.value)}
                  />

                  <InputError message={errors.subject} className="mt-2" />
                </div>
                <div className="space-y-2">
                  <InputLabel htmlFor="message" value="الرسالة" />

                  <TextArea
                    id="message"
                    name="message"
                    value={data.message}
                    className="block w-full"
                    placeholder="الرسالة"
                    onChange={(e) => setData("message", e.target.value)}
                  />

                  <InputError message={errors.message} className="mt-2" />
                </div>
                <div className="space-y-2">
                  <InputLabel htmlFor="file" value="ارفاق ملف" />

                  <TextInput
                    id="file"
                    type="file"
                    name="file"
                    className="block w-full"
                    placeholder="ارفاق ملف"
                    onChange={(e) =>
                      setData("file", e.target.files ? e.target.files[0] : null)
                    }
                  />

                  <InputError message={errors.file} className="mt-2" />
                </div>
              </div>
              <div className="flex justify-start mt-5">
                <button
                  type="submit"
                  className="px-24 py-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600 justify-center items-center flex"
                  disabled={processing}
                >
                  <span className="text-white text-base font-normal font-['Cairo']">
                    ارسال
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
