"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../../public/western-comp-logo.webp";
import { Menu, X } from "lucide-react";

import {
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex h-16 md:h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Left side - Logo and Desktop Nav */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {/* Logo - Responsive sizing */}
            <Link href="/" className="flex items-center group">
              <Image
                src={logo}
                alt="Western Truck & Trailer"
                width={180}
                height={52}
                priority
                className="h-8 w-auto sm:h-10 md:h-12 object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm p-1 text-sm shadow-md md:flex">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Button
                    key={item.label}
                    asChild
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "rounded-full px-4 transition-all duration-200",
                      isActive
                        ? "bg-slate-900 text-white shadow-md hover:bg-slate-800 hover:shadow-lg"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                );
              })}
            </nav>
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 sm:h-9 sm:w-9"
                }
              }}
            />
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu - Slide from left */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden",
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300",
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <nav
          className={cn(
            "fixed left-0 top-0 h-full w-64 bg-white shadow-xl transition-transform duration-300",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
            <span className="text-lg font-semibold text-slate-900">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center">
              Western Truck & Trailer
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}