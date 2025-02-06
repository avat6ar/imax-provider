import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Create } from "./Create";
import { Tickets } from "./Tickets";
import { Ticket } from "@/types/dashboard";

const Index = ({ tickets }: { tickets: Ticket[] }) => {
  return (
    <Authenticated>
      <Head title="ddd" />
      <Create />
      <Tickets tickets={tickets} />
    </Authenticated>
  );
};

export default Index;
