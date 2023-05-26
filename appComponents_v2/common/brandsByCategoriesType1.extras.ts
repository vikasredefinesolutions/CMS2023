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
        id: 49,
        brandName: 'Patagonia',
        seName: 'patagonia',
      },
      {
        staticImagePath: '',
        id: 9,
        brandName: 'Nike',
        seName: 'nike',
      },
      {
        staticImagePath: '',
        id: 28,
        brandName: 'Peter Millar',
        seName: 'peter-millar',
      },
      {
        staticImagePath: '',
        id: 10,
        brandName: 'YETI',
        seName: 'yeti',
      },
      {
        staticImagePath: '',
        id: 37,
        brandName: 'The North Face',
        seName: 'the-north-face',
      },
      {
        staticImagePath: '',
        id: 5,
        brandName: 'Helly Hansen',
        seName: 'helly-hansen',
      },
      {
        staticImagePath: '',
        id: 7,
        brandName: 'Southern Tide',
        seName: 'southern-tide',
      },
      {
        staticImagePath: '',
        id: 6,
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
        id: 21,
        brandName: 'STIO',
        seName: 'stio',
      },
      {
        staticImagePath: '',
        id: 39,
        brandName: 'Carhartt',
        seName: 'carhartt',
      },

      {
        staticImagePath: '',
        id: 45,
        seName: 'marine-layer',

        brandName: 'Marine Layer',
      },
      {
        staticImagePath: '',
        id: 12,
        brandName: 'Columbia',
        seName: 'columbia',
      },
      {
        staticImagePath: '',
        id: 36,
        brandName: 'Marmot',
        seName: 'marmot',
      },
      {
        staticImagePath: '',
        id: 59,
        brandName: 'Charles River Apparel',
        seName: 'charles-river-apparel',
      },
      {
        staticImagePath: '',
        id: 61,
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
        id: 2,
        brandName: 'Faherty Brand',
        seName: 'faherty-brand',
      },
      {
        staticImagePath: '',
        id: 13,
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
        id: 40,
        brandName: 'Fairway & Greene',
        seName: 'fairway--greene',
      },
      {
        staticImagePath: '',
        id: 33,
        seName: 'taylormade',

        brandName: 'TaylorMade',
      },
      {
        staticImagePath: '',
        id: 35,
        brandName: 'Zero Restriction',
        seName: 'zero-restriction',
      },
      {
        staticImagePath: '',
        id: 20,
        brandName: 'Travis Mathew',
        seName: 'travis-mathew',
      },
    ],
  },
  {
    category: 'Sporting Goods',
    brandsIDs: [
      {
        staticImagePath: '',
        id: 4,
        brandName: 'adidas',
        seName: 'adidas',
      },
      {
        staticImagePath: '',
        id: 8,
        brandName: 'Under Armour',
        seName: 'under-armour',
      },
      {
        staticImagePath: '',
        id: 14,
        brandName: 'Spyder',
        seName: 'spyder',
      },
      {
        staticImagePath: '',
        id: 30,
        brandName: 'BAUER',
        seName: 'bauer',
      },
      {
        staticImagePath: '',
        id: 66,
        brandName: 'Lacoste',
        seName: 'lacoste',
      },
      {
        staticImagePath: '',
        id: 57,
        brandName: 'SPORT TEK',
        seName: 'sport-tek',
      },
      {
        staticImagePath: '',
        id: 27,
        brandName: 'New Era',
        seName: 'new-era',
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
        id: 38,
        brandName: 'Matouk',
        seName: 'matouk',
      },
      {
        staticImagePath: '',
        id: 64,
        brandName: 'KNACK',
        seName: 'knack',
      },
      {
        staticImagePath: '',
        id: 26,
        brandName: 'Tile',
        seName: 'tile',
      },
      {
        staticImagePath: '',
        id: 67,
        brandName: 'Ember',
        seName: 'ember',
      },
      {
        staticImagePath: '',
        id: 43,
        brandName: 'Moleskine',
        seName: 'moleskine',
      },
      {
        staticImagePath: '',
        id: 63,
        brandName: 'Swell',
        seName: 'swell',
      },
      {
        staticImagePath: '',
        id: 1,
        brandName: 'Cross',
        seName: 'cross',
      },
      {
        staticImagePath: '',
        id: 62,
        brandName: 'Bose',
        seName: 'bose',
      },
    ],
  },
];
