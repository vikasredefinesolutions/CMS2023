import ImageComponent from '@appComponents/reUsable/Image';

const PetermillarHeader = () => {
  return (
    <div className='w-full mx-auto full-banner' style={{ background: 'none' }} id='div8'>
      <section className='container-fluid'>
        <div
          className='ml-[0px] lg:ml-[-15px] mr-[0px] lg:mr-[-15px]'
          style={{ background: 'none' }}
        >
          <div className='carousel-root'>
            <div className='carousel11 carousel-slider w-full'>
              <div className='slider-wrapper axis-horizontal'>
                <ul
                  className='slider animated'
                  // style={{
                  //   '-webkit-transform': 'translate3d(0,0,0)',
                  //   '-ms-transform': 'translate3d(0,0,0)',
                  //   '-o-transform': 'translate3d(0,0,0)',
                  //   transform: 'translate3d(0,0,0)',
                  //   '-webkit-transition-duration': '700ms',
                  //   '-moz-transition-duration': '700ms',
                  //   '-o-transition-duration': '700ms',
                  //   'transition-duration': '700ms',
                  //   '-ms-transition-duration': '700ms',
                  // }}
                >
                  <li className='slide selected previous'>
                    <div className='relative presentation-mode cgslide-1'>
                      <div className='overflow-hidden text-center'>
                        <img 
                          src='/assets/images/pettermiller/sub-banner.jpg'
                          title=''
                          className='w-full h-auto full-banner'
                          alt={'corousel'}
                        />
                        <div className='flex justify-center items-center w-full absolute undefined inset-0 p-1 lg:p-4 text-white'>
                          <div className=''>
                            <div className='text-center mb-[30px]'>
                              <ImageComponent
                                src='/assets/images/pettermiller/peter-millar-inner-logo.png'
                                title=''
                                className='inline-block'
                                alt={'corousel'}
                                isStatic
                              />
                            </div>
                            <div className='font-family-2 max-w-2xl mx-auto text-center text-title-text mb-[10px]'>
                              <span className='text-[#ffffff] font-semibold'>
                                A PARTNERSHIP THAT’LL LOOK GREAT ON YOU!
                              </span>
                            </div>
                            <div className='font-family-2 max-w-2xl mx-auto text-center text-sub-text'>
                              <span className='text-[#ffffff]'>
                                We’re excited to announce our exclusive Peter
                                Millar partnership as the luxury brand’s
                                official custom apparel and custom gear
                                provider!
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PetermillarHeader;
