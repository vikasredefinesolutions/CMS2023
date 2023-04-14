import { __pagesText } from '@constants/pages.text';
import { _ProductReviewRatingProps } from '@templates/ProductDetails/Components/productDetailsComponents';
import React from 'react';

const RattingLayout1: React.FC<_ProductReviewRatingProps> = ({
  reviewsCount,
}) => {
  const reviewRatingarray = [
    reviewsCount?.fiveStarRatingCount,
    reviewsCount?.fourStarRatingCount,
    reviewsCount?.threeStarRatingCount,
    reviewsCount?.twoStarRatingCount,
    reviewsCount?.oneStarRatingCount,
  ];
  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full md:w-1/4 tracking-[1.4px]'>
          <div>
            <h2 className='mb-[20px] text-[#ffffff] text-default-text font-bold text-left'>
              {__pagesText.productInfo.productReviewRating.overAllRating}
            </h2>
            <div className='mb-[20px] flex items-center'>
              {Array(5)
                .fill('')
                .map((_, index) => {
                  return (
                    <svg
                      key={index}
                      className={`h-5 w-5 flex-shrink-0 text-${
                        reviewsCount?.ratingAverage &&
                        index < reviewsCount?.ratingAverage
                          ? 'yellow-400'
                          : 'gray-300'
                      }`}
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                    </svg>
                  );
                })}
              <span className='text-[#ffffff] text-title-text ml-[8px]'>
                {reviewsCount?.ratingAverage}
              </span>
            </div>
            <div className='mb-[20px] text-[#ffffff] text-default-text text-left'>
              {__pagesText.productInfo.productReviewRating.basedOn}{' '}
              {reviewsCount?.totalRatingCount}
              {__pagesText.productInfo.productReviewRating.reviews}
            </div>
          </div>
        </div>
        <div className='w-full md:w-1/4 mt-6 md:mt-0'>
          <dl className=''>
            {reviewRatingarray.map((value, index) => {
              return (
                <div
                  className='flex items-center text-[#ffffff] text-default-text mb-[5px] last:mb-0'
                  key={index}
                >
                  <dt className='flex items-center'>
                    <div className='w-[12px] font-[500]'>{5 - index}</div>

                    <div
                      aria-hidden='true'
                      className='ml-[4px] flex items-center'
                    >
                      <svg
                        className='flex-shrink-0 h-5 w-5 text-yellow-400'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <div className='relative w-[96px] ml-[8px]'>
                        <div className='h-[8px] w-[96px] bg-[#ffffff]'></div>
                        <div
                          style={{
                            width: ` ${
                              reviewsCount?.totalRatingCount &&
                              value &&
                              `calc(${
                                (value / reviewsCount?.totalRatingCount) * 100
                              }%)`
                            }
                              `,
                          }}
                          className='absolute inset-y-0 bg-[#7bc24e]'
                        ></div>
                      </div>
                    </div>
                  </dt>

                  <dd className='ml-[5px] w-[40px] text-[#ffffff] text-default-text tabular-nums'>
                    {/* (
                    {reviewsCount?.totalRatingCount &&
                      value &&
                      Math.abs(
                        (value / reviewsCount?.totalRatingCount) * 100,
                      ).toFixed(0)}
                    {'%'}) */}
                    {`(${reviewRatingarray[index]})`}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </>
  );
};

export default RattingLayout1;
