import RequestConsultationForm from '@appComponents/AdaAccessiblityRequestConsultation/RequestConsultationForm';
import { __pagesText } from '@constants/pages.text';

const AdaAccessibility = () => {
  return (
    <>
      <div className='mt-[10px]'>
        <div className='container mx-auto'>
          <div className='flex items-stretch flex-wrap mx-[-15px]'>
            <div className='w-full lg:w-8/12 px-[15px] mb-[30px]'>
              <div className='bg-light-gray md:p-[78px] p-[15px] h-full'>
                <div className='md:mb-[70px] mb-[24px]'>
                  <img src='/ada.webp' />
                </div>
                <div className='text-[24px] sm:text-[32px] lg:text-[45px] font-semibold mb-[18px] leading-[22px] sm:leading-[35px] lg:leading-[50px] tracking-[1px]'>
                  {__pagesText.adaCorporateGear.header}
                </div>

                <div className='text-[16px] leading-[32px] mb-[24px] tracking-[1px]'>
                  {__pagesText.adaCorporateGear.para1}
                </div>

                <div className='text-[16px] leading-[32px] mb-[24px] tracking-[1px]'>
                  {__pagesText.adaCorporateGear.para2}
                </div>

                <div className='font-semibold text-[20px] leading-[22px] mb-[30px] pt-[70px] tracking-[1px]'>
                  {__pagesText.adaCorporateGear.contact_info}
                </div>

                <div className='text-[14px] font-medium mb-[22px] tracking-[1px]'>
                  <a href='tel:8882935648'>
                    {' '}
                    {__pagesText.adaCorporateGear.phone_contact}
                  </a>
                </div>
                <div className='text-[14px] font-medium mb-[22px] tracking-[1px]'>
                  <a href='mailto:support@corporategear.com'>
                    {' '}
                    {__pagesText.adaCorporateGear.email_contact}
                  </a>
                </div>
              </div>
            </div>
            <div className='w-full lg:w-4/12 px-[15px] mb-[30px]'>
              <div className='bg-light-gray md:p-[30px] p-[15px] h-full'>
                <div className='bg-white'>
                  <RequestConsultationForm productId={0} innerHeading={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdaAccessibility;
