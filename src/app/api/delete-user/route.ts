import { createAuthClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE() {
  const supabase = createAuthClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Authentication error:", userError);
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 },
    );
  }

  try {
    console.log("Attempting to delete user:", user.id);
    const { error: deleteError } = await supabase
      .from("user")
      .delete()
      .eq("id", user.id);

    if (deleteError) {
      console.error("Public User delete error:", deleteError);
      return NextResponse.json(
        { message: deleteError.message },
        { status: 500 },
      );
    }

    const { error } = await supabase.auth.admin.deleteUser(user.id);

    if (error) {
      console.error("Error deleting user:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    await supabase.auth.signOut();

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
