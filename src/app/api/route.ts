import { createAuthClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE() {
  const supabase = createAuthClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ message: "user undefined" }, { status: 401 });
  }
  try {
    const { error } = await supabase.auth.admin.deleteUser(session?.user.id);
    if (error) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  } finally {
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  }
}
