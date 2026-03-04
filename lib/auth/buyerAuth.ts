import { createClient } from "@/lib/supabase/client";

export async function buyerAuth(email: string, name: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) return user;

  const { error: otpError } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      data: { role: "buyer", name },
    },
  });

  if (otpError) throw otpError;

  return null;
}

export async function verifyBuyerOtp(email: string, otp: string) {
  const supabase = createClient();

  const { error: verifyError } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });
  if (verifyError) throw verifyError;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  return user.id;
}
