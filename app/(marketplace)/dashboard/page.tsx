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
    <div className="max-w-6xl flex flex-col h-full mx-auto px-6 py-12">
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
