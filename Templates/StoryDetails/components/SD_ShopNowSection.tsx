import NxtImage from '@appComponents/reUsable/Image';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface _Props {
  productSku: string;
}

// const mockData = [
//   {
//     title: 'Custom Nike (Everything)',
//     seName: '/adidas.html',
//     imgSrc:
//       'https://blog.corporategear.com/wp-content/uploads/2021/02/Nike-Custom-Sports-Apparel.png',
//   },
//   {
//     title: 'Custom Nike (Everything)',
//     seName: '/under-armour.html',
//     imgSrc:
//       'https://blog.corporategear.com/wp-content/uploads/2021/02/Nike-Custom-Sports-Apparel.png',
//   },
//   {
//     title: 'Custom Nike (Everything)',
//     seName: '/peter-millar.html',
//     imgSrc:
//       'https://blog.corporategear.com/wp-content/uploads/2021/02/Nike-Custom-Sports-Apparel.png',
//   },
//   {
//     title: 'Custom Nike (Everything)',
//     seName: '/nike.html',
//     imgSrc:
//       'https://blog.corporategear.com/wp-content/uploads/2021/02/Nike-Custom-Sports-Apparel.png',
//   },
// ];

interface StoryProduct {
  name: string;
  image?: string;
  link: string;
  buttonText: string;
}

const SD_ShopNowSection: React.FC<_Props> = ({ productSku }) => {
  const [products, setProducts] = useState([]);
  const { store } = useTypedSelector_v2((state) => state);

  useEffect(() => {
    if (productSku) {
      const parsedProducts = JSON.parse(productSku);
      setProducts(parsedProducts);
    }
  }, [productSku]);

  return (
    <section className='relative pt-[40px] bg-light-gray'>
      <div className='container px-[16px] mx-auto'>
        <div className='flex flex-wrap -mx-[12px] -mt-[24px]'>
          {Object.keys(products).length > 0 &&
            products.map((ele: StoryProduct, index: number) => (
              <div
                key={index}
                className='w-full lg:w-1/4 px-[12px] md:w-1/3 mt-[24px]'
              >
                <div className='border border-gray-50 px-[24px] py-[24px] bg-[#ffffff] relative'>
                  <div className='flex justify-center'>
                    <Link className='' href={ele.link}>
                      <a>
                        <span className='sr-only'>{ele.name} </span>
                        <NxtImage
                          className='w-full mx-auto'
                          src={ele?.image || null}
                          alt='product image'
                          useNextImage={false}
                          data-aos='none'
                          role='presentation'
                        />
                      </a>
                    </Link>
                  </div>
                  <div className='text-center w-full'>
                    <div className='text-medium-text p-[8px] text-anchor tetx-center'>
                      <Link className='' href={ele.link}>
                        <a>{ele.name}</a>
                      </Link>
                    </div>
                    <div className='mb-[8px] text-medium-text'>
                      <strong></strong>
                    </div>
                    <Link
                      href={ele.link}
                      className='custbtn custbtn-primary btn-md'
                    >
                      <a className='custbtn custbtn-primary'>
                        {ele.buttonText}
                      </a>
                    </Link>
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
