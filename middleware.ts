import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/sign-up(.*)", "/outside-sales(.*)"],
  signInUrl: "/outside-sales",
  signUpUrl: "/sign-up",
  afterSignInUrl: "/outside-sales",
  afterSignUpUrl: "/outside-sales",
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"
  ]
};
