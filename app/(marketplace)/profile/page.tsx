import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/queries/getProfile";
import ProfilePageClient from "./ProfilePageClient";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const profile = await getProfile(user.id);

  return <ProfilePageClient profile={profile} />;
}
