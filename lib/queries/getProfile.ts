import { createClient } from "@/lib/supabase/server";
import { mapProfileFromDb } from "../mappers/profileMapper";

export async function getProfile(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
      id,
      name,
      email,
      role,
      seller_approved,
      stripe_account_id,
      created_at
    `,
    )
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;

  return mapProfileFromDb(data);
}
