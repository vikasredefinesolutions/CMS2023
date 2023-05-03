import NxtImage from '@appComponents/reUsable/Image';
import { __StaticImg } from '@constants/assets';
import { paths } from '@constants/paths.constant';
import { _Story } from '@definations/story';
import Link from 'next/link';
import React, { useState } from 'react';

interface _Props {
  stories: _Story[];
  showByDefault: number;
  buttonType: 'LoadMore' | 'PrevNext';
}

const StoriesList: React.FC<_Props> = ({
  stories: leftStories,
  showByDefault,
  buttonType,
}) => {
  const [stories, setStories] = useState<{
    currentPage: number;
    totalElements: number;
    toShow: _Story[];
    showLoadMore: boolean;
    allStories: _Story[];
  }>({
    totalElements: leftStories.length,
    currentPage: 1,
    toShow: leftStories.slice(0, showByDefault),
    showLoadMore:
      leftStories.length > leftStories.slice(0, showByDefault).length,
    allStories: leftStories,
  });

  const handleLoadStories = (
    action: 'prev' | 'next' | 'loadMore',
    showMore: number,
  ) => {
    if (action === 'loadMore') {
      setStories((prev) => {
        if (!prev.showLoadMore) {
          // To reset show more
          return {
            ...prev,
            currentPage: 1,
            showLoadMore: true,
            toShow: prev.allStories.slice(0, showByDefault),
          };
        }

        // To show more
        const nextPage = prev.currentPage + 1;
        const showTill = nextPage * showMore;
        const toShow = prev.allStories.slice(0, showTill);

        const remainingStoriesToShow =
          prev.totalElements - prev.currentPage * toShow.length;

        return {
          ...prev,
          currentPage: nextPage,
          showLoadMore: remainingStoriesToShow > 0,
          toShow: toShow,
        };
      });
    }

    if (action === 'prev') {
      setStories((prev) => {
        const previousPage = prev.currentPage - 1;
        const showTill = previousPage * showMore;
        const toShow = prev.allStories.slice(0, showTill);

        const remainingStoriesToShow =
          prev.totalElements - prev.currentPage * toShow.length;

        return {
          ...prev,
          currentPage: previousPage,
          showLoadMore: remainingStoriesToShow > 0,
          toShow: toShow,
        };
      });
    }

    if (action === 'next') {
      setStories((prev) => {
        const nextPage = prev.currentPage + 1;
        const showTill = nextPage * showMore;
        const toShow = prev.allStories.slice(0, showTill);

        const remainingStoriesToShow =
          prev.totalElements - prev.currentPage * toShow.length;

        return {
          ...prev,
          currentPage: nextPage,
          showLoadMore: remainingStoriesToShow > 0,
          toShow: toShow,
        };
      });
    }
  };

  return (
    <section className='relative pt-[40px] bg-gray-100'>
      <div className='container mx-auto px-4 pb-10'>
        <div className='flex flex-wrap mx-[-15px] -mt-6 justify-center'>
          {stories.toShow.map((story) => {
            return (
              <div className='w-full sm:w-1/2 xl:w-1/4 px-[15px] md:w-1/3 mt-6 mb-14'>
                <div className='border border-gray-border bg-[#ffffff] relative'>
                  <div className='flex justify-center max-h-[450px] overflow-hidden'>
                    <Link href='custom-nike-dri-fit-shirts.html'>
                      <NxtImage
                        alt=''
                        className='w-full mx-auto'
                        src={story.storiesImage}
                      />
                    </Link>
                  </div>
                  <div className='absolute left-5 top-5'>
                    <div className='mb-4'>
                      <Link href={story.categoryUrl}>
                        <span className='btn btn-primary pl-[20px] pr-[20px] pt-[10px] pb-[10px] !uppercase text-default-text'>
                          {story.categoryName}
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className='absolute left-0 mx-auto w-60 right-0 -bottom-12 bg-[#ffffff] p-[24px]'>
                    {/* <div className='text-default-text mb-3'>
                      January 01,1900
                    </div> */}
                    <div className='mt-[12px] mb-[12px] text-default-text'>
                      <Link
                        className='no-underline text-[#000000]'
                        href={`${paths.STORIES}/${story.slug}`}
                      >
                        <a>
                          {story.name}
                          <img
                            alt='Next arrow'
                            className='w-auto inline-flex'
                            src={__StaticImg.storiesNextArrow}
                            role='presentation'
                          />
                        </a>
                      </Link>
                    </div>
                    {/* <div className='text-default-text mb-2'>Super Admin</div> */}
                  </div>
                </div>
              </div>
            );
          })}
          {buttonType === 'LoadMore' && (
            <div className='w-full lg:w-4/4 px-3 md:w-3/3 mt-6 load_more_btn'>
              <div className='w-full'>
                <div className='p-2 text-center text-large-text'>
                  <button
                    id='load_btn'
                    className='text-primary font-[600] inline-flex items-center load_more no-underline'
                    onClick={() => handleLoadStories('loadMore', showByDefault)}
                  >
                    <>
                      <span className='mr-3 load_more_text'>
                        {stories.showLoadMore ? `Load More` : `Hide More`}
                      </span>
                      <span className='material-icons-outlined font-[600]'>
                        {`arrow_${
                          stories.showLoadMore ? `downward` : 'upward'
                        }`}
                      </span>
                    </>
                  </button>
                </div>
              </div>
            </div>
          )}

          {buttonType === 'PrevNext' && (
            <div className='flex flex-wrap justify-center'>
              {stories.currentPage > 1 && (
                <button
                  className='uppercase btn btn-tertiary text-default-text mr-[10px]'
                  onClick={() => handleLoadStories('prev', showByDefault)}
                >
                  Previous
                </button>
              )}
              {!stories.showLoadMore && (
                <button
                  className='uppercase btn btn-tertiary text-default-text mr-[10px]'
                  onClick={() => handleLoadStories('next', showByDefault)}
                  disabled={!stories.showLoadMore}
                >
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StoriesList;
