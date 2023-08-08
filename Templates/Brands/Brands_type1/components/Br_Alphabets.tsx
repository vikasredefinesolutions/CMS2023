import Link from 'next/link';
import React from 'react';

interface _Props {
  brands:
    | {
        id: number;
        brandName: string;
        seName: string;
        brandColorImageUrl: string;
        brandCollectionUrl: string;
        brandBlackColorImageUrl: string;
        isBrandOnline: boolean;
      }[]
    | null;
  alphabets: string[];
}

const allAlphabets = new Array(26)
  .fill('undefined')
  .map((char, index) => String.fromCharCode(index + 97));

const Br_Alphabets: React.FC<_Props> = ({
  alphabets: availableAlphabets,
  brands,
}) => {
  const highlightBrands = (alphabet: string) => {
    const element = document.getElementById(alphabet)!;
    const headerOffset =
      document.getElementById('header_with_navBar')!.offsetHeight;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition =
      elementPosition + window.pageYOffset - headerOffset - 40;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <section className='relative pb-[30px]'>
      <div className='pl-[16px] pr-[16px] mx-auto container'>
        <div className='w-full flex flex-wrap'>
          <div className='lg:w-2/12 W-full pt-[40px]'>
            <div
              className='text-title-text mb-[24px] pt-[12px] pb-[12px] sm:sticky sm:top-32'
              id='list-id'
            >
              <div className='text-title-text ml-[8px] mr-[8px] font-[600] pb-[28px]'>
                <span className="uppercase relative pb-[16px] after:contents[' '] after:bottom-0 after:left-0 after:absolute after:w-[60px] after:h-[6px] after:bg-black">
                  Brands
                </span>
              </div>
              <button
                title='##'
                className=' ml-[8px] mr-[8px] border-b border-b-solid border-[#ffffff] pb-[12px] inline-block font-[600] hover:text-anchor hover:border-anchor-hover text-[#a7a8a9] cursor-not-allowed'
              >
                #
              </button>
              {allAlphabets.map((al) => {
                const activeAlphabet = availableAlphabets?.includes(al);
                return (
                  <button
                    title={`$${al}`}
                    onClick={() => {
                      if (activeAlphabet) {
                        highlightBrands(al);
                      }
                    }}
                    className={` ml-[8px] mr-[8px] border-b border-b-solid border-[#ffffff] pb-[12px] inline-block font-[600] hover:text-anchor hover:border-anchor-hover ${
                      activeAlphabet ? '' : 'text-[#a7a8a9] cursor-not-allowed'
                    }`}
                  >
                    {al.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
          <div className='lg:w-8/12 W-full'>
            <div className='flex flex-wrap lg:ml-[40px] lg:mr-[40px] bg-light-gray pt-[40px] lg:pl-[24px] lg:pr-[24px]'>
              {allAlphabets.map((al) => {
              
                const brandsToShow = brands?.filter(
                  (brand) => brand.brandName[0].toLowerCase() === al,
                );

                if (brandsToShow?.length === 0) {
                  return <></>;
                }

                return (
                  <div className='w-full pl-[12px] mt-[8px] mb-[8px]'>
                    <div className='text-large-text mb-[8px]' id={al}>
                      {al.toUpperCase()}
                    </div>
                    <div className='mb-[8px] flex flex-wrap'>
                      {brandsToShow?.map((brand) => {
                        return (
                          <div className='mr-[20px] mb-[8px]'>
                            <Link
                              title={brand.brandName}
                              href={
                                brand.brandCollectionUrl
                                  ? `/${brand.brandCollectionUrl}.html`
                                  : `${brand.seName}.html?v=product-list` || '/'
                              }
                            >
                              <a
                                className='text-[18px] mb-[4px] text-anchor-hover hover:text-anchor'
                                title={brand.brandName}
                              >
                                {brand.brandName}
                              </a>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='lg:w-2/12 W-full pt-[40px]'>&nbsp;</div>
        </div>
      </div>
    </section>
  );
};

export default Br_Alphabets;
