import InputError from "@/components/ui/InputError";
import { ScrollArea } from "@/components/ui/scroll-area";
import TextInput from "@/components/ui/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import { Ticket } from "@/types/dashboard";
import { Head, router, useForm } from "@inertiajs/react";
import { format } from "date-fns";
import { ImagePlus } from "lucide-react";
import { FormEventHandler, useEffect, useRef, useState } from "react";

const Show = ({ ticket }: { ticket: Ticket }) => {
  const { data, setData, errors, post, reset } = useForm({
    message: "",
    file: null as File | null,
  });

  const [image, setImage] = useState<string | undefined>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("admin.tickets.message.store", ticket.id));

    reset();

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      router.reload({
        only: ["ticket"],
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
        });
      }
    };

    const timeoutId = setTimeout(scrollToBottom, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Authenticated>
      <Head title="ddd" />
      <div className="p-3 bg-white rounded-xl flex items-center justify-between">
        <div className="space-1">
          <h5 className="text-right text-neutral-600 text-base font-medium font-['Cairo']">
            Subject: {ticket.subject}
          </h5>
        </div>
        <div className="space-1">
          <h5 className="text-right text-neutral-600 text-base font-medium font-['Cairo']">
            #{ticket.id}
          </h5>
        </div>
      </div>

      <div className="mt-5">
        <div
          ref={scrollRef}
          className="h-[calc(100vh-248px)] overflow-y-auto"
          dir=""
        >
          <ul className="flex flex-col gap-4 pe-4">
            {ticket.messages.map((message) => {
              const date = new Date(message.created_at);
              const formattedDate = format(date, "dd/MM/yyyy HH:mm");

              return (
                <div
                  className={cn(
                    "flex items-center",
                    message.admin ? "justify-start" : "justify-end"
                  )}
                >
                  <div
                    className={cn(
                      "space-y-2",
                      message.admin ? "text-start" : "text-end"
                    )}
                  >
                    <div
                      className={cn(
                        "inline-block p-3 rounded-xl",
                        message.admin ? "bg-white" : "bg-blue-600"
                      )}
                    >
                      <span
                        className={cn(
                          "text-sm font-normal",
                          message.admin ? "text-stone-800" : "text-white"
                        )}
                      >
                        {message.message}
                      </span>
                    </div>
                    {message.attachment && (
                      <img
                        src={message.attachment.file_path}
                        alt=""
                        className="w-40"
                        onClick={() => setImage(message.attachment?.file_path)}
                      />
                    )}
                    <div className="text-neutral-400 text-sm font-normal font-['Cairo']">
                      {formattedDate}
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mt-5">
        <form onSubmit={submit}>
          {data.file ? (
            <img
              className="w-32 h-32 mb-2"
              src={URL.createObjectURL(data.file)}
              alt="Uploaded image"
            />
          ) : (
            ""
          )}
          <div className="flex gap-4">
            <div className="relative w-full">
              <TextInput
                id="message"
                type="text"
                name="subject"
                value={data.message}
                className="block w-full"
                placeholder="Message"
                onChange={(e) => setData("message", e.target.value)}
              />
              <input
                type="file"
                onChange={(e) =>
                  setData("file", e.target.files ? e.target.files[0] : null)
                }
                className="hidden"
                id="file"
                accept="image/*"
              />
              <label
                htmlFor="file"
                className="absolute top-1/2 end-3 -translate-y-1/2 z-10"
              >
                <ImagePlus className="text-neutral-400" />
              </label>
            </div>
            <button
              type="submit"
              className="px-7 py-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600"
            >
              <span className="text-white text-base font-semibold font-['Cairo']">
                Send
              </span>
            </button>
          </div>
          <InputError message={errors.message} />
          <InputError message={errors.file} />
        </form>
      </div>

      <div
        className={cn(
          "fixed inset-0 w-full h-full z-10 transition flex justify-center items-center",
          image ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <img
          src={image}
          alt=""
          className="max-h-[calc(100%-70px)] max-w-[75%] object-contain"
        />
        <div
          className={cn(
            "absolute inset-0 w-full h-full bg-black opacity-50 z-[-1]",
            image ? "block" : "hidden"
          )}
          onClick={() => setImage(undefined)}
        />
      </div>
    </Authenticated>
  );
};

export default Show;
