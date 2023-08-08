import Home from '@templates/Home';
import React from 'react';

interface _Props {
  page: {
    accordionContent: any;
    type: 'blog';
    slug: string;
  };
}

interface _ConsultationPayload {
  email: string;
  name: string;
  countryCode: string;
  phoneNumber: string;
  companyName: string;
  message: string;
}

const SD_FaqSection: React.FC<_Props> = ({ page }) => {
  return (
    <section className='relative pt-[40px] pb-[40px] bg-light-gray'>
      <div className='container mx-auto px-[16px]'>
        <div className='flex flex-wrap -mx-[12px] -mt-[24px] justify-center'>
          <div className='w-full lg:w-3/5 xl:w-2/3 order-1 mt-[24px] flex px-[12px]'>
            <div className='w-full flex h-full bg-[#ffffff] p-[20px] sm:p-[30px] lg:p-[40px]'>
              <Home
                props={{
                  pageData: { components: page.accordionContent },
                  pageType: page.type,
                  slug: page.slug,
                }}
              />
            </div>
          </div>
          <div className='w-full mt-[24px] px-[12px] lg:w-2/5 xl:w-1/3 order-2'>
            <div className='w-full bg-white p-[20px] sm:p-[30px] lg:p-[40px]'>
              <div className='w-full'>
                <div
                  className='bg-blue-900 p-[20px] sm:p-[30px] lg:p-[40px] text-large-text font-semibold text-white '
                  role='heading'
                >
                  <div>
                    <i className='material-icons text-white text-3xl'>groups</i>
                  </div>
                  Book a Free Branding Consultation with Our Merchandising
                  Experts
                </div>
                <div className='w-full'>
                  <div className='bg-light-gray pt-[30px]'>
                    <div className='klaviyo-form-YjBPww'>
                      {/* Form will be inserted by Klaviyo */}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className='w-full pt-10'>
                <div
                  className='embed-responsive embed-responsive-16by9'
                  data-acsb-overflower='true'
                >
                  <iframe
                    className='w-full'
                    src={__StaticImg.storiesYoutube}
                    // frameborder="0"
                    allow='autoplay; encrypted-media'
                    width='100'
                    height='250'
                    // allowfullscreen=""
                    aria-label='Youtube Iframe'
                    data-acsb-navigable='true'
                    data-acsb-force-navigable='true'
                    data-acsb-now-navigable='true'
                  >
                    <span
                      className='sr-only'
                      data-acsb-sr-only='true'
                      data-acsb-force-visible='true'
                      aria-hidden='false'
                      data-acsb-hidden='false'
                    >
                      YouTube video player
                    </span>
                  </iframe>
                </div>
              </div> */}
              <div className='w-full pt-10'>
                <div className='text-medium-text bg-light-gray'>
                  <div className='mt-[8px] p-[16px]'>
                    <div className='text-center'>
                      <i className='material-icons text-secondary text-3xl'>
                        reviews
                      </i>
                    </div>
                    <div className='text-center text-title-text'>
                      Leave a Five Star Review
                    </div>
                    <div className='text-center text-extra-small-text'>
                      Did you have a five star experience with Corporate Gear?
                    </div>
                    <div className='text-center text-extra-small-text'>
                      Leave a review and let us how we are doing.
                    </div>
                  </div>
                  <form>
                    <a
                      className='btn btn-primary btn-md w-full mt-[14px] text-center'
                      href='https://g.page/r/CS-uHHojlBSDEAg/review'
                    >
                      START REVIEW
                    </a>
                  </form>
                </div>
              </div>
              <div className='w-full pt-10'>
                <div className='text-medium-text bg-light-gray'>
                  <div className='mt-[8px] p-[16px]'>
                    <div className='text-center'>
                      <i className='material-icons text-tertiary text-3xl'>
                        email
                      </i>
                    </div>
                    <div className='text-center text-small-title'>
                      Sign up Our Newsletter
                    </div>
                  </div>
                  <div className='klaviyo-form-XG8wNu'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SD_FaqSection;
