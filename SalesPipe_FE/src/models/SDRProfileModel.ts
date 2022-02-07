export interface SDRProfileModel {
  id: string;
  userId: string;
  isVerified: boolean;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  linkedIn: string | null;
  phone: string | null;
  country: string | null;
  headline: string | null;
  rate: number | null;
  bio: string | null;
  workHistory: string | null;
  avatar: string | null;
  video: string | null;
  languages: string | null;
  yose: number | null;
  industries: any[];
  saleChannels: string | null;
  saleSkills: string | null;
  saleTools: string | null;
  type: string | null;
  gender: string | null;
  age: number | null;
  expression: string | null;
}

export interface SDRProfileView {
  id: string;
  userId: string;
  isVerified: boolean;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  linkedIn: string | null;
  phone: string | null;
  country: string | null;
  headline: string | null;
  rate: number | null;
  bio: string | null;
  workHistory: string | null;
  avatar: string | null;
  video: string | null;
  languages: string[];
  yose: number | null;
  industries: any[];
  saleChannels: string | null;
  saleSkills: string[];
  saleTools: string[];
  gender: string | null;
  age: number | null;
  expression: string | null;
}
