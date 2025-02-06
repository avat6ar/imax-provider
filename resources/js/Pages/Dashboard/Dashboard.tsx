import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }: PageProps) {
  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <section className="w-full">
        <div className="space-y-4">
          <div className="ps-4 pe-10 py-6 bg-white rounded-xl">
            <h3 className="text-blue-600 text-2xl font-semibold font-['Cairo']">
              {auth.user.name}
            </h3>
            <div className="justify-between items-center flex mt-4">
              <div className="text-neutral-400 text-base font-normal font-['Cairo']">
                رقم الهاتف : {auth.user.phone}
              </div>
              <div className="text-neutral-400 text-base font-normal font-['Cairo']">
                البريد الالكتروني : {auth.user.email}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="px-3 pt-8 pb-6 bg-white rounded-xl shadow border border-white text-center">
              <div className="text-blue-600 text-2xl font-semibold font-['Cairo']">
                5000
              </div>
              <div className="text-stone-800 text-base font-normal font-['Cairo'] mt-2">
                عدد الطلبات
              </div>
            </div>
            <div className="px-3 pt-8 pb-6 bg-white rounded-xl shadow border border-white text-center">
              <div className="text-blue-600 text-2xl font-semibold font-['Cairo']">
                5000
              </div>
              <div className="text-stone-800 text-base font-normal font-['Cairo'] mt-2">
                المدفوعات
              </div>
            </div>
            <div className="px-3 pt-8 pb-6 bg-white rounded-xl shadow border border-white text-center">
              <div className="text-blue-600 text-2xl font-semibold font-['Cairo']">
                5000
              </div>
              <div className="text-stone-800 text-base font-normal font-['Cairo'] mt-2">
                الدخل
              </div>
            </div>
          </div>
        </div>
      </section>
    </AuthenticatedLayout>
  );
}
