import { getProducts } from "@/lib/queries/getProducts";
import { createClient } from "@/lib/supabase/server";
import DashboardPageClient from "./DashboardPageClient";

export default async function ProfilePageClient() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = await getProducts({
    sellerId: user?.id,
    onlyApproved: false,
  });

  return <DashboardPageClient products={products} />;
}
