import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ticket } from "@/types/dashboard";
import { format } from "date-fns";
import { LuSearch } from "react-icons/lu";
import { Link } from "@inertiajs/react";
const Index = ({ tickets }: { tickets: Ticket[] }) => {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredTickets =
    filter && filter !== "all"
      ? tickets.filter((ticket) => ticket.category === filter)
      : tickets;
  return (
    <Authenticated>
      <Head title="ddd" />
      <div className="flex items-center justify-between">
        <h5 className="text-stone-800 text-base font-semibold font-['Cairo']">
          الطلبات السابقه
        </h5>

        <div className="flex gap-4 items-center">
          <Select dir="rtl" onValueChange={setFilter}>
            <SelectTrigger className="w-52 bg-white border-none text-neutral-400">
              <SelectValue placeholder="اختار" />
            </SelectTrigger>
            <SelectContent className="w-52 bg-white border-none text-neutral-400">
              <SelectItem value="all">كل</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
              <SelectItem value="order">Order</SelectItem>
              <SelectItem value="other">other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-160px)] w-full" dir="rtl">
        <ul className="flex flex-col gap-4 mt-5">
          {filteredTickets.map((ticket) => {
            const date = new Date(ticket.updated_at);
            const formattedDate = format(date, "dd/MM/yyyy HH:mm");
            return (
              <li key={ticket.id} className="p-3 bg-white rounded-xl">
                <Link
                  href={route("admin.tickets.show", ticket.id)}
                  className="flex items-center justify-between"
                >
                  <div className="space-1">
                    <h5 className="text-right text-neutral-600 text-base font-medium font-['Cairo']">
                      {ticket.subject}
                    </h5>
                    <span className="text-right text-neutral-400 text-sm font-normal font-['Cairo']">
                      {ticket.category}
                    </span>
                  </div>
                  <div className="space-1">
                    <h5 className="text-right text-neutral-600 text-base font-medium font-['Cairo']">
                      #{ticket.id}
                    </h5>
                    <span className="text-right text-neutral-400 text-sm font-normal font-['Cairo']">
                      {formattedDate}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </Authenticated>
  );
};

export default Index;
