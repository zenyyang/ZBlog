"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const router = useRouter();

  const routes = [
    {
      href: `/dashboard`,
      lable: "Overview",
      active: pathname === `/dashboard`,
    },
    {
      href: `/dashboard/categories`,
      lable: "Categories",
      active: pathname === `/dashboard/categories`,
    },
    {
      href: `/dashboard/blogs`,
      lable: "Blogs",
      active: pathname === `/dashboard/blogs`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary md:block hidden",
            route.active
              ? "text-black dark:text-light"
              : "text-muted-foreground"
          )}
        >
          {route.lable}
        </Link>
      ))}
      <div className="md:hidden">
        <Select
          onValueChange={(e: string) => {
            router.push(e);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Overview" />
          </SelectTrigger>
          <SelectContent>
            {routes.map((route) => (
              <SelectItem value={route.href} key={route.href}>
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    route.active
                      ? "text-black dark:text-light"
                      : "text-muted-foreground"
                  )}
                >
                  {route.lable}
                </Link>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </nav>
  );
}
