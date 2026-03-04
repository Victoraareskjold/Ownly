export type Profile = {
  id: string;
  name: string;
  team?: Team | null;
  sellerApproved: boolean;
};

export type Team = {
  id: string;
  name: string;
};
