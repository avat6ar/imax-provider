import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <>
      <header className="w-full bg-indigo-50">
        <Navigation />
      </header>
      <main className="mt-8 w-full">{children}</main>
      <footer className="w-full mt-24 bg-indigo-50">
        <Footer />
      </footer>
    </>
  );
}
