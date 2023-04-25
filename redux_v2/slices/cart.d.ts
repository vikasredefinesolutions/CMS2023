import { logoLocation } from '@constants/enum';

export interface LogoDetails {
  status:
    | logoLocation.submitted
    | logoLocation.submitLater
    | logoLocation.logoSubmitted;
  location: {
    imageUrl: string;
    name: string;
    value: string;
  };
  date: string | Date;
  price: number;
  quantity: number;
  title?: string | null;
  filePath?: string | null;
}

export interface AvailableLocationDetails {
  value: string;
  label: string;
  image: {
    url: string;
    alt: string;
  };
  price: number;
  cost: number;
}
