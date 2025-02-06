import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import InputError from "@/components/ui/InputError";
import InputLabel from "@/components/ui/InputLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TextArea from "@/components/ui/TextArea";
import TextInput from "@/components/ui/TextInput";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { User } from "@/types/dashboard";
import { Head, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

const Edit = ({ user }: { user: User }) => {
  const { reset, put, processing, errors, data, setData } = useForm({
    name: user.name,
    email: user.email,
    phone: user.phone,
    is_admin: user.is_admin,
    status: user.status,
    balance: user.balance,
  });

  const { props }: { props: PageProps } = usePage();

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    if (user.id == props.auth.user.id) {
      toast({
        title: "Error Message",
        description: "You cannot update your own profile",
        variant: "error",
      });
      return;
    }
    put(route("admin.users.update", { id: user.id }));

    if (processing && Object.keys(errors).length === 0) {
      reset();
      toast({
        title: "Success Message",
        description: "Users updated successfully",
        variant: "success",
      });
    }
  };

  const roles = ["admin", "member", "super_admin"];

  return (
    <Authenticated>
      <Toaster />
      <Head title="Edit Product" />
      <div className="w-full rounded-xl bg-white py-6 px-3 space-y-3" dir="ltr">
        <h2 className="text-stone-800 text-2xl font-semibold font-['Cairo']">
          Edit User {user.name}
        </h2>
        <form action="#" onSubmit={submit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="Name" className="text-right">
                Name
              </InputLabel>
              <TextInput
                id="name"
                value={data.name}
                className="col-span-3"
                onChange={(e) => setData("name", e.target.value)}
                placeholder="Enter Name"
              />
              <InputError
                message={errors.name}
                className="col-span-3 col-start-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="title_ar" className="text-right">
                Email
              </InputLabel>
              <TextInput
                id="title_ar"
                value={user.email}
                className="col-span-3"
                onChange={(e) => setData("email", e.target.value)}
                placeholder="Enter Email"
              />
              <InputError
                message={errors.email}
                className="col-span-3 col-start-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="phone" className="text-right">
                Phone
              </InputLabel>
              <TextInput
                id="phone"
                value={data.phone}
                className="col-span-3"
                onChange={(e) => setData("phone", e.target.value)}
                placeholder="Enter Phone"
              />
              <InputError
                message={errors.phone}
                className="col-span-3 col-start-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="balance" className="text-right">
                Balance
              </InputLabel>
              <TextInput
                id="balance"
                value={data.balance}
                type="number"
                className="col-span-3"
                onChange={(e) => setData("balance", Number(e.target.value))}
                placeholder="Enter balance"
              />
              <InputError
                message={errors.balance}
                className="col-span-3 col-start-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="is_admin" className="text-right">
                Is Admin
              </InputLabel>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  id="is_admin"
                  type="checkbox"
                  name="is_admin"
                  value="1"
                  className="peer sr-only"
                  onChange={(e) => setData("is_admin", e.target.checked)}
                  {...(data.is_admin ? { checked: true } : {})}
                />
                <label htmlFor="switch-3" className="hidden"></label>
                <div className="peer h-4 w-11 rounded border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-md after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
              </label>
              <InputError
                message={errors.is_admin}
                className="col-span-3 col-start-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <InputLabel htmlFor="status" className="text-right">
                Status
              </InputLabel>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  id="status"
                  type="checkbox"
                  name="status"
                  value="1"
                  className="peer sr-only"
                  onChange={(e) => setData("status", e.target.checked)}
                  {...(data.status ? { checked: true } : {})}
                />
                <label htmlFor="switch-3" className="hidden"></label>
                <div className="peer h-4 w-11 rounded border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-md after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
              </label>
              <InputError
                message={errors.status}
                className="col-span-3 col-start-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600"
                type="submit"
              >
                <span className="text-white text-base font-semibold font-['Cairo']">
                  Update
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Authenticated>
  );
};

export default Edit;
