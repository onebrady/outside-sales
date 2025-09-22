import { headers } from "next/headers";
import { redirect } from "next/navigation";

function buildReturnUrl(): string {
  const headersList = headers();
  const forwardedHost = headersList.get("x-forwarded-host");
  const host = forwardedHost ?? headersList.get("host") ?? "localhost:3000";
  const isLocalhost = host.includes("localhost");
  const protocol = headersList.get("x-forwarded-proto") ?? (isLocalhost ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return new URL("/outside-sales", origin).toString();
}

export default function SignUpPage() {
  const signUpUrlString =
    process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ??
    "https://accounts.westerntruck.com/sign-up";
  const destination = new URL(signUpUrlString);

  if (!destination.searchParams.has("redirect_url")) {
    destination.searchParams.set("redirect_url", buildReturnUrl());
  }

  redirect(destination.toString());
}
