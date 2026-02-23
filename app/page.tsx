import MarketplacePage from "./marketplace/page";
import WishlistPage from "./wishlist/page";

export default function Page() {
  if (process.env.NEXT_PUBLIC_MODE === "wishlist") {
    return <WishlistPage />;
  }

  return <MarketplacePage />;
}
