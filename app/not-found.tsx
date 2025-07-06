"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost, ArrowLeftCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <Ghost className="h-20 w-20 text-muted-foreground mb-6" />
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
        Page Not Found
      </h1>
      <p className="text-muted-foreground max-w-md">
        Looks like you overspent your route budget. The page you are looking for
        does not exist in Trackly.
      </p>

      <Button asChild className="mt-6">
        <Link href="/">
          <ArrowLeftCircle className="mr-2 h-4 w-4" />
          Go Back to Dashboard
        </Link>
      </Button>
    </div>
  );
}
