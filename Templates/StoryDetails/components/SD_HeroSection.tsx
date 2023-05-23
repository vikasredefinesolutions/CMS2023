import { __StaticImg } from '@constants/assets';
import Link from 'next/link';
import React from 'react';
import SD_FaqSection from './SD_FaqSection';
import SD_ShopNowSection from './SD_ShopNowSection';

interface _Props {
  banner: {
    name: string;
    urlType: string;
    url: string;
  }[];
  story: {
    title: string;
    category: {
      name: string;
      url: string;
    };
    prev: string;
    next: string;
  };
  page: {
    accordionContent: any;
    type: 'blog';
    slug: string;
  };
}

const SD_HeroSection: React.FC<_Props> = ({ banner, story, page }) => {
  return (
    <section className='mt-[20px]'>
      <div>
        <section
          className='bg-cover bg-no-repeat relative '
          style={{
            backgroundImage: `url(${__StaticImg.petternBanner})`,
          }}
        >
          <div
            className='container pl-[16px] pr-[16px] mx-auto text-center pt-[30px] sm:pt-[40px] lg:pt-[120px] pb-[30px] sm:pb-[40px] lg:pb-[120px]'
            role='main'
          >
            <div className='mb-[16px]'>
              <Link href={story.category.url}>
                <span className='btn bg-white hover:bg-tertiary-hover hover:text-anchor-hover text-anchor py-[8px] px-10 text-title-text btn-md'>
                  {story.category.name}
                </span>
              </Link>
            </div>
            <div className='mb-[16px]'>
              <h1
                className='text-2xl-text text-[#ffffff] max-w-4xl mx-auto'
                role='heading'
              >
                {story.title}
              </h1>
            </div>
            {/* <div className='mb-[16px]'>
              <p className='text-default-text text-[#ffffff]'>
                <span className='mr-[8px]'>By Super Admin</span> |{' '}
                <span className='ml-2'>March, 13th, 2022</span>
              </p>
            </div> */}
            <div className='flex flex-wrap justify-center'>
              <Link className='' href={story.prev}>
                <a className='uppercase btn btn-tertiary text-default-text mr-[10px]'>
                  Previous
                </a>
              </Link>{' '}
              <Link href={story.next}>
                <a className='uppercase btn btn-tertiary text-default-text mr-[10px]'>
                  Next
                </a>
              </Link>
            </div>
          </div>
          <div className='w-full p-[16px] bg-default'>
            <div className='container px-[16px] mx-auto text-center'>
              {banner.map((ban, index) => {
                return (
                  <span key={index} className='mr-[8px]'>
                    <Link href={ban.url}>
                      <a className='text-[#ffffff] text-medium-text'>
                        {ban.name}
                      </a>
                    </Link>
                  </span>
                );
              })}
            </div>
          </div>
        </section>
        <SD_FaqSection page={page} />
        <SD_ShopNowSection />
        {/* <SD_ProductsSlider /> */}
      </div>
    </section>
  );
};

export default SD_HeroSection;
