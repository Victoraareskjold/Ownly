import { createClient } from "@/lib/supabase/server";

export async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("product_categories")
    .select("name");
  if (error) throw error;
  return data?.map((row) => row.name) ?? [];
}

export async function getStacks() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("product_stacks").select("name");
  if (error) throw error;
  return data?.map((row) => row.name) ?? [];
}

export async function getHostings() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("product_hostings")
    .select("name");
  if (error) throw error;
  return data?.map((row) => row.name) ?? [];
}
