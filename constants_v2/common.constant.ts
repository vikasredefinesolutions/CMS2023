/* eslint-disable no-unused-vars */
export const SortingMethod = [
  {
    name: 'Relevance',
    type: 1,
  },
  {
    name: 'Price: (Low to High)',
    type: 2,
  },
  {
    name: 'Price: (High to Low)',
    type: 3,
  },
];

export const Sorting_Method_all = [
  {
    name: 'Sort',
    type: 1,
  },
  {
    name: 'Price: (Low to High)',
    type: 2,
  },
  {
    name: 'Price: (High to Low)',
    type: 3,
  },
  {
    name: 'Best Rating',
    type: 4,
  },
  {
    name: 'Newest',
    type: 5,
  },
];

export const properties = {
  breadcrumb: {
    position: 'Left',
    bg_color: '#4e4e4e',
    hover_bg_color: '#4e4e4e',
    text_color: '#g4g4g4',
    hover_text_color: '#4e4e4e',
  },

  banner_box_top: {
    html: '<div>Entire HTML goes Here</div>',
  },

  banner: {
    type: 'type1',
  },

  banner_box_bottom: {
    html: '<div>Entire HTML goes Here</div>',
  },

  filter_box: {
    layout: 'sidefilter',
    // filter_option: [size, color, category, type, price, review_rating, brand, discount]
  },

  result_box: {
    layout: 'unset',
    showGrid: false,
  },

  product_list_box: {
    box_count: 3,
    column_select: 4,
    alignment: 'Center',
    product_info: {
      brand: true,
      product_name: {
        display: true,
        font_size: 'small',
        text_style: 'normal',
        color: '#4e4e4e',
      },
      price: true,
      color: {
        display: false,
        view_option: 'rounded / square',
      },
      short_description: {
        display: true,
        font_size: 'small',
        text_style: 'normal',
      },
      product_rating: true,
    },
    availability: true,
    add_to_cart: true,
    tags: false,
  },
  product: {
    size_input: 'select',
    isMultiple: true,
  },
};

export const __Login = {
  something_went_wrong: 'Something went wrong, try again!!!',
};

export enum __Cookie {
  loggedIn = 'loggedIn',
  userId = 'userId',
  storeInfo = 'storeInfo',
  tempCustomerId = 'tempCustomerId',
}

// cookie_expiry in days
export const __Cookie_Expiry = {
  userId: 2,
  storeBuilder: {
    tempCustomerId: 7,
  },
};

export enum __Error {
  storeIdMissing = 'STORE_ID is missing',
  noPageTypeFound = 'PageType is missing',
}

export const maximumWordsUnderChestLogo = 26;
export const maximumWordsUnderSleeveLogo = 20;

export const __LocalStorage = {
  recetlyViewedProducts: '_rcvwp',
  compareProducts: '_cmpPdts',
  tempCustomerId: 'tempCustomerId',
};

export const __Params = {
  giftId: 'giftId',
};

export const __UserMessages = {
  signUpPage: {
    SomethingWentWrong: 'Something went wrong. Try again later!!!',
    SuccessFullyAccountCreated: 'Account Created Successfully!!!',
  },
};

export const employeeData = {
  secretPass: 'XkhZG4fW2t2W',
};

export const showcolors = 4;
export const listing_max_showcolors = 7;
export const zeroValue = 0;
export const CustomizeLaterMain = 'Customize Later';
export const CustomizeLater =
  'A Gear Expert will contact you to discuss the customization of this product.';

export const cardType = [
  {
    name: 'VISA',
    url: '/assets/images/card-visa.webp',
  },

  {
    name: 'MASTERCARD',
    url: '/assets/images/card-master.webp',
  },

  {
    name: 'AMEX',
    url: '/assets/images/card-american-express.webp',
  },

  {
    name: 'DISCOVER',
    url: '/assets/images/card-discover.webp',
  },
];

export const companyInfo = {
  email: 'customerservice@parsonskellogg.com',
  phoneNumber: '(866) 602-8398',
};
