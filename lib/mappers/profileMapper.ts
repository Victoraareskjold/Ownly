import { Profile } from "@/lib/types/profile";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapProfileFromDb(data: any): Profile {
  return {
    id: data.id,
    name: data.name,
    isTeam: data.is_team,
    sellerApproved: data.seller_approved,
    email: data.email,
    role: data.role,
    stripeAccountId: data.stripe_account_id,
    createdAt: data.created_at,
  };
}
