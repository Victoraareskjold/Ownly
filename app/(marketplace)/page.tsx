import { getLatestProducts } from "@/lib/queries/getProducts";
import HomePageClient from "./HomePageClient";

export default async function HomePage() {
  const latest = await getLatestProducts(6);

  return <HomePageClient initialProducts={latest} />;
}
