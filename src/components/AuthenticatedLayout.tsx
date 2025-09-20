"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignIn,
} from "@clerk/nextjs";
import { SiteHeader } from "@/components/SiteHeader";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      <SignedOut>
        <ClerkLoading>
          <div className="flex min-h-screen items-center justify-center text-slate-500">
            Loading sign-in experience…
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <div className="flex min-h-screen items-center justify-center p-6">
            <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-10 shadow-lg">
              <header className="space-y-2 text-center">
                <p className="text-sm uppercase tracking-wide text-slate-500">
                  Western Truck &amp; Trailer
                </p>
                <h1 className="text-2xl font-semibold text-slate-900">
                  Outside Sales Portal
                </h1>
                <p className="text-sm text-slate-600">
                  Sign in with your company credentials to view live trailer inventory.
                </p>
              </header>
              <SignIn
                routing="hash"
                signUpUrl="/sign-up"
                afterSignInUrl="/"
              />
            </div>
          </div>
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