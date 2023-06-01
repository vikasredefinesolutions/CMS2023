export const __pagesConstant = {
  _document: {
    klaviyoKey: 'SNtzPN',
    klaviyoKey2: 'Tr8sxw',
  },
  _productDetails: {
    Misc: 'misc',
    imagesInRow: 7,
    descriptionLength: 500,
    recentlyViewed: {
      sliderSettings: {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
      },
    },
    similarProducts: {
      sliderSettings: {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              initialSlide: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 540,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    },
  },
  _header: {
    mobileBreakPoint: 1025,
    imagesToShowInBrandDropdown: 5,
    brandImage: ['patagonia', 'nike', 'peter-millar', 'yeti'], // [49, 9, 28, 10], //[198, 11, 187, 27],
    PKbrandImage: ['Patagonia', 'Nike', 'Peter-Millar', 'YETI'], // [49, 9, 28, 10], //[198, 11, 187, 27],
    dibrandImage: ['patagonia', 'peter-millar'],
  },
  _productAlike: {
    carouselCounter: 5,
  },
  _requestConsultation: {
    dateFormat: 'MM/DD/YYYY',
    minimumDesiredQtyToSelect: 1,
    preferedContactMethod: [
      { id: 'PHONE', name: 'Phone' },
      { id: 'EMAIL', name: 'Email' },
    ],
  },
  _itemsList: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciIsIlByYWRpcCJdLCJVc2VySWQiOiIxMzkiLCJTdG9yZUlkIjoiMTM5IiwiRnVsbE5hbWUiOiJQcmFkaXAgS2hlcjc0NyIsImVtYWlsIjoicHJhZGlwQHJlZGVmaW5lY29tbWVyY2UuY29tIiwicm9sZSI6IlN1cGVyQWRtaW4iLCJHdWlkIjoiOTc0YzMyZDYtYjM1OC00OGQzLTg4MjUtNjI1OThkMThhOWNhIiwibmJmIjoxNjc2MDI5NTE2LCJleHAiOjE2NzY0NjE1MTYsImlhdCI6MTY3NjAyOTUxNiwiaXNzIjoiSXNzdWVyIiwiYXVkIjoiQXVkaWVuY2UifQ.X6nqUgajllrrY1m15qahGx1CiW7Vt7bIXkSwPcETAPQ',
  },
  _myAccount: {
    ordersSection: {
      dateFormat: 'MM/DD/YYYY',
      table: {
        select: {
          options: [10, 25, 50, 100],
          defaultSelectedOption: 10,
        },
      },
    },
    orderDetails: {
      dateFormat: 'DD-MM-YYYY',
      dFormat: 'MM/DD/YYYY',
    },
    userManagement: {
      dateFormat: 'MM/DD/YYYY',
    },
  },
  checkoutPage: {
    orderStatus: 'new',
    transactionStatus: 'pending',
  },
  storyDetails: {
    products: ['adidas', 'under-armour', 'peter-millar', 'nike'],
  },
  AddressType: {
    B: 'B',
    Bill: 'BILL ',
    Ship: 'SHIP ',
  },
  show: {
    Yes: 'Yes',
    No: 'No',
  },
};
