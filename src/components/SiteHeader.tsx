"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../public/western-comp-logo.webp";

import {
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "In Stock", href: "/" },
  { label: "Production", href: "/production" },
  { label: "Consignments", href: "/consignments" },
  { label: "Core Products", href: "/core-products" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
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
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.label}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "rounded-full px-4",
                    isActive
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              );
            })}
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
          <UserButton afterSignOutUrl="/" />
          <SignOutButton redirectUrl="/">
            <Button variant="outline" size="sm">
              Sign out
            </Button>
          </SignOutButton>
        </div>
      </div>
    </header>
  );
}