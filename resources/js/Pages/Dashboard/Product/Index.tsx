import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Slider } from "./Slider";
import { Products } from "./Products";
import { Product } from "@/types/dashboard";

const Index = ({ auth, products }: PageProps<{ products: Product[] }>) => {
  return (
    <Authenticated>
      <Head title="ddd" />
      <Slider />
      <Products products={products} />
    </Authenticated>
  );
};

export default Index;
