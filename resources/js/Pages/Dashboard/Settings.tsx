import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputError from "@/components/ui/InputError";
import InputLabel from "@/components/ui/InputLabel";
import TextInput from "@/components/ui/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

export default function Settings({ auth }: PageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const { data, setData, patch, processing, errors, reset } = useForm({
    email: auth.user.email,
    phone: auth.user.phone,
    name: auth.user.name,
    old_password: "",
    password: "",
    password_confirmation: "",
  });

  const submitProfile: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route("profile.update"), {
      onSuccess: () => {
        if (Object.keys(errors).length === 0) {
          setIsDialogOpen(false);
        }
      },
    });
  };

  const submitPassword: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route("profile.updatePassword"), {
      onSuccess: () => {
        if (Object.keys(errors).length === 0) {
          setIsPasswordDialogOpen(false);
          reset("old_password", "password", "password_confirmation");
        }
      },
    });
  };

  useEffect(() => {
    return () => {
      reset("old_password", "password", "password_confirmation");
    };
  }, []);

  return (
    <AuthenticatedLayout>
      <Head title="Settings" />
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
          <div className="flex items-center justify-end mt-4 gap-3">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <span className="text-white text-base font-normal font-['Cairo']">
                    تعديل الحساب
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]" dir="ltr">
                <form onSubmit={submitProfile}>
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-y-2 gap-x-4">
                      <InputLabel htmlFor="name" className="text-end">
                        Name
                      </InputLabel>
                      <TextInput
                        id="name"
                        defaultValue={data.name}
                        className="col-span-3"
                        onChange={(e) => setData("name", e.target.value)}
                      />
                      <InputError
                        message={errors.name}
                        className="col-span-3 col-start-2"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-y-2 gap-x-4">
                      <InputLabel htmlFor="email" className="text-end">
                        Email Address
                      </InputLabel>
                      <TextInput
                        id="email"
                        defaultValue={data.email}
                        className="col-span-3"
                        onChange={(e) => setData("email", e.target.value)}
                        type="email"
                      />
                      <InputError
                        message={errors.email}
                        className="col-span-3 col-start-2"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-y-2 gap-x-4">
                      <InputLabel htmlFor="phone" className="text-end">
                        Phone Number
                      </InputLabel>
                      <TextInput
                        id="phone"
                        defaultValue={data.phone}
                        className="col-span-3"
                        onChange={(e) => setData("phone", e.target.value)}
                      />
                      <InputError
                        message={errors.phone}
                        className="col-span-3 col-start-2"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600"
                      disabled={processing}
                    >
                      <span className="text-white text-base font-normal font-['Cairo']">
                        Save changes
                      </span>
                    </button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog
              open={isPasswordDialogOpen}
              onOpenChange={setIsPasswordDialogOpen}
            >
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600"
                  onClick={() => setIsPasswordDialogOpen(true)}
                >
                  <span className="text-white text-base font-normal font-['Cairo']">
                    تغير كلمة السر
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]" dir="ltr">
                <form onSubmit={submitPassword} action="#">
                  <DialogHeader>
                    <DialogTitle>Change password</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-y-2 gap-x-4">
                      <InputLabel htmlFor="old_password" className="text-end">
                        Old Password
                      </InputLabel>
                      <TextInput
                        id="old_password"
                        className="col-span-3"
                        onChange={(e) =>
                          setData("old_password", e.target.value)
                        }
                        placeholder="Old Password"
                        type="password"
                        value={data.old_password}
                      />
                      <InputError
                        message={errors.old_password}
                        className="col-span-3 col-start-2"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-y-2 gap-x-4">
                      <InputLabel htmlFor="password" className="text-end">
                        New Password
                      </InputLabel>
                      <TextInput
                        id="password"
                        className="col-span-3"
                        onChange={(e) => setData("password", e.target.value)}
                        type="password"
                        placeholder="New Password"
                        value={data.password}
                      />
                      <InputError
                        message={errors.password}
                        className="col-span-3 col-start-2"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-y-2 gap-x-4">
                      <InputLabel
                        htmlFor="password_confirmation"
                        className="text-end"
                      >
                        Confirmation Password
                      </InputLabel>
                      <TextInput
                        id="password_confirmation"
                        className="col-span-3"
                        onChange={(e) =>
                          setData("password_confirmation", e.target.value)
                        }
                        type="password"
                        placeholder="Confirmation Password"
                        value={data.password_confirmation}
                      />
                      <InputError
                        message={errors.password_confirmation}
                        className="col-span-3 col-start-2"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600"
                      disabled={processing}
                    >
                      <span className="text-white text-base font-normal font-['Cairo']">
                        Change password
                      </span>
                    </button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Link
              href={route("logout")}
              method="post"
              type="button"
              className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600"
            >
              <span className="text-white text-base font-normal font-['Cairo']">
                تسجيل الخروج
              </span>
            </Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
