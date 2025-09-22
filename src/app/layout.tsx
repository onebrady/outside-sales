import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { DevLinkProvider } from "@/devlink/DevLinkProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { AuthenticatedLayout } from "@/components/AuthenticatedLayout";

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const clerkSignInUrl =
  process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ??
  "https://accounts.westerntruck.com/sign-in";
const clerkSignUpUrl =
  process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ??
  "https://accounts.westerntruck.com/sign-up";

if (!clerkPublishableKey) {
  throw new Error("Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable.");
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Outside Sales Portal | Western Truck & Trailer",
  description: "Live trailer inventory for outside sales team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      signInUrl={clerkSignInUrl}
      signUpUrl={clerkSignUpUrl}
      signInFallbackRedirectUrl="/outside-sales"
      signUpFallbackRedirectUrl="/outside-sales"
      afterSignOutUrl="/outside-sales"
      afterSignInUrl="/outside-sales"
      afterSignUpUrl="/outside-sales"
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
        >
          <DevLinkProvider>
            <AuthenticatedLayout>
              {children}
            </AuthenticatedLayout>
          </DevLinkProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
