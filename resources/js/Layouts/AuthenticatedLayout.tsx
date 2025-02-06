import { PropsWithChildren, useEffect, useState } from "react";
import { SideBar } from "@/components/SideBar";
import { TopNav } from "@/components/TopNav";
import { usePage } from "@inertiajs/react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Authenticated({ children }: PropsWithChildren) {
  const [sidebarHeight, setSidebarHeight] = useState<number>(0);

  useEffect(() => {
    setSidebarHeight(window.innerHeight);

    const handleResize = () => {
      setSidebarHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <aside className="fixed top-0 start-0 w-72">
        <ScrollArea
          style={{ height: sidebarHeight }}
          className="!p-0"
          dir="rtl"
        >
          <SideBar />
        </ScrollArea>
      </aside>
      <div className="ms-72">
        <header>
          <TopNav />
        </header>
        <main
          className="w-full overflow-hidden p-6 bg-indigo-50 min-h-[calc(100vh-64px)]"
        >
          {children}
        </main>
      </div>
    </>
  );
}
