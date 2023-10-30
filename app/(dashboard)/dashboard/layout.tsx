import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";

import Navbar from "@/components/dashboard/NavbarDashboard";
import { cn } from "@/lib/utils";

const font = Inter({ subsets: ["latin"] });

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className={cn("flex flex-col h-screen", font.className)}>
      <Navbar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
