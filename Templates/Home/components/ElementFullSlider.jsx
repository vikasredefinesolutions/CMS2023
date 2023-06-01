/*Component Name: ElementCarousel
Component Functional Details: Element for Component ElementCarousel  
Created By: Vikas Patel
Created Date: 17th September 2022
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import { useState } from 'react';
import Slider from 'react-slick';

const ElementFullSlider = ({ bannerArr }) => {
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

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
      ><svg fill="#ffffff" class="chevron-right w-10 h-10" width="40" height="40" viewBox="0 0 40 40">
      <g id="a" clip-path="url(#b)">
      <path d="M79.693,20a20,20,0,1,1-20-20,20,20,0,0,1,20,20m-22.137-.806v1.452l-4.515,8.548h4.112c2.743-4.355,9.758-7.984,9.758-7.984V19.517c-2.661-1.049-9.839-8.711-9.839-8.711h-4.6Z" transform="translate(-39.693)"/>
      </g>
      </svg></div>
    );
  }
  
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
      ><svg fill="#ffffff" className="chevron-left w-10 h-10" width="40" height="40" viewBox="0 0 40 40">
      <g id="a" clip-path="url(#b)">
      <path d="M20,0A20,20,0,1,1,0,20,20,20,0,0,1,20,0m7.218,10.806h-4.6s-7.177,7.661-9.838,8.71v1.693s7.016,3.629,9.758,7.984h4.112l-4.516-8.547V19.194Z"/>
      </g>
      </svg></div>
    );
  }
  
  
  let sheadlineStartTag = '';
  let sheadline1StartTag = '';
  let sheadlineEndTag = '';
  let sheadline1EndTag = '';
  if(bannerArr.images[0].headline_tag)
  {
    sheadlineStartTag = '<'+bannerArr.images[0].headline_tag+'>';
    sheadlineEndTag = '</'+bannerArr.images[0].headline_tag+'>';
  }
  if(bannerArr.images[0].headline_tag1)
  {
    sheadline1StartTag = '<'+bannerArr.images[0].headline_tag1+'>';
    sheadline1EndTag = '</'+bannerArr.images[0].headline_tag1+'>';
  }

  
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    adaptiveHeight: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <>
      {Object.keys(bannerArr).length > 0 && !bannerArr.images[0].image_as_bg && bannerArr.images != null ? (
        <div className='h-screen'>
        <div className="carouselslide fixed w-full h-screen" id="mainslider">
        <Slider {...settings}>
          {bannerArr.images.map((image, index) => {
            let headlineStartTag = '';
            let headline1StartTag = '';
            let headlineEndTag = '';
            let headline1EndTag = '';
            if(image.headline_tag)
            {
              headlineStartTag = '<'+image.headline_tag+'>';
              headlineEndTag = '</'+image.headline_tag+'>';
            }
            if(image.headline_tag1)
            {
              headline1StartTag = '<'+image.headline_tag1+'>';
              headline1EndTag = '</'+image.headline_tag1+'>';
            }
            return ( <>
            <div className="slide h-screen" key={image.index}>
                {image.image_or_video === 'Image' ? 
                  <>
                    <div className="relative h-full w-full overflow-hidden bg-fixed bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${image.image_url})` }}><div
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
                      <div
                        className='text-center'
                      ><img src={image.icon_image_url} /></div>
                    )}
                    {image.headline1_display && (
                      <div
                        className={image.headline1_class ?? ''}
                        style={{
                          color: image.font_color ?? '',
                          textShadow: image.headline1_box_shadow ?? '',
                        }}
                        dangerouslySetInnerHTML={{
                          __html: headlineStartTag + image.headline + headlineEndTag,
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
                          __html: headline1StartTag + image.headline1 + headline1EndTag,
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
                            style={{ boxShadow: image?.button_box_shadow }}
                            rel='noreferrer'
                          >
                            {image.button_text}
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                </div></div>
                  </> : 
                  <>
                    <div className='overflow-hidden'>
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
                        
                      </div></> }
                
                
            </div>
             
            </>
              
            );
          })}
        </Slider>
        </div>
        </div>
      ) : <> 
      
      <div className="relative overflow-hidden bg-fixed bg-center bg-contain bg-no-repeat flex justify-end pt-60 pb-60" style={{ backgroundImage: `url('${bannerArr.images[0].image_url}')`, backgroundAttachment: bannerArr.images[0].fixed_background ? "fixed" : "inherit" }}>
          <div className="max-w-2xl">
          {bannerArr.images[0].icon_image_url && (
                      <div
                        className='text-center'
                      ><img src={bannerArr.images[0].icon_image_url} /></div>
                    )}
          {bannerArr.images[0].headline1_display && (
            <div
              className={bannerArr.images[0].headline1_class ?? ''}
              style={{
                color: bannerArr.images[0].font_color ?? '',
                textShadow: bannerArr.images[0].headline1_box_shadow ?? '',
              }}
              dangerouslySetInnerHTML={{
                __html: sheadlineStartTag + bannerArr.images[0].headline + sheadlineEndTag,
              }}
            ></div>
          )}
              {bannerArr.images[0].headline2_display && (
            <div
              className={bannerArr.images[0].headline2_class ?? ''}
              style={{
                color: bannerArr.images[0].font_color1 ?? '',
                textShadow: bannerArr.images[0].headline2_box_shadow ?? '',
              }}
              dangerouslySetInnerHTML={{
                __html: sheadline1StartTag + bannerArr.images[0].headline1 + sheadline1EndTag,
              }}
            ></div>
          )}
          {bannerArr.images[0].description_display && (
            <div
              className={bannerArr.images[0].description_class ?? ''}
              style={{ color: bannerArr.images[0].font_color2 ?? '' }}
              dangerouslySetInnerHTML={{
                __html: bannerArr.images[0].description,
              }}
            ></div>
          )}
          {bannerArr.images[0].button_display == 'Yes' && (
            <>
              <div
                className={`pt-0 lg:pt-5 ${bannerArr.images[0]?.button_text_alignment}`}
                title={bannerArr.images[0].button_text}
              >
                <a
                  href={bannerArr.images[0].button_link}
                  target={
                    bannerArr.images[0].button_link_window == '_self'
                      ? ''
                      : '_blank'
                  }
                  className={`${bannerArr.images[0].button_class}`}
                  style={{ boxShadow: bannerArr.images[0]?.button_box_shadow }}
                  rel='noreferrer'
                >
                  {bannerArr.images[0].button_text}
                </a>
              </div>
            </>
          )}
          </div>
      </div>
      </>}
    </>
  );
};

export default ElementFullSlider;
