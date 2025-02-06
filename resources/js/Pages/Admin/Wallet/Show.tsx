import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputLabel from "@/components/ui/InputLabel";
import TextInput from "@/components/ui/TextInput";
import { Toaster } from "@/components/ui/toaster";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { asset } from "@/lib/utils";
import { WalletHistory } from "@/types/dashboard";
import { Head, Link } from "@inertiajs/react";
import { format } from "date-fns";
import { useState } from "react";

const Show = ({ wallet }: { wallet: WalletHistory }) => {
  const [balance, setBalance] = useState(0);

  return (
    <Authenticated>
      <Toaster />
      <Head title="Edit Product" />
      <div className="w-full rounded-xl bg-white py-6 px-3 space-y-3" dir="ltr">
        <div className="grid grid-cols-3 items-center">
          <div className="col-span-2">
            <h2 className="text-stone-800 text-2xl font-semibold font-['Cairo']">
              {wallet.user?.name}
            </h2>
            <ul className="flex flex-col gap-2 mt-4">
              <li className="text-stone-800 text-base font-semibold font-['Cairo']">
                <span>User Email:</span> <span>{wallet.user?.email}</span>
              </li>
              <li className="text-stone-800 text-base font-semibold font-['Cairo']">
                <span>User Phone:</span> <span>{wallet.user?.phone}</span>
              </li>
              <li className="text-stone-800 text-base font-semibold font-['Cairo']">
                <span>User Balance:</span> <span>{wallet.user?.balance}</span>
              </li>
              <li className="text-stone-800 text-base font-semibold font-['Cairo']">
                <span>Amount:</span> <span>{wallet.amount}</span>
              </li>
              <li className="text-stone-800 text-base font-semibold font-['Cairo']">
                <span>Payment Method:</span>{" "}
                <span>{wallet.payment_method}</span>
              </li>
              <li className="text-stone-800 text-base font-semibold font-['Cairo']">
                <span>Status:</span> <span>{wallet.status}</span>
              </li>
              {wallet.fields && (
                <>
                  {Object.entries(wallet.fields).map(([key, value]) => (
                    <li
                      key={key}
                      className="text-stone-800 text-base font-semibold font-['Cairo']"
                    >
                      <span className="capitalize">
                        {key.replace(/_/g, " ")}:
                      </span>{" "}
                      <span>{value}</span>
                    </li>
                  ))}
                </>
              )}
              <li className="text-stone-800 text-base font-semibold font-['Cairo']">
                <span>Created At:</span>{" "}
                <span>
                  {format(new Date(wallet.created_at), "dd/MM/yyyy HH:mm")}
                </span>
              </li>
            </ul>
            <div className="flex gap-4 items-center mt-4">
              {wallet.status === "pending" ? (
                <>
                  <Link
                    href={route("admin.wallets.update", {
                      id: wallet.id,
                      status: "canceled",
                    })}
                    method="put"
                    type="button"
                    className="bg-red-600 text-white py-1.5 px-4 rounded-md"
                  >
                    Cancel
                  </Link>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="bg-green-600 text-white py-1.5 px-4 rounded-md">
                        <span className="text-white text-base font-semibold font-['Cairo']">
                          Complate
                        </span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[555px]" dir="ltr">
                      <DialogHeader>
                        <DialogTitle>
                          Add Balance To User {wallet.user?.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
                          <InputLabel htmlFor="name_en" className="text-right">
                            Add Balance
                          </InputLabel>
                          <TextInput
                            id="name_en"
                            type="number"
                            value={balance}
                            min={0}
                            className="col-span-3"
                            onChange={(e) => setBalance(Number(e.target.value))}
                            placeholder="Enter Name English"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Link
                          href={route("admin.wallets.update", {
                            id: wallet.id,
                            balance: balance,
                            status: "completed",
                          })}
                          method="put"
                          className="px-4 py-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600"
                          type="button"
                        >
                          <span className="text-white text-base font-semibold font-['Cairo']">
                            Complate
                          </span>
                        </Link>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <button
                  className="bg-stone-800 text-white py-1.5 px-4 rounded-md"
                  onClick={() => window.history.back()}
                >
                  Back
                </button>
              )}
            </div>
          </div>
          <div className="col-span-1">
            <h2 className="text-stone-800 text-2xl font-semibold font-['Cairo']">
              Screenshot
            </h2>
            <img
              src={asset(wallet.screenshot)}
              alt="screenshot"
              className="w-full h-full mt-3"
            />
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default Show;
