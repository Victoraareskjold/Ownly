import { createClient } from "@/lib/supabase/client";

export async function handleNewUser(email: string, name: string, role: string) {
  const supabase = createClient();

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();
  if (getUserError) throw getUserError;

  if (!user) throw new Error("User not signed in yet");

  // Sjekk om profil finnes
  const { data: existingProfile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) throw profileError;

  // Opprett profil hvis ikke eksisterer
  if (!existingProfile) {
    const { error: insertError } = await supabase.from("profiles").insert({
      id: user.id,
      email,
      name,
      role,
      created_at: new Date().toISOString(),
    });

    if (insertError) throw insertError;
  }

  return user.id;
}
