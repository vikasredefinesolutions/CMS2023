import { StaticImageData } from 'next/image';

export interface _Imageprops {
  isStatic?: boolean;
  sizes?: string;
  src: null | string | StaticImageData;
  alt: string | null;
  className: string;
  width?: number | string;
  height?: number | string;
  cKey?: number | string;
  useNextImage?: boolean;
  layout?: 'intrinsic' | 'fill' | 'responsive';
  title?: string;
  extraUrl?: boolean;
  extraUrlPath?: string;
  role?: string;
  decoding?: 'async';
}

export interface _PriceProps {
  value: number | string | undefined;
  prices?: { msrp: number; ourCost?: number; salePrice: number };
  addColon?: boolean;
}
