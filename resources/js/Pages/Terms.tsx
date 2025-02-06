import Guest from "@/Layouts/GuestLayout";
import { asset } from "@/lib/utils";
import { Head } from "@inertiajs/react";

const Terms = () => {
  return (
    <Guest>
      <Head title="Contact" />
      <section className="w-full">
        <div className="container">
          <div className="p-6 bg-stone-50 rounded-3xl flex gap-6 items-center">
            <img
              src={asset("images/animation.gif")}
              alt="animation"
              loading="lazy"
              className="-rotate-90 w-36 h-32"
            />
            <div className="flex flex-col items-stretch">
              <h3 className="text-stone-800 text-2xl font-bold font-['Cairo']">
                شروط الخدمة
              </h3>
              <p className="text-stone-800 text-base font-semibold font-['Cairo']">
                من خلال تقديم طلب فإنك تقبل تلقائيًا جميع شروط الخدمة المدرجة
                أدناه سواء قرأتها أم لا
              </p>
            </div>
          </div>
          <div className="mt-24">
            <div className="p-6 bg-stone-50 rounded-3xl">
              <h2 className="text-stone-800 text-5xl font-bold font-['Cairo'] text-center">
                شروط الخدمة
              </h2>
              <ul className="mt-14 space-y-12">
                <li>
                  <h3 className="text-stone-800 text-2xl font-semibold font-['Cairo'] relative ps-6 before:absolute before:start-0 before:top-0 before:w-3 before:h-full before:bg-blue-600 before:rounded-xl">
                    الخدمات
                  </h3>
                  <p className="mt-5 text-stone-800 text-lg font-medium font-['Cairo']">
                    لن تستخدم موقع الويب الخاص بنا إلا بطريقة تتبع جميع
                    الاتفاقيات المبرمة مع جميع مواقع العاب على صفحة شروط الخدمة
                    الفردية الخاصة بها.
                  </p>
                </li>
                <li>
                  <h3 className="text-stone-800 text-2xl font-semibold font-['Cairo'] relative ps-6 before:absolute before:start-0 before:top-0 before:w-3 before:h-full before:bg-blue-600 before:rounded-xl">
                    الخدمات
                  </h3>
                  <p className="mt-5 text-stone-800 text-lg font-medium font-['Cairo']">
                    لن تستخدم موقع الويب الخاص بنا إلا بطريقة تتبع جميع
                    الاتفاقيات المبرمة مع جميع مواقع العاب على صفحة شروط الخدمة
                    الفردية الخاصة بها.
                  </p>
                </li>
                <li>
                  <h3 className="text-stone-800 text-2xl font-semibold font-['Cairo'] relative ps-6 before:absolute before:start-0 before:top-0 before:w-3 before:h-full before:bg-blue-600 before:rounded-xl">
                    الخدمات
                  </h3>
                  <p className="mt-5 text-stone-800 text-lg font-medium font-['Cairo']">
                    لن تستخدم موقع الويب الخاص بنا إلا بطريقة تتبع جميع
                    الاتفاقيات المبرمة مع جميع مواقع العاب على صفحة شروط الخدمة
                    الفردية الخاصة بها.
                  </p>
                </li>
                <li>
                  <h3 className="text-stone-800 text-2xl font-semibold font-['Cairo'] relative ps-6 before:absolute before:start-0 before:top-0 before:w-3 before:h-full before:bg-blue-600 before:rounded-xl">
                    الخدمات
                  </h3>
                  <p className="mt-5 text-stone-800 text-lg font-medium font-['Cairo']">
                    لن تستخدم موقع الويب الخاص بنا إلا بطريقة تتبع جميع
                    الاتفاقيات المبرمة مع جميع مواقع العاب على صفحة شروط الخدمة
                    الفردية الخاصة بها.
                  </p>
                </li>
                <li>
                  <h3 className="text-stone-800 text-2xl font-semibold font-['Cairo'] relative ps-6 before:absolute before:start-0 before:top-0 before:w-3 before:h-full before:bg-blue-600 before:rounded-xl">
                    الخدمات
                  </h3>
                  <p className="mt-5 text-stone-800 text-lg font-medium font-['Cairo']">
                    لن تستخدم موقع الويب الخاص بنا إلا بطريقة تتبع جميع
                    الاتفاقيات المبرمة مع جميع مواقع العاب على صفحة شروط الخدمة
                    الفردية الخاصة بها.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Guest>
  );
};

export default Terms;
