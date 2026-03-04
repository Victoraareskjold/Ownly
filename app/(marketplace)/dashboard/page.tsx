"use client";
import { createClient } from "@/lib/supabase/client";
import { toast } from "react-toastify";

export default function DashboardPage() {
  const supabase = createClient();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out");
      console.error(error);
      throw error;
    }
    window.location.reload();
  };
  return (
    <div className="max-w-6xl min-h-screen mx-auto px-6 py-16">
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
