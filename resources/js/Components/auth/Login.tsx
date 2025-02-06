import { useEffect, FormEventHandler } from "react";
import Checkbox from "@/components/ui/Checkbox";
import InputError from "@/components/ui/InputError";
import InputLabel from "@/components/ui/InputLabel";
import TextInput from "@/components/ui/TextInput";
import { useForm } from "@inertiajs/react";

export const Login = ({ setTab }: { setTab: (tab: string) => void }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <div className="px-6 py-20 bg-stone-50 rounded-3xl w-[471px]">
      <h4 className="text-stone-800 text-3xl font-semibold font-['Cairo']">
        اهلا بك!
      </h4>
      <p className="text-stone-800 text-base font-normal font-['Cairo'] mt-3">
        تسجيل الدخول
      </p>
      <form onSubmit={submit} className="mt-8 space-y-5">
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

        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) => setData("remember", e.target.checked)}
            />
            <span className="ms-2 text-stone-800 text-xs font-normal font-['Cairo']">
              تذكرني
            </span>
          </label>
          {/* <Link
              href={route("password.request")}
              className="text-indigo-50 text-xs font-normal font-['Cairo']"
            >
              نسيت كلمه المرور
            </Link> */}
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
        ليس لديك حساب؟{" "}
        <button
          type="button"
          className="text-blue-600 text-base font-normal font-['Cairo'] cursor-pointer"
          onClick={() => setTab("register")}
        >
          إنشاء حساب
        </button>
      </p>
    </div>
  );
};
