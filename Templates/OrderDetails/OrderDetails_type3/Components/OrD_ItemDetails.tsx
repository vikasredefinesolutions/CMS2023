import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { paths } from '@constants/paths.constant';
import { _MyAcc_OrderProductDetails } from '@definations/APIs/user.res';
import Link from 'next/link';
import React from 'react';

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
  return (
    <li className='flex flex-wrap py-[15px] mx-[-15px]'>
      <div className='w-full lg:w-1/3 px-[15px]'>
        <Link href={`/${item.seName}.html`}>
          <a className='block border border-gray-border'>
            <NxtImage
              src={item.colorImage}
              alt={item.productName}
              className=''
            />
          </a>
        </Link>
      </div>
      <div className='w-full lg:w-2/3 px-[15px] flex flex-wrap lg:justify-between'>
        <div className='text-title-text font-semibold mb-[10px] w-full'>
          <Link href={`/${item.seName}.html`}>
            <a>{item.productName}</a>
          </Link>
        </div>
        <div>
          <div className='w-full'>
            <div className='text-normal-text mt-[15px]'>
              <span className='font-semibold'>SKU :</span> {item?.sku}
            </div>
            <div className='text-normal-text mt-[15px]'>
              <span className='font-semibold'>COLOR : </span>{' '}
              {item.attributeOptionValue}
            </div>

            {/* <div className='mb-6'></div>
          <div className='mb-6'>
            <span className='font-[600]'>SIZE : </span>
            {mergeAllSizes(item.shoppingCartItemDetailsViewModels)}
          </div> */}

            <div className='mt-[15px] border-t border-t-gray-border text-small-text'>
              {item.shoppingCartItemDetailsViewModels.map((product, index) => (
                <div
                  key={index}
                  className='flex justify-between py-[15px] border-b border-gray-border'
                >
                  <div className='w-full md:w-1/3'>
                    <div className='mb-[5px]'>SIZE</div>
                    <div className='font-semibold'>
                      {product.attributeOptionValue}
                    </div>
                  </div>
                  <div className='w-full md:w-1/3'>
                    <div className='mb-[5px]'>PRICE</div>
                    <div className='font-semibold'>
                      <Price value={product.price} />
                    </div>
                  </div>
                  <div className='w-full md:w-1/3'>
                    <div className='mb-[5px]'>QTY</div>
                    <div className='font-semibold'>{product.qty}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-between py-[15px] border-b border-gray-border'>
            <div className='w-1/2'>
              <div className='mb-[5px]'>UNIT TOTAL</div>
              <div className='font-semibold'>
                <Price value={item.productTotal} />
              </div>
            </div>
            <div className='w-1/2 text-right'>
              <div className='mb-[5px]'>ESTIMATED PRICE</div>
              <div className='font-semibold'>
                <Price value={item.productTotal} />
              </div>
            </div>
          </div>
          <div className='py-[15px]'>
            <Link
              href={`${paths.WRITE_A_REVIEW}?ProductId=${item.productId}&attributeId=${item.attributeOptionId}`}
              title={'Write A Review'}
              className='btn btn-primary btn-lg uppercase'
            >
              <a className='btn btn-primary btn-lg uppercase'>Write A Review</a>
            </Link>
          </div>
        </div>
        {/* <div className='mt-4 border-[#d2d2d2] pt-1'>
            {item.shoppingCartLogoPersonViewModels.length > 0 &&
              item.shoppingCartLogoPersonViewModels.map((logo, index) =>
                logo.logoName === CustomizeLaterMain ? (
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
                      <div className='text-base'>
                        {__pagesText.CustomizeLater}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={index}
                    className='flex flex-wrap justify-between -mx-3'
                  >
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
                ),
              )}
            {item.displayLineAttributeOptions.length > 0 && (
              <div className='mt-10'>
                <div className='text-normal-text border-t pt-[10px] mt-[10px] first:mt-0'>
                  <div className='font-semibold'>Personalise Text:</div>
                  <div className='flex justify-between py-1 first:pt-0 last:pb-0'>
                    <div className='font-semibold'>Font</div>
                    <div className='text-right'>
                      {
                        item.displayLineAttributeOptions[0]
                          .linePersonalizeDetails[0].font
                      }
                    </div>
                  </div>
                  <div className='flex justify-between py-1 first:pt-0 last:pb-0'>
                    <div className='font-semibold'>Color</div>
                    <div className='text-right'>
                      {
                        item.displayLineAttributeOptions[0]
                          .linePersonalizeDetails[0].color
                      }
                    </div>
                  </div>
                  <div className='flex justify-between py-1 first:pt-0 last:pb-0'>
                    <div className='font-semibold'>
                      Personalization Location
                    </div>
                    <div className='text-right'>
                      {
                        item.displayLineAttributeOptions[0]
                          .linePersonalizeDetails[0].location
                      }
                    </div>
                  </div>
                </div>
                {item.displayLineAttributeOptions.map(
                  (Lineitem: DisplayLineAttributeOption, index: number) => {
                    return (
                      <>
                        <div className='text-normal-text border-t pt-[10px] mt-[10px] first:mt-0'>
                          <div className='flex justify-between py-1 first:pt-0 last:pb-0'>
                            <div className='font-semibold'>Size</div>
                            <div className='text-right font-bold'>
                              {Lineitem.attributeOptionName}
                            </div>
                          </div>
                          {Lineitem.linePersonalizeDetails.map(
                            (line: any, ind: number) => (
                              <>
                                <div className='flex justify-between py-1 first:pt-0 last:pb-0'>
                                  <div className='font-semibold'>Line 1</div>
                                  <div className='text-right'>
                                    {line.line1Text}
                                  </div>
                                </div>
                                {line.line2Text && line.line2Text !== '' && (
                                  <div className='flex justify-between py-1 first:pt-0 last:pb-0'>
                                    <div className='font-semibold'>Line 2</div>
                                    <div className='text-right'>
                                      {line.line2Text}
                                    </div>
                                  </div>
                                )}
                              </>
                            ),
                          )}
                        </div>
                      </>
                    );
                  },
                )}
              </div>
            )}
          </div> */}
      </div>
    </li>
  );
};

export default OrD_ItemDetails;
