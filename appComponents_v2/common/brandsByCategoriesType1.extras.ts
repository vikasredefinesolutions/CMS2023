export type _Category =
  | 'Featured'
  | 'Outerwear'
  | 'Golf'
  | 'Sporting Goods'
  | 'Accessories';

export const categories: { label: _Category; classes: string }[] = [
  {
    label: 'Featured',
    classes:
      'bg-secondary hover:text-[#000000]  block pt-[16px] pb-[16px] pl-[40px] pr-[40px] text-center font-[600]',
  },
  {
    label: 'Outerwear',
    classes:
      'bg-tertiary hover:bg-tertiary-hover block pt-[16px] pb-[16px] pl-[40px] pr-[40px] text-center font-[600] hover:text-[#000000]',
  },
  {
    label: 'Golf',
    classes:
      'bg-quaternary hover:bg-quaternary-hover block pt-[16px] pb-[16px] pl-[40px] pr-[40px] text-center font-[600] hover:text-[#000000]',
  },
  {
    label: 'Sporting Goods',
    classes:
      'bg-primary hover:bg-primary-hover block pt-[16px] pb-[16px] pl-[40px] pr-[40px] text-center text-white font-[600] hover:text-[#ffffff]',
  },
  {
    label: 'Accessories',
    classes:
      'bg-default hover:bg-default-hover block pt-[16px] pb-[16px] pl-[40px] pr-[40px] text-center text-white font-[600] hover:text-[#ffffff]',
  },
];

export const Cateogory: _Category[] = [
  'Featured',
  'Outerwear',
  'Golf',
  'Sporting Goods',
  'Accessories',
];

export const colorImgTabArray = ['Featured', 'Outerwear', 'Golf'];

export const categoriesWithBrands: {
  category: _Category;
  brandsIDs: {
    staticImagePath: string;
    id: number;
    brandName: string;
    seName: string;
  }[];
}[] = [
  {
    category: 'Featured',
    brandsIDs: [
      {
        staticImagePath: '',
        id: 1,
        brandName: 'Peter Millar',
        seName: 'peter-millar',
      },
      {
        staticImagePath: '',
        id: 9,
        brandName: 'Patagonia',
        seName: 'patagonia',
      },
      {
        staticImagePath: '',
        id: 6,
        brandName: 'Nike',
        seName: 'nike',
      },
      {
        staticImagePath: '',
        id: 10,
        brandName: 'YETI',
        seName: 'yeti',
      },
      {
        staticImagePath: '',
        id: 43,
        brandName: 'The North Face',
        seName: 'the-north-face',
      },
      {
        staticImagePath: '',
        id: 11,
        brandName: 'Helly Hansen',
        seName: 'helly-hansen',
      },
      {
        staticImagePath: '',
        id: 9,
        brandName: 'Southern Tide',
        seName: 'southern-tide',
      },
      {
        staticImagePath: '',
        id: 18,
        brandName: 'johnnie-O',
        seName: 'johnnie-o',
      },
    ],
  },
  {
    category: 'Outerwear',
    brandsIDs: [
      {
        staticImagePath: '',
        id: 24,
        brandName: 'STIO',
        seName: 'stio',
      },
      {
        staticImagePath: '',
        id: 14,
        brandName: 'Carhartt',
        seName: 'carhartt',
      },

      {
        staticImagePath: '',
        id: 17,
        seName: 'marine-layer',

        brandName: 'Marine Layer',
      },
      {
        staticImagePath: '',
        id: 30,
        brandName: 'Columbia',
        seName: 'columbia',
      },
      {
        staticImagePath: '',
        id: 13,
        brandName: 'Marmot',
        seName: 'marmot',
      },
      {
        staticImagePath: '',
        id: 4,
        brandName: 'Charles River Apparel',
        seName: 'charles-river-apparel',
      },
      {
        staticImagePath: '',
        id: 40,
        brandName: 'Berne Apparel',
        seName: 'berne-apparel',
      },
      {
        staticImagePath: '',
        id: 15,
        brandName: 'Eddie Bauer',
        seName: 'eddie-bauer',
      },
    ],
  },
  {
    category: 'Golf',
    brandsIDs: [
      {
        staticImagePath: '',
        id: 41,
        brandName: 'FootJoy',
        seName: 'footjoy',
      },
      {
        staticImagePath: '',
        id: 5,
        brandName: 'Titleist',
        seName: 'titleist',
      },
      {
        staticImagePath: '',
        id: 44,
        brandName: 'Galvin Green',
        seName: 'galvin-green',
      },
      {
        staticImagePath: '',
        id: 32,
        brandName: 'Callaway Golf',
        seName: 'callaway-golf',
      },
      {
        staticImagePath: '',
        id: 26,
        brandName: 'Fairway & Greene',
        seName: 'fairway-greene',
      },
      {
        staticImagePath: '',
        id: 31,
        seName: 'taylormade',
        brandName: 'TaylorMade',
      },
      {
        staticImagePath: '',
        id: 28,
        brandName: 'Zero Restriction',
        seName: 'zero-restriction',
      },
      {
        staticImagePath: '',
        id: 70,
        brandName: 'Greyson',
        seName: 'Greyson',
      },
    ],
  },
  {
    category: 'Sporting Goods',
    brandsIDs: [
      {
        staticImagePath: '',
        id: 8,
        brandName: 'adidas',
        seName: 'adidas',
      },
      {
        staticImagePath: '',
        id: 35,
        brandName: 'Under Armour',
        seName: 'under-armour',
      },
      {
        staticImagePath: '',
        id: 49,
        brandName: 'Spyder',
        seName: 'spyder',
      },
      {
        staticImagePath: '',
        id: 27,
        brandName: 'BAUER',
        seName: 'bauer',
      },
      {
        staticImagePath: '',
        id: 57,
        brandName: 'Lacoste',
        seName: 'lacoste',
      },
      {
        staticImagePath: '',
        id: 33,
        brandName: 'SPORT TEK',
        seName: 'sport-tek',
      },
      {
        staticImagePath: '',
        id: 58,
        brandName: 'Next Level',
        seName: 'next-level',
      },
      {
        staticImagePath: '',
        id: 34,
        brandName: 'PUMA',
        seName: 'puma',
      },
    ],
  },
  {
    category: 'Accessories',
    brandsIDs: [
      {
        staticImagePath: '',
        id: 7,
        brandName: 'Imperial Headwear',
        seName: 'Imperial-Headwear',
      },
      {
        staticImagePath: '',
        id: 61,
        brandName: 'Matouk',
        seName: 'matouk',
      },
      {
        staticImagePath: '',
        id: 42,
        brandName: 'KNACK',
        seName: 'knack',
      },

      {
        staticImagePath: '',
        id: 39,
        brandName: 'Ember',
        seName: 'ember',
      },
      {
        staticImagePath: '',
        id: 34,
        brandName: 'Moleskine',
        seName: 'moleskine',
      },
      {
        staticImagePath: '',
        id: 37,
        brandName: 'Swell',
        seName: 'Swell',
      },
      {
        staticImagePath: '',
        id: 65,
        brandName: 'Tile',
        seName: 'tile',
      },

      {
        staticImagePath: '',
        id: 55,
        brandName: 'Bose',
        seName: 'bose',
      },
    ],
  },
];
