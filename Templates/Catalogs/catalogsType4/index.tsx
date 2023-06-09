import NxtImage from '@appComponents/reUsable/Image';
import { _Brand } from '@definations/brand';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchCatalog } from '@services/header.service';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { _globalStore } from 'store.global';
interface _props {
  storeId: number;
}

const CatalogDisplayBrandsType4: React.FC<_props> = ({ storeId }) => {
  useEffect(() => {
    if (storeId) {
      fetchBrandImages();
    }
  }, [storeId]);

  const [brandImages, setBrandImages] = useState<_Brand[] | null>([]);
  const fetchBrandImages = async () => {
    const brands = await FetchCatalog({ storeId: storeId });
    brands && setBrandImages(brands.brands);
  };
  const store = useTypedSelector_v2((state) => state.store);

  let mediaBaseUrl = _globalStore.blobUrl;
  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;

  return (
    <>
      <section className='new-home m-b-30 pt-[50px] pb-[50px] bg-primary mt-[-40px]'>
        <div className='container mx-auto '>
         
          <div className='brand-image-list'>
           
            <ul className='flex flex-wrap justify-center'>
              {brandImages &&
                brandImages.map((brandImage) => {
                  return (
                    <>
                      <Fragment key={brandImage.id}>
                        <li className='w-1/2 md:w-1/3 lg:w-1/6 border-t border-l border-b border-r border-home-border -mt-[1px] flex items-center justify-center'>
                          <Link
                            href={
                              mediaBaseUrl +
                              brandImage?.catalogdetails?.catalogFile
                            }
                          >
                            <a style={{ display: 'block' }} target='_blank'>
                              <NxtImage
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
                  );
                })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default CatalogDisplayBrandsType4;
