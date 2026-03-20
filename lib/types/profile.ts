export type Profile = {
  id: string;
  name: string;
  sellerApproved: boolean;
  email: string;
  role: string;
  stripeAccountId?: string;
  createdAt: string;
};
