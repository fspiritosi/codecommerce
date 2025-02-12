"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getUserRole() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let userId = null;

  if (session) {
    userId = session.user.id || null;
  }

  if (userId !== null) {
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId);

    if (error) {
      console.error("Error fetching user profile:", error);
    } else if (profiles && profiles.length > 0) {
      return profiles[0];
    }
  }
}
