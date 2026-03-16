import { createClient } from "@/lib/supabase/server";
import NewProductPageClient from "./newProductPageClient";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: categories }, { data: stacks }, { data: hostings }] =
    await Promise.all([
      supabase.from("product_categories").select("id, name").order("name"),
      supabase.from("product_stacks").select("id, name").order("name"),
      supabase.from("product_hostings").select("id, name").order("name"),
    ]);

  return (
    <NewProductPageClient
      categories={categories ?? []}
      stacks={stacks ?? []}
      hostings={hostings ?? []}
      sellerId={user!.id}
    />
  );
}
