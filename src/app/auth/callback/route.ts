// app/auth/callback/route.ts
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
      const supabase = createClientComponentClient({
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      });

      // 코드를 세션으로 교환
      await supabase.auth.exchangeCodeForSession(code);

      // 사용자 정보 가져오기
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // 기존 사용자인지 확인
        const { data: existingUser } = await supabase
          .from("user")
          .select("id")
          .eq("id", user.id)
          .single();

        // 신규 사용자인 경우만 데이터 삽입
        if (!existingUser) {
          const { error: insertError } = await supabase.from("user").insert({
            id: user.id,
            email: user.email,
            study_time: 0,
            created_at: user.created_at,
            profile_img:
              "https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/profile_img/default?t=2024-11-08T07%3A23%3A01.617Z",
          });

          if (insertError) {
            console.error("Insert Error:", insertError);
          }
        }
      }
    }

    return NextResponse.redirect(
      new URL("https://smit-8y5a.vercel.app/", request.url),
    );
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(
      new URL("https://smit-8y5a.vercel.app/", request.url),
    );
  }
}
