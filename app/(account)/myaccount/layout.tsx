import { AppSidebar } from "@/app/_components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-white w-[100%]">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}


