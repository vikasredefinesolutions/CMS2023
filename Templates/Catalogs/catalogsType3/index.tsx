import NxtImage from '@appComponents/reUsable/Image';
import { _Brand } from '@definations/brand';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import { FetchCatalog } from '@services/header.service';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
interface _props {
  storeId: number;
}

const CatalogDisplayBrandsType3: React.FC<_props> = ({ storeId }) => {
  useEffect(() => {
    fetchBrandImages();
  }, []);

  const [brandImages, setBrandImages] = useState<_Brand[] | null>([]);
  const fetchBrandImages = async () => {
    const brands = await FetchCatalog({ storeId: storeId });
    brands && setBrandImages(brands.brands);
  };

  return (
    <section className='container mx-auto pt-20 brand-logo-list white-title'>
      <div>
        <div className='text-center pb-8'>
          <div className='text-2xl md:text-3xl lg:text-title font-title text-color-title mb-2'>
            Our Exclusive Brands You Can Buy Online 3
          </div>
        </div>
        <div className='brand-image-list'>
          <ul className='flex flex-wrap justify-center'>
            {brandImages &&
              brandImages.map((brandImage) => {
                return (
                  <Fragment key={brandImage.id}>
                    <li className='w-1/2 md:w-1/3 lg:w-1/5'>
                      <Link href={`/${brandImage.seName}`}>
                        <NxtImage
                          src={brandImage.brandColorImageUrl}
                          className=''
                          alt={capitalizeFirstLetter(brandImage.brandName)}
                          height={200}
                          width={200}
                          useNextImage={false}
                        />
                      </Link>
                    </li>
                  </Fragment>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CatalogDisplayBrandsType3;
