import React from 'react';

interface _Props {}

const mockData = [
  {
    title: 'Custom Nike (Everything)',
    slug: 'https://www.corporategear.com/nike.html?v=brand-product-list',
    imgSrc:
      'https://blog.corporategear.com/wp-content/uploads/2021/02/Nike-Custom-Sports-Apparel.png',
  },
  {
    title: 'Custom Nike (Everything)',
    slug: 'https://www.corporategear.com/nike.html?v=brand-product-list',
    imgSrc:
      'https://blog.corporategear.com/wp-content/uploads/2021/02/Nike-Custom-Sports-Apparel.png',
  },
  {
    title: 'Custom Nike (Everything)',
    slug: 'https://www.corporategear.com/nike.html?v=brand-product-list',
    imgSrc:
      'https://blog.corporategear.com/wp-content/uploads/2021/02/Nike-Custom-Sports-Apparel.png',
  },
  {
    title: 'Custom Nike (Everything)',
    slug: 'https://www.corporategear.com/nike.html?v=brand-product-list',
    imgSrc:
      'https://blog.corporategear.com/wp-content/uploads/2021/02/Nike-Custom-Sports-Apparel.png',
  },
];

const SD_ShopNowSection: React.FC<_Props> = () => {
  return (
    <section className='relative pt-[40px] bg-light-gray'>
      <div className='container px-[16px] mx-auto'>
        <div className='flex flex-wrap -mx-[12px] -mt-[24px]'>
          {mockData.map((ele, index) => (
            <div
              key={index}
              className='w-full lg:w-1/4 px-[12px] md:w-1/3 mt-[24px]'
            >
              <div className='border border-gray-50 px-[24px] py-[24px] bg-[#ffffff] relative'>
                <div className='flex justify-center'>
                  <a className='' href={ele.slug}>
                    <span className='sr-only'>{ele.title} </span>
                    <img
                      className='w-full mx-auto'
                      src={ele.imgSrc}
                      alt={ele.title}
                      data-aos='none'
                      role='presentation'
                    />
                  </a>
                </div>
                <div className='text-center w-full'>
                  <div className='text-medium-text p-[8px] text-anchor tetx-center'>
                    {ele.title}
                  </div>
                  <div className='mb-[8px] text-medium-text'>
                    <strong></strong>
                  </div>
                  <a
                    target=''
                    href={ele.slug}
                    className='btn btn-tertiary btn-md'
                  >
                    <span className='sr-only'>{ele.title}</span> SHOP NOW
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SD_ShopNowSection;
