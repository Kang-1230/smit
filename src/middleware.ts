import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 인증된 사용자가 로그인/회원가입 페이지 접근 시 메인으로 리다이렉트
  if (
    user &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/signup"))
  ) {
    // const url = request.nextUrl.clone();
    // url.pathname = "/";
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 미인증 사용자가 보호된 경로 접근 시 로그인으로 리다이렉트
  if (
    !user &&
    (request.nextUrl.pathname.startsWith("/mypage") ||
      request.nextUrl.pathname.startsWith("/ranking") ||
      request.nextUrl.pathname.startsWith("/study"))
  ) {
    // const url = request.nextUrl.clone();
    // url.pathname = "/login";
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return supabaseResponse;
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: [
    "/login",
    "/signup",
    "/mypage/:path*",
    "/ranking/:path*",
    "/study/:path*",
  ],
};
