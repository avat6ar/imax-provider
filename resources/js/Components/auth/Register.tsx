import { useEffect, FormEventHandler, useState } from "react";
import InputError from "@/components/ui/InputError";
import InputLabel from "@/components/ui/InputLabel";
import TextInput from "@/components/ui/TextInput";
import { useForm } from "@inertiajs/react";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";

export const Register = ({ setTab }: { setTab: (tab: string) => void }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const submit: FormEventHandler = async (e) => {
    e.preventDefault();
    post(route("register"));
    if (!loading && Object.keys(errors).length == 0) {
      reset();
      toast({
        title: "Success Message",
        description:
          "Your account has been created successfully. It is awaiting admin approval.",
        variant: "success",
      });
    }
  };

  useEffect(() => {
    if (processing) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [processing]);

  return (
    <div className="px-6 py-20 bg-stone-50 rounded-3xl w-[471px]">
      <Toaster />
      <h4 className="text-stone-800 text-3xl font-semibold font-['Cairo']">
        اهلا بك!
      </h4>
      <p className="text-stone-800 text-base font-normal font-['Cairo'] mt-3">
        انشاء حساب
      </p>
      <form onSubmit={submit} className="mt-8 space-y-5">
        <div>
          <InputLabel htmlFor="name" value="الاسم" />

          <TextInput
            id="name"
            type="text"
            name="name"
            value={data.name}
            className="mt-2 block w-full"
            autoComplete="name"
            placeholder="الاسم"
            onChange={(e) => setData("name", e.target.value)}
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="email" value="البريد الاكتروني" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-2 block w-full"
            autoComplete="username"
            placeholder="البريد الاكتروني"
            onChange={(e) => setData("email", e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="phone" value="رقم الهاتف" />

          <TextInput
            id="phone"
            type="text"
            name="phone"
            value={data.phone}
            className="mt-2 block w-full"
            autoComplete="phone"
            placeholder="رقم الهاتف"
            onChange={(e) => setData("phone", e.target.value)}
          />

          <InputError message={errors.phone} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="password" value="كلمة المرور" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-2 block w-full"
            autoComplete="current-password"
            placeholder="كلمة المرور"
            onChange={(e) => setData("password", e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="password_confirmation" value="كلمة المرور" />

          <TextInput
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-2 block w-full"
            placeholder="تأكيد كلمة المرور"
            onChange={(e) => setData("password_confirmation", e.target.value)}
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-10">
          <button
            type="submit"
            className="w-full px-5 py-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600 justify-center items-center flex"
            disabled={processing}
          >
            <span className="text-white text-base font-normal font-['Cairo']">
              تسجيل الدخول
            </span>
          </button>
        </div>
      </form>

      <p className=" mt-10 text-center text-stone-800 text-base font-normal font-['Cairo']">
        هل لديك حساب؟{" "}
        <button
          type="button"
          className="text-blue-600 text-base font-normal font-['Cairo'] cursor-pointer"
          onClick={() => setTab("login")}
        >
          تسجيل الدخول
        </button>
      </p>
    </div>
  );
};
