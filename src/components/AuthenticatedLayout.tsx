"use client";

import { useEffect, useState } from "react";
import {
  ClerkLoaded,
  ClerkLoading,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { SiteHeader } from "@/components/SiteHeader";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const [clientOrigin, setClientOrigin] = useState<string | null>(null);

  useEffect(() => {
    setClientOrigin(window.location.origin);
  }, []);

  const redirectUrl = clientOrigin
    ? new URL("/outside-sales", clientOrigin).toString()
    : "/outside-sales";

  return (
    <main className="min-h-screen bg-slate-50">
      <SignedOut>
        <ClerkLoading>
          <div className="flex min-h-screen items-center justify-center text-slate-500">
            Loading sign-in experience…
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <RedirectToSignIn redirectUrl={redirectUrl} />
        </ClerkLoaded>
      </SignedOut>

      <SignedIn>
        <div className="flex min-h-screen flex-col bg-slate-50">
          <SiteHeader />
          <section className="flex-1 px-6 py-12">
            <div className="mx-auto w-full max-w-7xl space-y-6">
              {children}
            </div>
          </section>
        </div>
      </SignedIn>
    </main>
  );
}
