/* eslint-disable no-unused-vars */
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { useRouter } from 'next/router';
import React from 'react';
import RatingReviewDetails1 from './Components/RatingReviewDetails1';
import RattingLayout1 from './Components/RattingLayout1';
import { _ReviewDetailsProps } from './review';

const ReviewDetails_Type1: React.FC<_ReviewDetailsProps> = ({
  storeCode,
  reviewsCount,
  modalHandler,
  userId,
  productId,
  attributeId,
}) => {
  const router = useRouter();

  return (
    <>
      <section>
        <div className='container mx-auto mt-[40px] lg:pl-[45px] lg:pr-[45px]'>
          <div className='text-center pb-[40px]'>
            <div className='pb-[20px] font-[600] text-2xl-text'>
              {__pagesText.review.heading}
              <span className='border-b border-black w-[50px] mx-auto h-[1px] block pt-[5px]'></span>
            </div>

            {reviewsCount?.totalRatingCount ? (
              <div className='mt-[20px]'>
                <div className='mx-auto bg-[#051c2c] p-[20px] text-[#ffffff]'>
                  <RattingLayout1
                    storeCode={storeCode}
                    reviewsCount={reviewsCount}
                  />
                </div>
              </div>
            ) : (
              <div className='text-default-text font-default-text text-center mb-5'>
                {__pagesText.review.noReviewAvailable}
              </div>
            )}
            <div className='kt-product-box'>
              <div>
                <div className='first-box overview-section'>
                  <article className='reviews-text-bg'>
                    <div className='write-customer-comment-box px-[40px] pt-[40px] pb-[20px] bg-light-gray'>
                      <div className='customer-comment-name text-title-text uppercase'>
                        {__pagesText.review.wantToHearFromYou}
                      </div>
                      <div className='customer-comment-box1 text-default-text pt-[20px] pb-[20px]'>
                        {__pagesText.review.tellUsWhatyouThink}
                      </div>
                      <div className='write-comment-btn p-[20px]'>
                        <button
                          type='submit'
                          className='btn btn-md btn-secondary uppercase'
                          onClick={() => {
                            if (userId) {
                              router.push(
                                `${paths.WRITE_A_REVIEW}?ProductId=${productId}&attributeId=${attributeId}`,
                              );
                              return;
                            }
                            modalHandler('login');
                          }}
                        >
                          {__pagesText.review.writeAReview}
                        </button>
                      </div>
                    </div>
                    <div className='px-[40px] bg-light-gray'>
                      <RatingReviewDetails1
                        storeCode={storeCode}
                        productId={productId}
                      />
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReviewDetails_Type1;
