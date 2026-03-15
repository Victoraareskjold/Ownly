import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/profile"];
const INVITE_TOKEN = process.env.INVITE_TOKEN;

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const { pathname, searchParams } = request.nextUrl;

  const invite = searchParams.get("invite");

  if (invite && invite === INVITE_TOKEN) {
    response.cookies.set("ownie_invite", "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isPrivateRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (!user && isPrivateRoute) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
