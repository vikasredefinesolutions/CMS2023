import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { CustomizeLaterMain } from '@constants/common.constant';
import { CustomizeLater } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { _MyAcc_OrderProductDetails } from '@definations/APIs/user.res';
import Link from 'next/link';
import React, { useState } from 'react';
import OrD_UploadImagePopup from './OrD_UploadImagePopup';

interface _props {
  item: _MyAcc_OrderProductDetails;
  showModal: 'invoice' | 'uploadImage' | null;
  setShowModal: (
    value: React.SetStateAction<'invoice' | 'uploadImage' | null>,
  ) => void;
  updateOrderItems: () => void;
}

const OrD_ItemDetails: React.FC<_props> = ({
  item,
  showModal,
  setShowModal,
  updateOrderItems,
}) => {
  const [selectedLogoId, setSelectedLogoId] = useState<null | number>(null);

  function removeDuplicates(arr: string[]) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  const HtmlForShowLogo = (
    logoStatus: 'Add Logo Later' | 'Customize Logo',
    logoPositionImage: string,
    logoImagePath: string,
    logoId: number,
  ): React.ReactNode => {
    if (logoStatus === 'Add Logo Later') {
      return (
        <div
          className='w-20 h-20  flex items-center justify-center'
          onClick={() => {
            setShowModal('uploadImage');
            setSelectedLogoId(logoId);
          }}
        >
          <button className='btn btn-primary'>Add Logo</button>
        </div>
      );
    }

    if (logoStatus === 'Customize Logo') {
      return (
        <>
          {logoPositionImage == '' ? (
            <div className='flex justify-start items-center mt-3'>
              <div>
                <span className='material-icons text-[60px] mr-3'>
                  support_agent
                </span>
              </div>
              <div>
                <div className='text-lg font-semibold'>
                  {CustomizeLaterMain}
                </div>
                <div className='text-base hidden'>{CustomizeLater}</div>
              </div>
            </div>
          ) : (
            <div className='w-20 h-20 border flex items-center justify-center'>
              <NxtImage
                className='inline-block max-h-full w-full h-full'
                src={logoPositionImage}
                alt=''
                width={100}
                height={100}
              />
            </div>
          )}
        </>
      );
    }

    return (
      <div className='w-20 h-20 border flex items-center justify-center'>
        <NxtImage
          className='inline-block max-h-full w-full h-full'
          src={logoImagePath}
          alt=''
          width={100}
          height={100}
        />
      </div>
    );
  };

  const mergeAllSizes = (
    items: _MyAcc_OrderProductDetails['shoppingCartItemDetailsViewModels'],
  ) => {
    if (items.length === 0) return '';

    let sizes = '';

    const sizesList = removeDuplicates(
      items.map((product) => product.attributeOptionValue),
    );

    sizesList.forEach((size, index, workingArr) => {
      if (index === workingArr.length - 1) {
        sizes += `${size} `;
        return;
      }
      sizes += `${size}, `;
    });

    return sizes;
  };

  return (
    <li className='p-4 sm:p-6'>
      <div className='flex flex-wrap justify-between -mx-3 gap-y-4'>
        <div className='px-3 cursor-pointer'>
          <div className='lg:flex-shrink-0 sm:w-52 sm:h-52 w-full h-auto overflow-hidden rounded-lg text-center'>
            <NxtImage
              src={item.colorImage}
              alt={item.productName}
              className='max-h-full'
            />
          </div>
        </div>
        <div className='w-full lg:w-auto lg:flex-1 sm:mt-0 mt-6 text-default-text text-center sm:text-left px-3'>
          <div className='font-bold text-sub-text cursor-pointer mb-6'>
            <Link href={`/${item.seName}.html`}>
              <a>{item.productName}</a>
            </Link>
          </div>
          <div className='mb-6'>
            <span className='font-[600] inline-block'>SKU :</span>
            <span>{item?.sku}</span>
          </div>
          <div className='mb-6'>
            <span className='font-[600]'>SIZE : </span>
            {mergeAllSizes(item.shoppingCartItemDetailsViewModels)}
          </div>
          <div className='mb-6'>
            <span className='font-[600]'>COLOR : </span>
            {item.attributeOptionValue}
          </div>
          <div className='border-t border-b border-[#d2d2d2] my-4 py-4'>
            {item.shoppingCartItemDetailsViewModels.map((product, index) => (
              <div key={index} className='flex flex-wrap justify-between -mx-3'>
                <div className='w-1/3 px-3'>
                  <div className='font-[600] mb-4'>SIZE</div>
                  <div className='mb-4'>{product.attributeOptionValue}</div>
                </div>
                <div className='w-1/3 px-3'>
                  <div className='font-[600] mb-4'>PRICE</div>
                  <div className='mb-4'>
                    <Price value={product.price} />
                  </div>
                </div>
                <div className='w-1/3 px-3'>
                  <div className='font-[600] mb-4'>QTY</div>
                  <div className='mb-4'>{product.qty}</div>
                </div>
              </div>
            ))}
          </div>
          <div className='mt-4 border-[#d2d2d2] pt-1'>
            {item.shoppingCartLogoPersonViewModels.map((logo, index) => (
              <div key={index} className='flex flex-wrap justify-between -mx-3'>
                <div className='w-1/3 px-3'>
                  <div className='font-[600] mb-4'>Your Logo</div>
                  {HtmlForShowLogo(
                    logo.logoName,
                    logo.logoPositionImage,
                    logo.logoImagePath,
                    logo.id,
                  )}
                </div>
                <div className='w-1/3 px-3'>
                  <div className='font-[600] mb-4'>PRICE</div>
                  <div className='mb-4'>
                    {' '}
                    <Price value={logo.logoPrice} />
                  </div>
                </div>
                <div className='w-1/3 px-3'>
                  <div className='font-[600] mb-4'>Location</div>
                  <div className='w-20 h-20 mb-4'>{logo.logoLocation}</div>
                </div>
                {showModal === 'uploadImage' && (
                  <OrD_UploadImagePopup
                    onClose={() => setShowModal(null)}
                    orderedCartLogoDetailId={selectedLogoId || 0}
                    orderLogoPositionImage={logo.logoPositionImage}
                    updateOrderItems={updateOrderItems}
                  />
                )}
              </div>
            ))}
          </div>
          <div className='flex border-t border-[#d2d2d2] mt-6 pt-4 flex-wrap justify-start -mx-3'>
            <div className='w-1/3 px-3'>
              <div className='font-[600] mb-4'>UNIT TOTAL</div>
              <div className='mb-4'>
                <Price value={item.totalPrice} />
              </div>
            </div>
            <div className='w-1/3 px-3'>
              <div className='font-[600] mb-4'>ESTIMATED PRICE</div>
              <div className='mb-4'>
                <Price value={item.totalPrice} />
              </div>
            </div>
          </div>
        </div>
        <div className='!text-anchor !hover:text-anchor'>
          <Link
            href={`${paths.WRITE_A_REVIEW}?ProductId=${item.productId}&attributeId=${item.attributeOptionId}`}
            title={'Write A Review'}
            className='btn btn-secondary btn-sm'
          >
            Write A Review
          </Link>
        </div>
      </div>
    </li>
  );
};

export default OrD_ItemDetails;
