import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const privatePaths = ["/dashboard", "/portfolio", "/transactions", "/radar", "/watchlist", "/settings"];

export async function middleware(request: NextRequest) {
  const { response, userId } = await updateSession(request);
  const requiresAuth = privatePaths.some((path) => request.nextUrl.pathname.startsWith(path));
  if (requiresAuth && !userId && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
