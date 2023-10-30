import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { MainNav } from "@/components/dashboard/NavRoutesDashboard";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Link from "next/link";

const NavbarDashboard = () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 mx-5">
        <Link href="/">
          <p className="font-medium font-serif">ZEN's Blog</p>
        </Link>
        <MainNav className="md:mx-6 mr-3" />
        <div className="ml-auto flex items-center space-x-4">
          <div className="md:block hidden">
            <ThemeSwitcher />
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
