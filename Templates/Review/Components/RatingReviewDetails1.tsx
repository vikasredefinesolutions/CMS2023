import { __pagesText } from '@constants/pages.text';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { ReviewImages, _ProductReview } from '@services/review';
import { createstoreproductreviewcount } from '@services/review.service';
import { _ProductReviewDetailsProps } from '@templates/ProductDetails/Components/productDetailsComponents';
import React, { useState } from 'react';

const RatingReviewDetails1: React.FC<_ProductReviewDetailsProps> = ({
  productId,
  reviewsDeatils,
}) => {
  // const [reviewsDeatils, setReviewsdetails] = useState<_ProductReview[]>(
  //   reviews || [],
  // );

  // console.log('reviews: '), reviews;
  const [flag, setFlag] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const { mediaBaseUrl } = useTypedSelector_v2((state) => state.store);
  // console.log('product is ', productId);
  const { setShowLoader } = useActions_v2();

  // useEffect(() => {
  //   // console.log('reviews: ', reviews);
  //   setReviewsdetails(reviews || []);
  // }, [reviews]);

  // useEffect(() => {
  //   if (productId) {
  //     FetchProductReviewDetails(productId).then((details) =>
  //       setReviewsdetails(details),
  //     );
  //   }
  // }, [productId, reload]);

  const filterRating = (value: string) => {
    const result = reviewsDeatils?.sort((a: any, b: any) => {
      if (value == __pagesText.review.reviewSorting.positive) {
        return b.rating - a.rating;
      } else if (value == __pagesText.review.reviewSorting.negative) {
        return a.rating - b.rating;
      } else {
        return (
          new Date(a.reviewDate).valueOf() - new Date(b.reviewDate).valueOf()
        );
      }
    });
    // setReviewsdetails(result);
    setFlag(!flag);
  };

  const wasThisHelpfull = async (id: number, yes: number, no: number) => {
    setShowLoader(true);
    const data = await getLocation();
    const requestObject = {
      storeProductReviewCount: {
        id: 0,
        recStatus: 'A',
        rowVersion: '',
        ipAddress: data.ip_address,
        customerId: customerId || 0,
        macAddress: '00-00-00-00-00-00',
        location: `${data?.city}, ${data?.region}, ${data?.country}, ${data?.postal_code}`,
        storeid: storeId,
        reviewId: id,
        yes: yes,
        no: no,
      },
    };

    const response = await createstoreproductreviewcount(requestObject);
    if (response) {
      setReload(!reload);
      setShowLoader(false);
    }
  };

  if (!reviewsDeatils || reviewsDeatils.length === 0) return null;

  return (
    <>
      <div>
        <div className='mb-[20px] text-right'>
          <div className='inline-block'>
            <select
              className='form-input'
              id=''
              onChange={(e) => filterRating(e.target.value)}
            >
              <option value={__pagesText.review.reviewSorting.latest}>
                {__pagesText.review.reviewSorting.mostRecent}
              </option>
              <option value={__pagesText.review.reviewSorting.positive}>
                {__pagesText.review.reviewSorting.positiveFirst}
              </option>
              <option value={__pagesText.review.reviewSorting.negative}>
                {__pagesText.review.reviewSorting.negativeFirst}
              </option>
            </select>
          </div>
        </div>

        <div className='flow-root pb-[20px]'>
          <div className='-my-[10px]'>
            {reviewsDeatils?.map((reviewsDeatil: _ProductReview) => {
              return (
                <div
                  className='py-[10px]'
                  key={reviewsDeatil.reviewId}
                  itemProp='reviewRating'
                  itemType='https://schema.org/Rating'
                  itemScope
                >
                  <meta
                    itemProp='ratingValue'
                    content={`${reviewsDeatil.rating}`}
                  />
                  <meta itemProp='bestRating' content='5' />
                  <div className='border border-[#4b5963] bg-[#ffffff] p-[30px] flex flex-wrap items-center'>
                    <div className='w-full lg:w-1/4 lg:border-r lg:border-[#4b5963] flex flex-wrap'>
                      <div className='text-sub-text mb-[5px]'>
                        {reviewsDeatil.name}
                      </div>
                    </div>
                    <div className='w-full lg:w-2/4 py-[10px] text-default-text'>
                      <div className='flex items-center flex-wrap gap-[10px] lg:pl-[20px]'>
                        <div
                          className='flex items-center gap-[1px]'
                          data-color={reviewsDeatil.rating}
                        >
                          {Array(5)
                            .fill('#fff')
                            .map((_, index) => {
                              return (
                                <svg
                                  key={index}
                                  className={`h-5 w-5 flex-shrink-0 text-${
                                    reviewsDeatil?.rating &&
                                    index < reviewsDeatil.rating
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
                        </div>
                        <div className='text-small-text'>
                          {reviewsDeatil.reviewDate}
                        </div>
                      </div>
                      <div className='py-[20px] lg:pl-[20px] text-left mb-[5px]'>
                        <p>{reviewsDeatil.comments}</p>
                      </div>
                      <div className='lg:pl-[20px] text-left'>
                        <div className='mb-[10px]'>
                          {reviewsDeatil.helpFullCount}{' '}
                          {__pagesText.review.foundHelpfull}
                        </div>
                        <div className='flex items-center gap-[10px]'>
                          {__pagesText.review.wasThisHelpfull}
                          <span
                            className='material-icons-outlined text-[18px] cursor-pointer'
                            onClick={() =>
                              wasThisHelpfull(reviewsDeatil.reviewId, 1, 0)
                            }
                          >
                            thumb_up
                          </span>
                          <span
                            className='material-icons-outlined text-[18px] cursor-pointer'
                            onClick={() =>
                              wasThisHelpfull(reviewsDeatil.reviewId, 0, 1)
                            }
                          >
                            thumb_down
                          </span>
                        </div>
                      </div>
                    </div>
                    {reviewsDeatil.images.map((image: ReviewImages) => (
                      <div className='w-full lg:w-1/4'>
                        <img
                          src={`${mediaBaseUrl}${image.ImageName}` || ''}
                          className='mr-[15px]'
                          width={'100px'}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default RatingReviewDetails1;
