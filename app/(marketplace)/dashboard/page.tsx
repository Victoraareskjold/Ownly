import { getProducts } from "@/lib/queries/getProducts";
import { createClient } from "@/lib/supabase/server";
import DashboardPageClient from "./DashboardPageClient";

export default async function ProfilePageClient() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = await getProducts({
    limit: 20,
    offset: 0,
    sellerId: user?.id,
  });

  return <DashboardPageClient products={products} />;
}
