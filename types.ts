
export type Region = string;
export type Focus = string;
export type Species = string;

export interface Organisation {
  id: string;
  name: string;
  logo: string;
  address: string;
  country: Region;
  focus: Focus[];
  species: Species[];
  website: string;
  social: string;
  email: string;
  description?: string; // Now optional as we use data-driven generation
}

export interface FilterState {
  searchQuery: string;
  regions: Region[];
  foci: Focus[];
  species: Species[];
}
