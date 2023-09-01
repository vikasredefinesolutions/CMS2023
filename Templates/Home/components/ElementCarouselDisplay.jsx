/*Component Name: ElementCarousel
Component Functional Details: Element for Component ElementCarousel  
Created By: Vikas Patel
Created Date: 17th September 2022
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.css';

const ElementCarouselDisplay = ({ bannerArr }) => {
  let tmpArr = bannerArr.images.filter(
    (image) => image.visibility === undefined || image.visibility,
  );
  const [transition, setTransition] = useState('width-carousel');
  const showArrow =
    bannerArr.showArrow != undefined
      ? bannerArr.showArrow == 'On'
        ? true
        : false
      : true;

  const arrowType =
    bannerArr.arrowType != undefined ? bannerArr.arrowType : 'Arrow1';
  const showIndicators =
    bannerArr.showIndicators != undefined
      ? bannerArr.showIndicators == 'On'
        ? true
        : false
      : false;
  const showThumb =
    bannerArr.showThumb != undefined
      ? bannerArr.showThumb == 'On'
        ? true
        : false
      : false;
  const autoPlay =
    bannerArr.autoPlay != undefined
      ? bannerArr.autoPlay == 'On'
        ? true
        : false
      : false;
  const infiniteLoop =
    bannerArr.infiniteLoop != undefined
      ? bannerArr.infiniteLoop == 'On'
        ? true
        : false
      : false;
  const stopOnHover =
    bannerArr.stopOnHover != undefined
      ? bannerArr.stopOnHover == 'On'
        ? true
        : false
      : false;
  const showStatus =
    bannerArr.showStatus != undefined
      ? bannerArr.showStatus == 'On'
        ? true
        : false
      : false;

  const handleTransition = () => {
    setTransition('width-carousel fade-in-image');

    setTimeout(() => {
      setTransition('width-carousel');
    }, 2000);
  };

  let sheadlineStartTag = '';
  let sheadline1StartTag = '';
  let sheadlineEndTag = '';
  let sheadline1EndTag = '';
  if (tmpArr.length > 0) {
    if (tmpArr[0].headline_tag) {
      sheadlineStartTag = '<' + tmpArr[0].headline_tag + '>';
      sheadlineEndTag = '</' + tmpArr[0].headline_tag + '>';
    }
    if (tmpArr[0].headline_tag1) {
      sheadline1StartTag = '<' + tmpArr[0].headline_tag1 + '>';
      sheadline1EndTag = '</' + tmpArr[0].headline_tag1 + '>';
    }
  }

  let backgroundIndex = 1;

  return tmpArr.length > 0 && !tmpArr[0].image_as_bg && tmpArr != null ? (
    <Carousel
      renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
        hasPrev && (
          <div
            className='absolute top-1/2 -translate-y-1/2 left-4 z-10 flex items-center'
            style={{ zIndex: '39' }}
          >
            {arrowType === 'Arrow1' && (
              <button
                onClick={clickHandler}
                className='bg-light-gray bg-opacity-90 flex justify-center items-center w-10 h-10 rounded-md shadow-md focus:outline-none'
              >
                <svg
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='chevron-left w-10 h-10'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
            )}
            {arrowType === 'Arrow2' && (
              <button
                onClick={clickHandler}
                className='bg-white -ml-2 lg:-ml-4 flex justify-center items-center w-10 h-10 rounded-full shadow focus:outline-none'
                style={{ zIndex: '39' }}
              >
                <svg
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='chevron-left w-6 h-6'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
            )}
          </div>
        )
      }
      renderArrowNext={(clickHandler, hasNext, labelNext) =>
        hasNext && (
          <div
            className='absolute top-1/2 -translate-y-1/2 right-4 z-10 flex items-center'
            style={{ zIndex: '39' }}
          >
            {arrowType === 'Arrow1' && (
              <button
                onClick={clickHandler}
                className='bg-light-gray bg-opacity-90 flex justify-center items-center w-10 h-10 rounded-md shadow-md focus:outline-none'
              >
                <svg
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='chevron-right w-10 h-10'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
            )}
            {arrowType === 'Arrow2' && (
              <button
                onClick={clickHandler}
                className='bg-white -mr-2 lg:-mr-4 flex justify-center items-center w-10 h-10 rounded-full shadow focus:outline-none'
                style={{ zIndex: '39' }}
              >
                <svg
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='chevron-right w-6 h-6'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
            )}
          </div>
        )
      }
      showStatus={showStatus}
      stopOnHover={stopOnHover}
      infiniteLoop={infiniteLoop}
      autoPlay={autoPlay}
      showArrows={showArrow}
      showIndicators={showIndicators}
      showThumbs={false}
      //animationHandler='fade'
      transitionTime='700'
    >
      {tmpArr.map((image) => {
        /* Condition to be added here */

        let headlineStartTag = '';
        let headline1StartTag = '';
        let headlineEndTag = '';
        let headline1EndTag = '';
        if (image.headline_tag) {
          headlineStartTag = '<' + image.headline_tag + '>';
          headlineEndTag = '</' + image.headline_tag + '>';
        }
        if (image.headline_tag1) {
          headline1StartTag = '<' + image.headline_tag1 + '>';
          headline1EndTag = '</' + image.headline_tag1 + '>';
        }
        return (
          (image.visibility === undefined || image.visibility) && (
            <div
              key={image}
              className={`relative presentation-mode cgslide-${backgroundIndex}`}
            >
              <div className='overflow-hidden'>
                {image.image_or_video == 'Image' ? (
                  image.image_link && image.image_link != '' ? (
                    <a className='block' href={`${image.image_link}`}>
                      <img src={image.image_url} alt={`${image.image_alt}`} />
                    </a>
                  ) : (
                    <img src={image.image_url} alt={`${image.image_alt}`} />
                  )
                ) : (
                  <>
                    {image.video_type == 'Youtube' ? (
                      <iframe
                        className='w-full aspect-video'
                        src={`https://www.youtube.com/embed/${image.video_url}?rel=0`}
                        allow='autoplay; encrypted-media'
                      ></iframe>
                    ) : (
                      <iframe
                        className='p-0 w-full aspect-[7/3]'
                        src={`https://player.vimeo.com/video/${image.video_url}?autoplay=1&loop=1&background=1&muted=1`}
                        allow='autoplay'
                      ></iframe>
                    )}
                  </>
                )}
                {(image.icon_image_url ||
                  image.headline ||
                  image.headline1 ||
                  image.description ||
                  image.button_text ||
                  image.button_text1) && (
                  <div
                    className={`flex ${
                      image.text_hpos ? image.text_hpos : ''
                    } ${
                      image.text_vpos ? image.text_vpos : ''
                    } w-full absolute ${
                      image.headline_font_size
                    } inset-0 p-1 lg:p-4 text-white`}
                  >
                    <div
                      className={`${
                        image.headline_width ? image.headline_width : ''
                      }`}
                      style={{
                        background: `rgb(${image.text_bg_color}, ${image.bg_opacity})`,
                        padding: '20px',
                      }}
                    >
                      {image.icon_image_url && (
                        <div className='text-center'>
                          <img src={image.icon_image_url} />
                        </div>
                      )}
                      {image.headline1_display && (
                        <div
                          className={image.headline1_class ?? ''}
                          style={{
                            color: image.font_color ?? '',
                            textShadow: image.headline1_box_shadow ?? '',
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              headlineStartTag +
                              image.headline +
                              headlineEndTag,
                          }}
                        ></div>
                      )}
                      {image.headline2_display && (
                        <div
                          className={image.headline2_class ?? ''}
                          style={{
                            color: image.font_color1 ?? '',
                            textShadow: image.headline2_box_shadow ?? '',
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              headline1StartTag +
                              image.headline1 +
                              headline1EndTag,
                          }}
                        ></div>
                      )}
                      {image.description_display && (
                        <div
                          className={image.description_class ?? ''}
                          style={{ color: image.font_color2 ?? '' }}
                          dangerouslySetInnerHTML={{
                            __html: image.description,
                          }}
                        ></div>
                      )}
                      {image.button_display1 === undefined ? (
                        image.button_display == 'Yes' && (
                          <>
                            <div
                              className={`pt-0 lg:pt-5 ${image?.button_text_alignment}`}
                              title={image.button_text}
                            >
                              <a
                                href={image.button_link}
                                target={
                                  image.button_link_window == '_self'
                                    ? ''
                                    : '_blank'
                                }
                                className={`${image.button_class}`}
                                style={{ boxShadow: image?.button_box_shadow }}
                                rel='noreferrer'
                              >
                                {image.button_text}
                              </a>
                            </div>
                          </>
                        )
                      ) : (
                        <>
                          {image.button_display1 === 'Yes' &&
                          image.button_display === 'Yes' ? (
                            <>
                              <div className='pt-3 lg:pt-5 text-center'>
                                <a
                                  href={image.button_link}
                                  target={
                                    image.button_link_window == '_self'
                                      ? ''
                                      : '_blank'
                                  }
                                  className={`${image.button_class}`}
                                  style={{
                                    boxShadow: image?.button_box_shadow,
                                  }}
                                  rel='noreferrer'
                                >
                                  {image.button_text}
                                </a>
                                <a
                                  href={image.button_link1}
                                  target={
                                    image.button_link_window1 == '_self'
                                      ? ''
                                      : '_blank'
                                  }
                                  className={`${image.button_class1}`}
                                  style={{
                                    boxShadow: image?.button_box_shadow1,
                                  }}
                                  rel='noreferrer'
                                >
                                  {image.button_text1}
                                </a>
                              </div>
                            </>
                          ) : (
                            <>
                              {image.button_display == 'Yes' && (
                                <>
                                  <div
                                    className={`pt-0 lg:pt-5 ${image?.button_text_alignment}`}
                                    title={image.button_text}
                                  >
                                    <a
                                      href={image.button_link}
                                      target={
                                        image.button_link_window == '_self'
                                          ? ''
                                          : '_blank'
                                      }
                                      className={`${image.button_class}`}
                                      style={{
                                        boxShadow: image?.button_box_shadow,
                                      }}
                                      rel='noreferrer'
                                    >
                                      {image.button_text}
                                    </a>
                                  </div>
                                </>
                              )}
                              {image.button_display1 == 'Yes' && (
                                <>
                                  <div
                                    className={`pt-0 lg:pt-5 ${image?.button_text_alignment1}`}
                                    title={image.button_text1}
                                  >
                                    <a
                                      href={image.button_link1}
                                      target={
                                        image.button_link_window1 == '_self'
                                          ? ''
                                          : '_blank'
                                      }
                                      className={`${image.button_class1}`}
                                      style={{
                                        boxShadow: image?.button_box_shadow1,
                                      }}
                                      rel='noreferrer'
                                    >
                                      {image.button_text1}
                                    </a>
                                  </div>
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        );
        backgroundIndex++;
      })}
    </Carousel>
  ) : (
    <>
      {tmpArr.length > 0 &&
        (tmpArr[0].visibility === undefined || tmpArr[0].visibility) && (
          <div
            className='relative overflow-hidden bg-fixed bg-center bg-contain bg-no-repeat flex justify-end pt-60 pb-60'
            style={{
              backgroundImage: `url('${tmpArr[0].image_url}')`,
              backgroundAttachment: tmpArr[0].fixed_background
                ? 'fixed'
                : 'inherit',
            }}
          >
            <div className='max-w-2xl'>
              {tmpArr[0].icon_image_url && (
                <div className='text-center'>
                  <img src={tmpArr[0].icon_image_url} />
                </div>
              )}
              {tmpArr[0].headline1_display && (
                <div
                  className={tmpArr[0].headline1_class ?? ''}
                  style={{
                    color: tmpArr[0].font_color ?? '',
                    textShadow: tmpArr[0].headline1_box_shadow ?? '',
                  }}
                  dangerouslySetInnerHTML={{
                    __html:
                      sheadlineStartTag + tmpArr[0].headline + sheadlineEndTag,
                  }}
                ></div>
              )}
              {tmpArr[0].headline2_display && (
                <div
                  className={tmpArr[0].headline2_class ?? ''}
                  style={{
                    color: tmpArr[0].font_color1 ?? '',
                    textShadow: tmpArr[0].headline2_box_shadow ?? '',
                  }}
                  dangerouslySetInnerHTML={{
                    __html:
                      sheadline1StartTag +
                      tmpArr[0].headline1 +
                      sheadline1EndTag,
                  }}
                ></div>
              )}
              {tmpArr[0].description_display && (
                <div
                  className={tmpArr[0].description_class ?? ''}
                  style={{ color: tmpArr[0].font_color2 ?? '' }}
                  dangerouslySetInnerHTML={{
                    __html: tmpArr[0].description,
                  }}
                ></div>
              )}
              {tmpArr[0].button_display1 === undefined ? (
                tmpArr[0].button_display == 'Yes' && (
                  <>
                    <div
                      className={`pt-0 lg:pt-5 ${tmpArr[0]?.button_text_alignment}`}
                      title={tmpArr[0].button_text}
                    >
                      <a
                        href={tmpArr[0].button_link}
                        target={
                          tmpArr[0].button_link_window == '_self'
                            ? ''
                            : '_blank'
                        }
                        className={`${tmpArr[0].button_class}`}
                        style={{ boxShadow: tmpArr[0]?.button_box_shadow }}
                        rel='noreferrer'
                      >
                        {tmpArr[0].button_text}
                      </a>
                    </div>
                  </>
                )
              ) : (
                <>
                  {tmpArr[0].button_display1 === 'Yes' &&
                  tmpArr[0].button_display === 'Yes' ? (
                    <>
                      <div className='pt-3 lg:pt-5 text-center'>
                        <a
                          href={image.button_link}
                          target={
                            image.button_link_window == '_self' ? '' : '_blank'
                          }
                          className={`${image.button_class}`}
                          style={{ boxShadow: image?.button_box_shadow }}
                          rel='noreferrer'
                        >
                          {image.button_text}
                        </a>
                        <a
                          href={image.button_link1}
                          target={
                            image.button_link_window1 == '_self' ? '' : '_blank'
                          }
                          className={`${image.button_class1}`}
                          style={{ boxShadow: image?.button_box_shadow1 }}
                          rel='noreferrer'
                        >
                          {image.button_text1}
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      {tmpArr[0].button_display == 'Yes' && (
                        <>
                          <div
                            className={`pt-0 lg:pt-5 ${tmpArr[0]?.button_text_alignment}`}
                            title={tmpArr[0].button_text}
                          >
                            <a
                              href={tmpArr[0].button_link}
                              target={
                                tmpArr[0].button_link_window == '_self'
                                  ? ''
                                  : '_blank'
                              }
                              className={`${tmpArr[0].button_class}`}
                              style={{
                                boxShadow: tmpArr[0]?.button_box_shadow,
                              }}
                              rel='noreferrer'
                            >
                              {tmpArr[0].button_text}
                            </a>
                          </div>
                        </>
                      )}
                      {tmpArr[0].button_display1 == 'Yes' && (
                        <>
                          <div
                            className={`pt-0 lg:pt-5 ${tmpArr[0]?.button_text_alignment1}`}
                            title={tmpArr[0].button_text1}
                          >
                            <a
                              href={tmpArr[0].button_link1}
                              target={
                                tmpArr[0].button_link_window1 == '_self'
                                  ? ''
                                  : '_blank'
                              }
                              className={`${tmpArr[0].button_class1}`}
                              style={{
                                boxShadow: tmpArr[0]?.button_box_shadow1,
                              }}
                              rel='noreferrer'
                            >
                              {tmpArr[0].button_text1}
                            </a>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
    </>
  );
};

export default ElementCarouselDisplay;
