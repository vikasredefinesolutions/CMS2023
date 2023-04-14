export interface LogoDetails {
  status: 'LOGO SUBMITTED' | 'WILL SUBMIT LATER' | string;
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
