import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import { Head, useForm } from "@inertiajs/react";
import { format } from "date-fns";

const Show = ({ order }: { order: any }) => {
  const { put, errors, processing } = useForm();

  const updateOrderStatus = (status: string) => {
    put(route("admin.orders.update", { id: order.id, status: status }));

    if (!processing && Object.keys(errors).length === 0) {
      toast({
        title: "Success Message",
        description: "Order updated successfully",
        variant: "success",
      });
    }
  };

  return (
    <Authenticated>
      <Toaster />
      <Head title="ddd" />
      <div className="w-full rounded-xl bg-white py-6 px-3 space-y-3">
        <div className="flex items-center gap-5">
          <h2 className="text-stone-800 text-2xl font-semibold font-['Cairo']">
            طلب رقم {order.id}
          </h2>
          {order.status === "pending" && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateOrderStatus("completed")}
                className="bg-green-500 text-white py-1 px-3 rounded text-sm"
              >
                إكمال الطلب
              </button>
              <button
                onClick={() => updateOrderStatus("canceled")}
                className="bg-red-500 text-white py-1 px-3 rounded text-sm"
              >
                إلغاء الطلب
              </button>
            </div>
          )}
        </div>
        <p className="text-stone-800 text-base font-normal font-['Cairo']">
          الحالة :{" "}
          <span
            className={cn(
              "text-stone-800 text-base font-semibold font-['Cairo'] capitalize",
              order.status == "pending"
                ? "text-yellow-500"
                : order.status == "completed"
                ? "text-green-500"
                : "text-red-500"
            )}
          >
            {order.status}
          </span>
        </p>
        <p className="text-stone-800 text-base font-normal font-['Cairo']">
          اسم المستخدم : {order.user.name}
        </p>
        <p className="text-stone-800 text-base font-normal font-['Cairo']">
          رقم الهاتف : {order.user.phone}
        </p>
        <p className="text-stone-800 text-base font-normal font-['Cairo']">
          البريد الالكتروني : {order.user.email}
        </p>
        <p className="text-stone-800 text-base font-normal font-['Cairo']">
          تاريخ الطلب : {format(order.created_at, "dd/MM/yyyy HH:mm")}
        </p>
        <p className="text-stone-800 text-base font-normal font-['Cairo']">
          اسم المنتج : {order.product.title_en}
        </p>
        <p className="text-stone-800 text-base font-normal font-['Cairo']">
          السعر : {order.product.price}
        </p>
        <p className="text-stone-800 text-base font-normal font-['Cairo']">
          الكمية : {order.quantity}
        </p>
        <p className="text-stone-800 text-base font-normal font-['Cairo']">
          رقم المنتج : {order.product.id}
        </p>
        <p className="text-stone-800 text-base font-normal font-['Cairo']">
          Response : {order.response ?? "No Response"}
        </p>
        {order.fields &&
          Object.entries(JSON.parse(order.fields)).map(
            ([key, value]: [string, any]) => (
              <p
                className="text-stone-800 text-base font-normal font-['Cairo']"
                key={key}
              >
                {key} : {value}
              </p>
            )
          )}
      </div>
    </Authenticated>
  );
};

export default Show;
