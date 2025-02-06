import Guest from "@/Layouts/GuestLayout";
import { LuClipboardCheck, LuHeartHandshake } from "react-icons/lu";
import InputLabel from "@/components/ui/InputLabel";
import TextInput from "@/components/ui/TextInput";
import InputError from "@/components/ui/InputError";
import { FormEventHandler } from "react";
import { Link, Head, useForm } from "@inertiajs/react";
import TextArea from "@/components/ui/TextArea";

const Contact = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <Guest>
      <Head title="Contact" />
      <section className="w-full">
        <div className="container">
          <div className="flex items-center gap-14">
            <div className="flex-1">
              <h1 className="text-blue-600 text-5xl font-bold font-['Cairo']">
                تواصل معنا
              </h1>
              <p className="text-stone-800 text-2xl font-semibold font-['Cairo'] mt-4">
                إذا كنتم بحاجة إلى المزيد من المعلومات أو لديكم أي استفسارات،
                يرجى استخدام المعلومات أدناه للتواصل معنا. نحن هنا للمساعدة
                ونقدّر تواصلكم.
              </p>
              <div className="space-y-4 mt-16">
                <p className="text-stone-800 text-2xl font-normal font-['Cairo']">
                  mail@mail.com
                </p>
                <p className="text-stone-800 text-2xl font-normal font-['Cairo']">
                  +213 123456789
                </p>
              </div>
              <div className="mt-16 flex gap-6">
                <div className="flex gap-1.5 items-center">
                  <div className="p-2 bg-blue-600 rounded-xl flex-col justify-center items-center flex w-16 h-14">
                    <LuClipboardCheck className="text-4xl text-white" />
                  </div>
                  <div className="text-center space-y-1">
                    <span className="text-stone-800 text-lg font-normal font-['Cairo']">
                      +13254
                    </span>
                    <div className="text-neutral-400 text-base font-normal font-['Cairo']">
                      طلبات مكتمله
                    </div>
                  </div>
                </div>
                <div className="flex gap-1.5 items-center">
                  <div className="p-2 bg-blue-600 rounded-xl flex-col justify-center items-center flex w-16 h-14">
                    <LuHeartHandshake className="text-4xl text-white" />
                  </div>
                  <div className="text-center space-y-1">
                    <span className="text-stone-800 text-lg font-normal font-['Cairo']">
                      +13254
                    </span>
                    <div className="text-neutral-400 text-base font-normal font-['Cairo']">
                      عملاء يثقون بنا
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-20 bg-stone-50 rounded-3xl w-[471px]">
              <p className="text-stone-800 text-base font-normal font-['Cairo']">
                نحن هنا لدعمك والإجابة على جميع استفساراتك. ارسل لنا رسالة الآن،
                وسنكون سعداء بالرد عليك في أقرب وقت ممكن.
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
                    placeholder="مثال: محمد"
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
                    placeholder="mail@mail.com"
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
                    placeholder="+213 123456789"
                    onChange={(e) => setData("phone", e.target.value)}
                  />
                  <InputError message={errors.phone} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="message" value="الرسالة" />
                  <TextArea
                    id="message"
                    name="message"
                    value={data.message}
                    className="mt-2 block w-full h-28"
                    autoComplete="message"
                    placeholder="الرسالة"
                    onChange={(e) => setData("message", e.target.value)}
                  />
                  <InputError message={errors.message} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-10">
                  <button
                    className="w-full px-5 py-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600 justify-center items-center flex"
                    disabled={processing}
                  >
                    <span className="text-white text-base font-normal font-['Cairo']">
                      ارسال
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Guest>
  );
};

export default Contact;
