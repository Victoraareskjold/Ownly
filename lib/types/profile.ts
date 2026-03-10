export type Profile = {
  id: string;
  name: string;
  isTeam: boolean;
  sellerApproved: boolean;
  email: string;
  role: string;
  stripeAccountId?: string;
  createdAt: string;
};

export type Team = {
  id: string;
  name: string;
};
