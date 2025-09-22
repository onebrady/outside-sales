import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function buildReturnUrl(): Promise<string> {
  const headersList = await headers();
  const forwardedHost = headersList.get("x-forwarded-host");
  const host = forwardedHost ?? headersList.get("host") ?? "localhost:3000";
  const isLocalhost = host.includes("localhost");
  const protocol = headersList.get("x-forwarded-proto") ?? (isLocalhost ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return new URL("/outside-sales", origin).toString();
}

export default async function SignInPage() {
  const signInUrlString =
    process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ??
    "https://accounts.westerntruck.com/sign-in";
  const destination = new URL(signInUrlString);

  if (!destination.searchParams.has("redirect_url")) {
    destination.searchParams.set("redirect_url", await buildReturnUrl());
  }

  redirect(destination.toString());
}
