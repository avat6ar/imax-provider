import React from "react";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import i18n from "@/i18n";
import { LuClipboardCheck, LuHeartHandshake } from "react-icons/lu";
import { FaBox, FaFire, FaUser, FaWallet } from "react-icons/fa";
import { SlEarphonesAlt, SlScreenTablet } from "react-icons/sl";
import { IoEarthSharp } from "react-icons/io5";
import { IoIosFlash } from "react-icons/io";
import { HiOutlineStar } from "react-icons/hi";
import { asset } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Login } from "@/components/auth/Login";
import { Register } from "@/components/auth/Register";
import Guest from "@/Layouts/GuestLayout";

export default function Welcome({
  canResetPassword,
  locale,
}: PageProps<{ canResetPassword: boolean; locale: string }>) {
  const { t } = useTranslation("");
  const [tab, setTab] = useState("login");

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <Guest>
      <Head title="Welcome" />
      <section className="w-full">
        <div className="container">
          <div className="flex items-center gap-14">
            <div className="flex-1">
              <h1 className="text-blue-600 text-5xl font-bold font-['Cairo'] leading-relaxed">
                ايماكس بانل جميع خدمات الكرتونية في مكان واحد فقط
              </h1>
              <p className="text-stone-800 text-2xl font-semibold font-['Cairo'] mt-4">
                لدينا افضل واسرع الخدمات نحن نقدم الخدمة بسياسة أسعار في متناول
                الجميع
              </p>
              <div className="mt-16 flex gap-6">
                <button className="w-40 px-5 py-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600 justify-center items-center flex">
                  <span className="text-white text-base font-semibold font-['Cairo']">
                    الخدمات
                  </span>
                </button>
              </div>
              <div className="mt-16 flex gap-6">
                <div className="flex gap-1.5 items-center">
                  <div className="p-2 bg-blue-600 rounded-xl flex-col justify-center items-center flex w-16 h-14">
                    <LuClipboardCheck className="text-4xl text-white" />
                  </div>
                  <div className="text-center space-y-1">
                    <span className="text-right text-stone-800 text-lg font-normal font-['Cairo']">
                      +13254
                    </span>
                    <div className="text-right text-neutral-400 text-base font-normal font-['Cairo']">
                      طلبات مكتمله
                    </div>
                  </div>
                </div>
                <div className="flex gap-1.5 items-center">
                  <div className="p-2 bg-blue-600 rounded-xl flex-col justify-center items-center flex w-16 h-14">
                    <LuHeartHandshake className="text-4xl text-white" />
                  </div>
                  <div className="text-center space-y-1">
                    <span className="text-right text-stone-800 text-lg font-normal font-['Cairo']">
                      +13254
                    </span>
                    <div className="text-right text-neutral-400 text-base font-normal font-['Cairo']">
                      عملاء يثقون بنا
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Tabs value={tab} dir={"rtl"}>
              <TabsContent value="login">
                <Login setTab={setTab} />
              </TabsContent>
              <TabsContent value="register">
                <Register setTab={setTab} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      <section className="w-full mt-24">
        <div className="container">
          <div className="text-center space-y-3">
            <h2 className="text-stone-800 text-5xl font-semibold font-['Cairo']">
              كيفية الاستخدام
            </h2>
            <p className="text-neutral-400 text-2xl font-semibold font-['Cairo']">
              أربع خطوات للارتقاء علي مواقع التواصل الاجتماعي
            </p>
          </div>
          <div className="grid mt-8 grid-cols-4 gap-5">
            <div className="p-6 bg-stone-50 rounded-xl flex flex-col justify-center items-center gap-12">
              <div className="p-5 bg-blue-600 rounded-full justify-center items-center flex">
                <FaUser className="text-white text-5xl" />
              </div>
              <div className="space-y-3 text-center">
                <h5 className="text-stone-800 text-xl font-normal font-['Cairo']">
                  انشئ حساب
                </h5>
                <p className="text-neutral-400 text-base font-normal font-['Cairo']">
                  ابدأ بالتسجيل ثم سجل الدخول إلى حسابك
                </p>
              </div>
            </div>
            <div className="p-6 bg-stone-50 rounded-xl flex flex-col justify-center items-center gap-12">
              <div className="p-5 bg-blue-600 rounded-full justify-center items-center flex">
                <FaWallet className="text-white text-5xl" />
              </div>
              <div className="space-y-3 text-center">
                <h5 className="text-stone-800 text-xl font-normal font-['Cairo']">
                  إضافة الأموال
                </h5>
                <p className="text-neutral-400 text-base font-normal font-['Cairo']">
                  الخطوة التالية هي اختيار طريقة الدفع وإضافة الأموال
                </p>
              </div>
            </div>
            <div className="p-6 bg-stone-50 rounded-xl flex flex-col justify-center items-center gap-12">
              <div className="p-5 bg-blue-600 rounded-full justify-center items-center flex">
                <FaBox className="text-white text-5xl" />
              </div>
              <div className="space-y-3 text-center">
                <h5 className="text-stone-800 text-xl font-normal font-['Cairo']">
                  اختر خدمة
                </h5>
                <p className="text-neutral-400 text-base font-normal font-['Cairo']">
                  اختر الخدمات التي تريدها وقم بسهولة بوضع طلباتك
                </p>
              </div>
            </div>
            <div className="p-6 bg-stone-50 rounded-xl flex flex-col justify-center items-center gap-12">
              <div className="p-5 bg-blue-600 rounded-full justify-center items-center flex">
                <FaFire className="text-white text-5xl" />
              </div>
              <div className="space-y-3 text-center">
                <h5 className="text-stone-800 text-xl font-normal font-['Cairo']">
                  استمتع بنتائج رائعة
                </h5>
                <p className="text-neutral-400 text-base font-normal font-['Cairo']">
                  سيتم إبلاغك بمجرد اكتمال طلبك!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full mt-24">
        <div className="container">
          <div className="text-center space-y-3">
            <h2 className="text-stone-800 text-5xl font-bold font-['Cairo']">
              لماذا تختار موقعنا
            </h2>
            <p className="text-neutral-400 text-2xl font-semibold font-['Cairo']">
              هناك العديد من الأسباب التي تجعل موقعنا دائمًا في المقدمة
            </p>
          </div>
          <div className="grid grid-cols-5 gap-6 items-center mt-8">
            <div className="col-span-3">
              <ul className="flex flex-col gap-6">
                <li className="flex justify-start items-center gap-4">
                  <div className="rounded-full w-16 h-16 bg-blue-600 flex justify-center items-center">
                    <SlScreenTablet className="text-white text-3xl" />
                  </div>
                  <div className="space-y-3">
                    <h5 className="text-stone-800 text-xl font-normal font-['Cairo']">
                      متوافق مع الأجهزة المحمولة
                    </h5>
                    <p className="text-neutral-400 text-base font-normal font-['Cairo']">
                      ستتمتع بتجربة فريدة مع الواجهة المتوافقة مع كافة الأجهزة
                    </p>
                  </div>
                </li>
                <li className="flex justify-start items-center gap-4">
                  <div className="rounded-full w-16 h-16 bg-blue-600 flex justify-center items-center">
                    <IoEarthSharp className="text-white text-3xl" />
                  </div>
                  <div className="space-y-3">
                    <h5 className="text-stone-800 text-xl font-normal font-['Cairo']">
                      خدمات دولية
                    </h5>
                    <p className="text-neutral-400 text-base font-normal font-['Cairo']">
                      لقد اخترنا لك بعناية خدمات من جميع أنحاء العالم.
                    </p>
                  </div>
                </li>
                <li className="flex justify-start items-center gap-4">
                  <div className="rounded-full w-16 h-16 bg-blue-600 flex justify-center items-center">
                    <IoIosFlash className="text-white text-3xl" />
                  </div>
                  <div className="space-y-3">
                    <h5 className="text-stone-800 text-xl font-normal font-['Cairo']">
                      ارسال فوري
                    </h5>
                    <p className="text-neutral-400 text-base font-normal font-['Cairo']">
                      خدماتنا ترسل لحظيا دون اي مشاكل
                    </p>
                  </div>
                </li>
                <li className="flex justify-start items-center gap-4">
                  <div className="rounded-full w-16 h-16 bg-blue-600 flex justify-center items-center">
                    <HiOutlineStar className="text-white text-3xl" />
                  </div>
                  <div className="space-y-3">
                    <h5 className="text-stone-800 text-xl font-normal font-['Cairo']">
                      جودة عالية
                    </h5>
                    <p className="text-neutral-400 text-base font-normal font-['Cairo']">
                      نحن نقدم أفضل خدمة من خلال اختبار وتحديث الخدمات باستمرار
                      على موقعنا
                    </p>
                  </div>
                </li>
                <li className="flex justify-start items-center gap-4">
                  <div className="rounded-full w-16 h-16 bg-blue-600 flex justify-center items-center">
                    <SlEarphonesAlt className="text-white text-3xl" />
                  </div>
                  <div className="space-y-3">
                    <h5 className="text-stone-800 text-xl font-normal font-['Cairo']">
                      دعم احترافي
                    </h5>
                    <p className="text-neutral-400 text-base font-normal font-['Cairo']">
                      ينتظرك فريقنا المحترف الذي يعمل على مدار الساعة طوال أيام
                      الأسبوع للرد على جميع أسئلتك ومشاكلك
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full mt-24">
        <div className="container">
          <div className="text-center space-y-3">
            <h2 className="text-stone-800 text-5xl font-bold font-['Cairo']">
              طرق دفع آمنة
            </h2>
            <p className="text-neutral-400 text-2xl font-semibold font-['Cairo']">
              لدينا كل طرق الدفع الشائعة. ويمكن إدراج المزيد عند الطلب
            </p>
          </div>
          <div className="flex justify-between items-center mt-8">
            <img
              src={asset("images/1.svg")}
              alt="payment method"
              loading="lazy"
            />
            <img
              src={asset("images/2.svg")}
              alt="payment method"
              loading="lazy"
            />
            <img
              src={asset("images/3.svg")}
              alt="payment method"
              loading="lazy"
            />
            <img
              src={asset("images/4.svg")}
              alt="payment method"
              loading="lazy"
            />
            <img
              src={asset("images/5.svg")}
              alt="payment method"
              loading="lazy"
            />
            <img
              src={asset("images/6.svg")}
              alt="payment method"
              loading="lazy"
            />
            <img
              src={asset("images/7.svg")}
              alt="payment method"
              loading="lazy"
            />
            <img
              src={asset("images/8.svg")}
              alt="payment method"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </Guest>
  );
}
