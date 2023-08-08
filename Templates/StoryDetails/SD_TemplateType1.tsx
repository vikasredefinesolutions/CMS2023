import Story_Stories from '@appComponents/common/StoriesList';
import NxtImage from '@appComponents/reUsable/Image';
import { __StaticImg } from '@constants/assets';
import { _Story } from '@definations/story';
import React from 'react';
import Story_HeroSection from './components/SD_HeroSection';

interface _Props {
  list: _Story[];
  banner: {
    name: string;
    urlType: string;
    url: string;
  }[];
  productSku: string;
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

const SD_TemplateType1: React.FC<_Props> = ({ list, ...rest }) => {
  return (
    <>
      <Story_HeroSection {...rest} />
      <section className='relative pt-[40px] bg-gray-100'>
        <div className='container px-[16px] mx-auto'>
          <div className='flex flex-wrap mx-[-12px] mt-[-24px]'>
            <div className='w-full px-[12px] mt-[24px]'>
              <div className='bg-white flex flex-wrap justify-center items-center p-[20px]'>
                <div className='flex border-r border-primary justify-center items-center pr-[12px] pl-[12px] w-full lg:w-auto'>
                  <div className='w-14'>
                    <NxtImage
                      isStatic={true}
                      className=''
                      src={__StaticImg.shippingTruck}
                      alt='Text'
                    />
                  </div>
                  <div className='flex-shrink'>
                    <div className='w-full ml-[12px] text-medium-text text-primary'>
                      <strong>FREE SHIPPING</strong>
                    </div>
                    <div className='w-full ml-[12px] text-default-text text-primary'>
                      TO ONE LOCATION
                    </div>
                  </div>
                </div>
                <div className='flex border-r border-primary justify-center items-center pr-3 pl-3 w-full lg:w-auto'>
                  <div className='w-14'>
                    <NxtImage
                      isStatic={true}
                      className=''
                      src={__StaticImg.coupons}
                      alt='Blue and black iphone case'
                    />
                  </div>
                  <div className='flex-shrink'>
                    <div className='w-full ml-[12px] text-medium-text text-primary'>
                      <strong>1st Logo Free</strong>
                    </div>
                    <div className='w-full ml-[12px] text-default-text text-primary'>
                      UP TO 10,000 STITCHES
                    </div>
                  </div>
                </div>
                <div className='flex justify-center items-center pr-3 pl-3 w-full lg:w-auto'>
                  <div className='w-14'>
                    <NxtImage
                      isStatic={true}
                      className=''
                      src={__StaticImg.freeProofIcon}
                      alt='Free proof icon'
                      role='presentation'
                    />
                  </div>
                  <div className='flex-shrink'>
                    <div className='w-full ml-[12px] text-medium-text text-primary'>
                      <strong>FREE PROOF</strong>
                    </div>
                    <div className='w-full ml-[12px] text-default-text text-primary'>
                      ON ALL ORDERS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden='true' data-acsb-hidden='true'></div>
        </div>
      </section>
      <Story_Stories
        stories={list}
        showByDefault={8}
        buttonType='PrevNext'
        next={rest.story.next}
        prev={rest.story.prev}
      />
    </>
  );
};

export default SD_TemplateType1;
