"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function Header() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((seg) => seg.length > 0);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b fixed w-full bg-white top-0 z-50">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger />

        <Breadcrumb>
          <BreadcrumbList>
            {pathSegments.map((segment, index) => {
              const href = "/" + pathSegments.slice(0, index + 1).join("/");
              const isLast = index === pathSegments.length - 1;

              return (
                <div key={href} className="flex items-center">
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={href}>{capitalize(segment)}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>

                  {!isLast && <BreadcrumbSeparator />}
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
