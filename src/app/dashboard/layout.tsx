import { AdminSidebar } from "@/components/admin-sidebar";
import { CustomerSidebar } from "@/components/customer-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUserRole } from "@/lib/helpers";
import { CloseSessionButton } from "../customComponents/CloseSessionButton";
//import { supabase } from "@/lib/supabase";
//import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
//import { cookies } from "next/headers";

export default async function CustomerDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserRole();

  return (
    <SidebarProvider>
      {user?.role === "admin" ? <AdminSidebar /> : <CustomerSidebar />}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <CloseSessionButton />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
