import NxtImage from '@appComponents/reUsable/Image';
import { listing_max_showcolors } from '@constants/global.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Key, useState } from 'react';
import { _globalStore } from 'store.global';
import { _ProductCompanion } from './productDetailsComponents';
const ProductCompanion: React.FC<_ProductCompanion> = ({
  product,
  companionsplitproductList,
  companionProductcolor,
}) => {
  const router = useRouter();
  const [selectedCompanionimg, setselectedCompanionimg] = useState(
    product?.companionProductImage,
  );
  const goToProduct = (seName: string | null) => {
    if (seName === null) return;
    router.push(`${seName}`);
  };
  const { isAttributeSaparateProduct } = useTypedSelector_v2(
    (state) => state.store,
  );
  let flag: boolean = false;
  let mediaBaseUrl = _globalStore.blobUrl;
  return (
    <>
      <div className='lg:col-span-2 mt-[15px] pl-[0px] pr-[0px] md:pl-[15px] md:pr-[15px] lg:mt-[0px]'>
        <div className='bg-light-gray p-[10px] mb-[10px] text-center text-title-text'>
          Companion
        </div>
        <div className='relative border border-gray-200 pb-4 text-center'>
          <Link href={`${product?.companionProductSEName}`}>
            {product && (
              <NxtImage
                src={selectedCompanionimg || ''}
                alt={product?.companionProductSEName || ''}
                className={'"max-h-full"'}
                title={product.companionProductName || ''}
              />
            )}
          </Link>

          <div className='mt-[10px] relative'>
            <div className='mb-[10px]'>
              <Link href={`/${product?.companionProductSEName}`}>
                <a
                  href=''
                  className='relative text-sub-text font-bold h-[45px] overflow-hidden inline-block'
                >
                  {product?.companionProductName}
                </a>
              </Link>
            </div>
            <div className='mb-[10px] text-black text-base tracking-wider'>
              <span className='font-semibold'></span>
            </div>
            <ul
              role='list'
              className='flex flex-wrap items-center mt-[5px] justify-center gap-[2px]'
            >
              {isAttributeSaparateProduct &&
              companionsplitproductList &&
              companionsplitproductList[0] &&
              companionsplitproductList[0]?.splitproductList?.length ? (
                <div className='flex'>
                  {companionsplitproductList[0]?.splitproductList?.map(
                    (
                      subRow: {
                        seName: any;
                        prodcutId: Key | null | undefined;
                        imageurl: any;
                        colorName: string | undefined;
                      },
                      index: number,
                    ) =>
                      index < listing_max_showcolors ? (
                        <Link
                          key={companionsplitproductList[0].name + index}
                          href={`/${subRow.seName}.html`}
                        >
                          <li
                            className={`w-7 h-7 border-2 hover:border-secondary cursor-pointer`}
                            key={subRow.prodcutId}
                          >
                            <NxtImage
                              src={`${mediaBaseUrl}${subRow.imageurl}`}
                              alt=''
                              className=''
                              title={subRow.colorName}
                            />
                          </li>
                        </Link>
                      ) : (
                        <>{(flag = true)}</>
                      ),
                  )}
                </div>
              ) : (
                companionProductcolor &&
                companionProductcolor.map((subRow, index) =>
                  index < listing_max_showcolors ? (
                    <li
                      className={`w-7 h-7 border-2 hover:border-secondary cursor-pointer ${
                        subRow.imageUrl === selectedCompanionimg
                          ? ' border-secondary'
                          : 'border-light-gray'
                      }`}
                      onClick={() => {
                        setselectedCompanionimg(subRow.imageUrl);
                      }}
                      key={index}
                    >
                      <NxtImage
                        src={`${mediaBaseUrl}${subRow.imageUrl}`}
                        alt=''
                        className=''
                        title={subRow.altTag}
                      />
                    </li>
                  ) : (
                    <>{(flag = true)}</>
                  ),
                )
              )}
              {flag ? (
                <Link
                  key={product?.id}
                  href={`/${product?.companionProductSEName}.html`}
                >
                  <li className='w-[28px] h-[28px] border-2 border-light-gray hover:border-secondary relative cursor-pointer'>
                    <span
                      className='absolute inset-0 bg-primary text-xs bg-[#003a70] font-semibold flex items-center justify-center text-[#ffffff]'
                      title={` See Additional ${
                        companionProductcolor &&
                        companionProductcolor.length -
                          listing_max_showcolors -
                          listing_max_showcolors
                      } Colors`}
                    >
                      {' '}
                      +{' '}
                      {companionProductcolor &&
                        companionProductcolor.length - listing_max_showcolors}
                    </span>
                  </li>
                </Link>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductCompanion;
