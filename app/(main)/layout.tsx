import Footer from "@/components/footer";
import Header from "@/components/header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Utility to verify token from backend
async function verifyUser(token: string) {
  try {
    const res = await fetch("http://localhost:8080/api/v1/is-authenticated", {
      method: "GET",
      headers: {
        Cookie: `jwt=${token}`, // Pass token to Spring Boot
      },
      credentials: "include",
    });

    console.log(res);

    return res.ok; // true if user is authenticated
  } catch (err) {
    console.error("Error verifying token:", err);
    return false;
  }
}

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("jwt")?.value;

  // If no token → redirect immediately
  if (!jwtToken) {
    redirect("/login");
  }

  // Validate token with Spring Boot
  const isValid = await verifyUser(jwtToken);

  if (!isValid) {
    redirect("/login");
  }

  // If token is valid → render the main layout
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className="p-4 pt-20 h-full">{children}</div>
          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
