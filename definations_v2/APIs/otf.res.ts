export interface OTFAddResponse {
  id: number;
  otfItemNo: string;
  otfItemVariant: string;
  ourSKU: string;
  name: string;
  color: string;
  colorOptionId: number;
  size: Size[];
  price: number;
  qty: number[];
  storeId: number;
  imagePath: string;
}

export interface Size {
  attributeOptionId: number;
  name: string;
}
