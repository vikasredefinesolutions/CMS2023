export type _StaticCategories = 'Men' | 'Women' | 'Accessories';

export const categoriesWithColor: {
  title: _StaticCategories;
  color: string;
}[] = [
  { title: 'Men', color: 'quaternary' },
  { title: 'Women', color: 'tertiary' },
  { title: 'Accessories', color: 'secondary' },
];

export const shopProductsByCategory: [
  { title: 'Men'; categories: { name: string; slug: string }[] },
  { title: 'Women'; categories: { name: string; slug: string }[] },
  { title: 'Accessories'; categories: { name: string; slug: string }[] },
] = [
  {
    title: 'Men',
    categories: [
      {
        name: 'All Men`s Clothing',
        slug: 'men.html?v=product-list',
      },
      {
        name: 'Men`s Jackets',
        slug: '/men-jackets.html?v=product-list',
      },
      {
        name: 'Men`s Polo',
        slug: '/men-polos.html?v=product-list',
      },
      {
        name: 'Men`s Quarter Zips',
        slug: '/men-quarter-zips-and-pullovers.html?v=product-list',
      },
      {
        name: 'Men`s Vest',
        slug: '/men-vests.html?v=product-list',
      },
      {
        name: 'Men`s Sweatshirts',
        slug: '/men-hoodies-and-sweatshirts.html?v=product-list',
      },
      {
        name: 'Men`s Dress',
        slug: '/men.html?v=product-list',
      },
      {
        name: 'Men`s T-shirts',
        slug: '/men-t-shirt.html?v=product-list',
      },
    ],
  },
  {
    title: 'Women',
    categories: [
      {
        name: 'All Women`s Apparel',
        slug: '/women.html?v=product-list',
      },
      {
        name: 'Women`s Jackets',
        slug: '/women-jackets.html?v=product-list',
      },
      {
        name: 'Women`s Polo',
        slug: '/women-polos.html?v=product-list',
      },
      {
        name: 'Women`s Quarter Zips',
        slug: '/women-quarter-zips-and-pullovers.html?v=product-list',
      },
      {
        name: 'Women`s Vest',
        slug: '/women-vests.html?v=product-list',
      },
      {
        name: 'Women`s Sweatshirts',
        slug: '/women-hoodies-and-sweatshirts.html?v=product-list',
      },
      {
        name: 'Women`s Dress Shirts',
        slug: '/women-shirts.html?v=product-list',
      },
      {
        name: 'Women`s T-shirts',
        slug: '/women-t-shirt.html?v=product-list',
      },
    ],
  },
  {
    title: 'Accessories',
    categories: [
      {
        name: 'All Gifts & Accessories',
        slug: '/accessories-drinkware.html?v=product-list',
      },
      {
        name: 'Tumblers & Drinkware',
        slug: '/accessories-drinkware.html?v=product-list',
      },
      {
        name: 'Bags & Backpacks',
        slug: '/accessories-bags.html?v=product-list',
      },
      {
        name: 'Hats & Headwear',
        slug: '/accessories-headwear.html?v=product-list',
      },
      {
        name: 'Golf Balls & Golf Bags',
        slug: '/accessories-golf.html?v=product-list',
      },
      {
        name: 'Notebooks & Office Gifts',
        slug: '/accessories-office.html?v=product-list',
      },
      {
        name: `Tech Gifts & Electronics`,
        slug: '/accessories-electronics.html?v=product-list',
      },
      {
        name: 'Custom Requests',
        slug: '/consultation.html',
      },
    ],
  },
];
