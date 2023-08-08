import ImageComponent from '@appComponents/reUsable/Image';
import { _BrandWithProductCount } from '@definations/brand';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import { useActions_v2 } from '@hooks_v2/index';
import { FetchBrandsWithProductCount } from '@services/brand.service';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
interface _props {
  storeId: number;
}

const DIHomePage: React.FC<_props> = ({ storeId }) => {
  const { showModal } = useActions_v2();
  useEffect(() => {
    fetchBrandImagesandProductCount();
  }, []);
  const router = useRouter();
  const [brandImagesWithProductCount, setBrandImagesWithProductCount] =
    useState<_BrandWithProductCount[] | null>(null);

  const fetchBrandImagesandProductCount = async () => {
    const brands: _BrandWithProductCount[] = await FetchBrandsWithProductCount(
      '' + storeId,
    );
    setBrandImagesWithProductCount(brands);
  };
  return (
    <>
      <section className='pt-[30px] md:pt-[50px] brand-logo-list white-title bg-primary'>
        <div className='container mx-auto '>
          <div className='text-center pb-[40px]'>
            <div className='text-large-text text-white mb-[10px]'>
              Our Exclusive Brands You Can Buy Online
            </div>
          </div>
          <div className='brand-image-list'>
            <ul className='flex flex-wrap justify-center'>
              {brandImagesWithProductCount &&
                brandImagesWithProductCount.map((brandImage) => {
                  return (
                    <>
                      {brandImage.isBrandOnline && (
                        <>
                          <Fragment key={brandImage.id}>
                            <li className='w-1/2 md:w-1/3 lg:w-1/5 border-t border-l border-b border-r border-home-border -mt-[1px] flex items-center justify-center'>
                              <Link href={`/${brandImage.seName}.html`}>
                                <a style={{ display: 'block' }}>
                                  <ImageComponent
                                    src={brandImage.brandColorImageUrl}
                                    className=''
                                    alt={capitalizeFirstLetter(
                                      brandImage.brandName,
                                    )}
                                    height={200}
                                    width={200}
                                    useNextImage={false}
                                  />
                                </a>
                              </Link>
                            </li>
                          </Fragment>
                        </>
                      )}
                    </>
                  );
                })}
            </ul>
          </div>
        </div>
      </section>
      <section className='new-home m-b-30 pt-[50px] pb-[50px] bg-primary'>
        <div className='container mx-auto '>
          <div className='text-center pb-[40px]'>
            <div className='text-large-text text-white mb-[10px]'>
              All our other Brands
            </div>
          </div>
          <div className='brand-image-list'>
            <ul className='flex flex-wrap justify-center'>
              {brandImagesWithProductCount &&
                brandImagesWithProductCount.map((brandImage) => {
                  return (
                    <>
                      {!brandImage.isBrandOnline && (
                        <>
                          <Fragment key={brandImage.id}>
                            <li className='w-1/2 md:w-1/3 lg:w-1/6 border-t border-l border-b border-r border-home-border -mt-[1px] flex items-center justify-center'>
                              {/* <Link href={`/${brandImage.seName}.html`}> */}
                              <div
                                className='cursor-pointer'
                                onClick={() => {
                                  if (brandImage.prodcutcount == 0) {
                                    showModal({
                                      title: `Call For Item(s)`,
                                      message:
                                        'Call for item availability and pricing.',
                                    });
                                  } else {
                                    router.push(`/${brandImage.seName}.html`);
                                  }
                                }}
                              >
                                <a style={{ display: 'block' }}>
                                  <ImageComponent
                                    src={brandImage.brandColorImageUrl}
                                    className=''
                                    alt={capitalizeFirstLetter(
                                      brandImage.brandName,
                                    )}
                                    height={200}
                                    width={200}
                                    useNextImage={false}
                                  />
                                </a>
                              </div>
                              {/* </Link> */}
                            </li>
                          </Fragment>
                        </>
                      )}
                    </>
                  );
                })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default DIHomePage;
