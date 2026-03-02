export type Profile = {
  id: string;
  name: string;
  team?: Team | null;
};

export type Team = {
  id: string;
  name: string;
};
