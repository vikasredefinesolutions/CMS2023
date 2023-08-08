import NxtImage from '@appComponents/reUsable/Image';
import { __StaticImg } from '@constants/assets';
import { paths } from '@constants/paths.constant';
import { _Story } from '@definations/story';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import React from 'react';
import { _globalStore } from 'store.global';

interface _Props {
  firstTwo: _Story[];
}

let mediaBaseUrl = _globalStore.blobUrl;

const SL_HeroSection: React.FC<_Props> = ({ firstTwo }) => {
  const firstStory = firstTwo.length > 0 ? firstTwo[0] : null;
  const secondStory = firstTwo.length > 1 ? firstTwo[1] : null;
  const store = useTypedSelector_v2((state) => state.store);
  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;

  if (!firstStory) {
    return (
      <section className='relative py-20 mt-10 bg-light-gray w-full'>
        <div className='container mx-auto'>
          <div className='flex flex-wrap'>
            <div className='w-full lg:w-1/2 bg-[#ffffff] flex relative z-10'>
              <div className='w-full p-[15px] lg:p-32'>No Stories found</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className='relative py-20 mt-10 bg-light-gray w-full'>
        <div className='container mx-auto'>
          <div className='flex flex-wrap'>
            <div className='w-full lg:w-1/2 bg-[#ffffff] flex relative z-10'>
              <div className='w-full p-[15px] lg:p-32'>
                <div className='w-full max-w-lg'>
                  <div className='mt-[10px] mb-[10px]'>
                    <NxtImage
                      alt=''
                      className='w-auto'
                      isStatic={true}
                      src={__StaticImg.graphArrow}
                      title=''
                    />
                  </div>
                  <div className='mb-[10px] text-default-text'>
                    <Link href='/' title='' className=''>
                      <span className='btn bg-light-gray hover:bg-tertiary-hover hover:text-anchor-hover text-anchor pl-[20px] pr-[20px] pt-[10px] pb-[10px] !uppercase text-default-text'>
                        {firstStory.categoryName}
                      </span>
                    </Link>
                  </div>
                  <div className='text-title-text mb-[10px]'>
                    {firstStory.name}
                  </div>
                  <div className='text-base mt-[20px]'>
                    <Link href={`${paths.STORIES}/${firstStory.slug}.html`}>
                      <a className='custbtn-secondary pb-[10px] pr-[20px] pl-[20px] pt-[10px]'>
                        LEARN MORE
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className='h-96 lg:h-auto lg:absolute top-0 bottom-0 lg:w-1/2 bg-no-repeat bg-cover right-48 w-full'
              style={{
                backgroundImage: `url(${mediaBaseUrl}${firstStory.storiesImage})`,
              }}
            >
              &nbsp;
            </div>
          </div>
        </div>
      </section>

      {secondStory && (
        <section className='relative py-20 mt-10 bg-light-gray w-full'>
          <div className='container mx-auto'>
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-1/2 bg-[#ffffff] flex relative z-10 ml-auto'>
                <div className='w-full p-[15px] lg:p-32'>
                  <div className='w-full max-w-lg'>
                    <div className='mt-[10px] mb-[10px]'>
                      <NxtImage
                        alt=''
                        isStatic={true}
                        className='w-auto'
                        src={__StaticImg.graphArrow}
                        title=''
                      />
                    </div>
                    <div className='mb-[10px] text-default-text'>
                      <Link
                        href={secondStory.categoryUrl}
                        title=''
                        className=''
                      >
                        <span className='btn bg-light-gray hover:bg-tertiary-hover hover:text-anchor-hover text-anchor pl-[20px] pr-[20px] pt-[10px] pb-[10px] !uppercase text-default-text'>
                          {secondStory.categoryUrl}
                        </span>
                      </Link>
                    </div>
                    <div className='text-title-text mb-[10px]'>
                      {secondStory.name}
                    </div>
                    <div className='text-base mt-[20px]'>
                      <Link href={`${paths.STORIES}/${secondStory.slug}`}>
                        <a className='custbtn-secondary pb-[10px] pr-[20px] pl-[20px] pt-[10px]'>
                          LEARN MORE
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className='h-96 lg:h-auto lg:absolute top-0 bottom-0 lg:w-1/2 bg-no-repeat bg-cover left-48 w-full'
                style={{
                  backgroundImage: `url(${mediaBaseUrl}${secondStory.storiesImage})`,
                }}
              >
                &nbsp;
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SL_HeroSection;
