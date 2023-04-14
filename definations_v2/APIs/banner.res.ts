export interface Welcome {
  success: boolean;
  data: _BannerRes[];
  errors: Errors;
  otherData: null;
}

export interface _BannerRes {
  name: string;
  id: number;
  brandLogo: string | null;
  description: string;
  banner: string;
  seTitle: null;
  seKeyWords: null;
  seDescription: null;
  h1: string;
  h2: string;
}

export interface Errors {}
