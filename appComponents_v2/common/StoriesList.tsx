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
  next?: string;
  prev?: string;
}

const StoriesList: React.FC<_Props> = ({
  stories: leftStories,
  showByDefault,
  buttonType,
  next,
  prev,
}) => {
  const [stories, setStories] = useState<{
    showButton: boolean;
    currentPage: number;
    totalElements: number;
    toShow: _Story[];
    showLoadMore: boolean;
    allStories: _Story[];
  }>({
    showButton: leftStories.length > leftStories.slice(0, showByDefault).length,
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

  // const buttonRef = useRef<HTMLButtonElement>(null);
  // // useEffect(() => {
  // //   buttonRef.current.addEventListener('click', clickHandler);
  // // }, []);
  //  const handleScroll = () => {
  //   if (typeof window !== 'undefined') {
  //     // if(document.body.classList.contains('index-page') || storeCode === 'DI')
  //     // {
  //     let x = document.querySelector('#load_btn');
  //     if (x instanceof HTMLElement)
  //     {
  //       // alert(x)
  //      //console.log((window.pageYOffset + document.documentElement.clientHeight),  x?.offsetTop);
  //         if (window.pageYOffset >= x?.offsetTop) {
  //           if(buttonRef.current)
  //            {
  //             buttonRef?.current.click();
  //            }
  //         }

  //     }

  //     //}
  //   }
  // };
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     window.addEventListener('scroll', handleScroll);
  //   }
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <section className='relative pt-[40px] bg-gray-100'>
      <div className='container mx-auto px-4 pb-10'>
        <div className='flex flex-wrap mx-[-15px] -mt-6 justify-center'>
          {stories.toShow.map((story) => {
            return (
              <div className='w-full sm:w-1/2 xl:w-1/4 px-[15px] md:w-1/3 mt-6 mb-14'>
                <div className='border border-gray-border bg-[#ffffff] relative'>
                  <div className='flex justify-center max-h-[450px] overflow-hidden'>
                    <Link href={`${paths.STORIES}/${story.slug}.html`}>
                      <a>
                        <NxtImage
                          alt=''
                          className='w-full mx-auto'
                          src={story.storiesImage}
                          useNextImage={false}
                        />
                      </a>
                    </Link>
                  </div>
                  <div className='absolute left-5 top-5'>
                    <div className='mb-4'>
                      <Link href={`${story.categoryUrl}.html`}><a>
                        <span className='btn bg-white hover:bg-tertiary-hover hover:text-anchor-hover text-anchor pl-[20px] pr-[20px] pt-[10px] pb-[10px] !uppercase text-default-text'>
                          {story.categoryName}
                        </span></a>
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
                        href={`${paths.STORIES}/${story.slug}.html`}
                      >
                        <a>
                          {story.name}
                          <NxtImage
                            alt='Next arrow'
                            className='w-auto inline-flex'
                            src={__StaticImg.storiesNextArrow}
                            role='presentation'
                            useNextImage={false}
                            isStatic={true}
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
          {buttonType === 'LoadMore' && stories.showButton && (
            <div className='w-full lg:w-4/4 px-3 md:w-3/3 mt-6 load_more_btn'>
              <div className='w-full'>
                <div className='p-2 text-center text-large-text'>
                  <button
                    id='load_btn'
                    // ref={buttonRef}
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
        </div>

        {buttonType === 'PrevNext' && (
          <div className='flex flex-wrap justify-center gap-[10px]'>
            {prev && prev !== '' && (
              <Link className='' href={`${prev}.html`}>
                <a className='uppercase btn btn-tertiary text-default-text  w-28'>
                  Previous
                </a>
              </Link>
            )}
            {next && next !== '' && (
              <Link href={`${next}.html`}>
                <a className='uppercase btn btn-tertiary text-default-text text-center  w-28'>
                  Next
                </a>
              </Link>
            )}
          </div>
        )}

        {/* {buttonType === 'PrevNext' && stories.showButton && (
          <div className='flex flex-wrap justify-center pt-[40px] pb-[40px]'>
            {stories.currentPage > 1 && (
              <button
                className='mr-4 btn btn-tertiary text-sm'
                onClick={() => handleLoadStories('prev', showByDefault)}
              >
                Previous
              </button>
            )}
            {!stories.showLoadMore && (
              <button
                className='mr-4 btn btn-tertiary text-sm'
                onClick={() => handleLoadStories('next', showByDefault)}
                disabled={!stories.showLoadMore}
              >
                Next
              </button>
            )}
          </div>
        )} */}
      </div>
    </section>
  );
};

export default StoriesList;
