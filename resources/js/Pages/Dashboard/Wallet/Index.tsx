import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { VodafoneCash } from "./VodafoneCash";
import { Bank } from "./Bank";
import { Binance } from "./Binance";
import { RedotPay } from "./RedotPay";
import { Webmoney } from "./Webmoney";
import { WalletHistory } from "@/types/dashboard";
import { cn } from "@/lib/utils";

const Index = ({ walletHistory }: { walletHistory: WalletHistory[] }) => {
  return (
    <Authenticated>
      <Head title="ddd" />
      <section className="w-full">
        <Tabs defaultValue="vodafone_cash" className="w-full" dir="rtl">
          <TabsList className="grid justify-around grid-cols-5 bg-slate-200">
            <TabsTrigger value="vodafone_cash">Vodafone Cash</TabsTrigger>
            <TabsTrigger value="bank">Bank</TabsTrigger>
            <TabsTrigger value="binance">Binance</TabsTrigger>
            <TabsTrigger value="webmoney">Webmoney</TabsTrigger>
            <TabsTrigger value="redot_pay">Redot Pay</TabsTrigger>
          </TabsList>
          <div className="bg-white p-4 mt-3 rounded-xl">
            <TabsContent value="vodafone_cash" className="mt-0">
              <VodafoneCash />
            </TabsContent>
            <TabsContent value="bank" className="mt-0">
              <Bank />
            </TabsContent>
            <TabsContent value="binance" className="mt-0">
              <Binance />
            </TabsContent>
            <TabsContent value="webmoney" className="mt-0">
              <Webmoney />
            </TabsContent>
            <TabsContent value="redot_pay" className="mt-0">
              <RedotPay />
            </TabsContent>
          </div>
        </Tabs>
        <div className="mt-6">
          <h5 className="text-stone-800 text-base font-semibold font-['Cairo']">
            العمليات السابقه
          </h5>
          <ul className="flex flex-col gap-3 mt-3">
            {walletHistory.map((item) => (
              <li
                key={item.id}
                className={cn(
                  "flex gap-4 py-2 px-4 rounded-xl",
                  item.status === "pending"
                    ? "bg-slate-200"
                    : item.status === "canceled"
                    ? "bg-red-200"
                    : "bg-green-200"
                )}
              >
                <span
                  className={cn(
                    "w-2 h-2 rounded-full mt-1",
                    item.status === "pending"
                      ? "bg-slate-600"
                      : item.status === "canceled"
                      ? "bg-red-600"
                      : "bg-green-600"
                  )}
                ></span>
                <div className="flex items-center w-full justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-stone-800 text-base font-semibold leading-none">
                      #{item.id}
                    </span>
                    <span className="text-stone-800 text-base font-semibold capitalize leading-none">
                      {item.payment_method}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <span className="text-stone-800 text-base font-semibold leading-none">
                     Amount: {item.amount}
                    </span>
                    <span className="text-stone-800 text-base font-semibold capitalize leading-none">
                      {item.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Authenticated>
  );
};

export default Index;
