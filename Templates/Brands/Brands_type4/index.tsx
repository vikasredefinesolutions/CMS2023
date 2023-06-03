import ImageComponent from '@appComponents/reUsable/Image';
import { _Brand, _BrandProps } from '@definations/brand';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchBrandsBySequence } from '@services/brand.service';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

const BrandsType4: React.FC<_BrandProps> = (props) => {
  const storeId = useTypedSelector_v2((state) => state.store.id);
  useEffect(() => {
    fetchBrandImages();
  }, []);

  const [brandImages, setBrandImages] = useState<_Brand[] | null>(null);
  const fetchBrandImages = async () => {
    const brands: _Brand[] = await FetchBrandsBySequence('' + storeId);
    setBrandImages(brands);
  };

  return (
    <>
      <section className='pt-[30px] md:pt-[50px] brand-logo-list white-title bg-primary'>
        <div className='container mx-auto '>
          <div className='brand-image-list'>
            <ul className='flex flex-wrap justify-center'>
              {brandImages &&
                brandImages.map((brandImage, index) => {
                  return (
                    <Fragment key={brandImage.id}>
                      <li
                        className={`${
                          index < 2
                            ? 'w-1/2 md:w-1/3 lg:w-3/6'
                            : 'w-1/2 md:w-1/3 lg:w-1/6'
                        } border-t border-l border-b border-r border-home-border -mt-[1px] flex items-center justify-center`}
                      >
                        <Link href={`/${brandImage.seName}.html`}>
                          <a style={{ display: 'block' }}>
                            <ImageComponent
                              src={brandImage.brandColorImageUrl}
                              className=''
                              alt={capitalizeFirstLetter(brandImage.brandName)}
                              height={200}
                              width={200}
                              useNextImage={false}
                            />
                          </a>
                        </Link>
                      </li>
                    </Fragment>
                  );
                })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default BrandsType4;
