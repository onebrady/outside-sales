"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../public/western-comp-logo.webp";

import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignIn,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { InStockGrid } from "./_components/InStockGrid";

export default function Home() {
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
                signUpUrl="/outside-sales/sign-up"
                afterSignInUrl="/outside-sales"
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
              <div className="space-y-1">
                <p className="text-sm font-medium uppercase tracking-wide text-slate-500">In Stock</p>
                <h2 className="text-2xl font-semibold text-slate-900">Live trailer inventory</h2>
                <p className="text-sm text-slate-600">
                  We&apos;ll layer in specs and actions next—here&apos;s the photo feed to start exploring units.
                </p>
              </div>
              <InStockGrid />
            </div>
          </section>
        </div>
      </SignedIn>
    </main>
  );
}

const navItems = [
  { label: "In Stock", href: "/outside-sales/in-stock" },
  { label: "Production", href: "/outside-sales/production" },
  { label: "Consignments", href: "/outside-sales/consignments" },
  { label: "Core Products", href: "/outside-sales/core-products" },
];

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link href="/outside-sales" className="flex items-center">
            <Image
              src={logo}
              alt="Western Truck & Trailer"
              width={180}
              height={52}
              priority
              className="h-12 w-auto object-contain"
            />
          </Link>
          <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white p-1 text-sm shadow-sm md:flex">
            {navItems.map((item) => (
              <Button
                key={item.label}
                asChild
                variant={item.label === "In Stock" ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "rounded-full px-4",
                  item.label === "In Stock"
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-3 text-sm font-medium text-slate-600 md:hidden">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-slate-900">
                {item.label}
              </Link>
            ))}
          </nav>
          <UserButton afterSignOutUrl="/outside-sales" />
          <SignOutButton redirectUrl="/outside-sales">
            <Button variant="outline" size="sm">
              Sign out
            </Button>
          </SignOutButton>
        </div>
      </div>
    </header>
  );
}
