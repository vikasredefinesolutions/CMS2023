import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { CustomizeLater, CustomizeLaterMain } from '@constants/common.constant';
import { __pagesText } from '@constants/pages.text';
import { _MyAcc_OrderProductDetails } from '@definations/APIs/user.res';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { DisplayLineAttributeOption } from '@services/cart';
import React from 'react';
import { _globalStore } from 'store.global';

interface _props {
  product: _MyAcc_OrderProductDetails;
}

let mediaBaseUrl = _globalStore.blobUrl;

const ThankYouProductTable: React.FC<_props> = ({ product }) => {
  const store = useTypedSelector_v2((state) => state.store);
  mediaBaseUrl = store.mediaBaseUrl || mediaBaseUrl;
  // console.log('---here ---', mediaBaseUrl);
  return (
    <>
      <div className='flex justify-between py-[10px]'>
        <div className='text-normal-text font-semibold w-1/3'>Size</div>
        <div className='text-normal-text font-semibold w-1/3 text-center'>
          Qty
        </div>
        <div className='text-normal-text font-semibold w-1/3 text-right'>
          Price
        </div>
      </div>
      {product.shoppingCartItemDetailsViewModels.map((prod, index) => (
        <div key={index} className='flex justify-between py-2'>
          <div className='text-base w-28'>{prod.attributeOptionValue} </div>
          <div className='text-base w-16 text-center'>{prod.qty}</div>
          <div className='text-base w-20 text-right'>
            <Price value={prod.price} />
          </div>
        </div>
      ))}
      <div className='flex justify-between py-3 border-t border-b'>
        <div className='text-base w-28'>{__pagesText.ThankYouPage.Total} </div>
        <div className='text-base w-16 text-center'>{product.totalQty}</div>
        <div className='text-base w-20 text-right'>
          <Price value={product.productTotal} />
        </div>
      </div>

      {(store.storeName !== 'Driving Impressions' && store?.code !== 'PORSCHE') &&
        product.shoppingCartLogoPersonViewModels.map(
          (item: any, index: number) => {
            return item.logoName === 'Customize Later' ? (
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
                  <div className='text-base'>{CustomizeLater}</div>
                </div>
              </div>
            ) : (
              <div
                key={`${item}-${index}`}
                className='w-full flex justify-between py-3'
              >
                <div className='text-base'>
                  <div className='mb-3 flex'>
                    {item.logoImagePath === '' ? (
                      <img
                        className='w-14 h-12'
                        src={`/assets/images/logo-to-be-submitted.webp`}
                        title=''
                        alt={item.logoPositionImage}
                      />
                    ) : (
                      <NxtImage
                        className='w-14 h-12'
                        src={`${item.logoImagePath}`}
                        title=''
                        alt={item.logoImagePath}
                      />
                    )}

                    {item.logoName === 'Add Logo Later' ? (
                      <span className='font-semibold ml-3'>
                        {__pagesText.ThankYouPage.LogoToBe}
                        <br />
                        {__pagesText.ThankYouPage.Submitted}
                      </span>
                    ) : (
                      <span className='font-semibold ml-3'>
                        {__pagesText.ThankYouPage.Logo}
                        <br />
                        {__pagesText.ThankYouPage.Submitted}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className='font-semibold mr-1 mt-2s'>
                      {__pagesText.ThankYouPage.Location}
                    </span>
                    <span>{item.logoLocation}</span>
                  </div>
                </div>
                <div className='text-base text-right'>
                  <div className='font-semibold'>
                    {__pagesText.ThankYouPage.LogoPrice}
                  </div>
                  <div>
                    {index === 0 && item.logoPrice === 0
                      ? 'First Logo Free'
                      : `$${item.logoPrice}`}
                  </div>
                </div>
              </div>
            );
          },
        )}
      {product.displayLineAttributeOptions.length > 0 && (
        <div className='mt-10'>
          <div className='text-normal-text border-t pt-[10px] mt-[10px] first:mt-0'>
            <div className='font-semibold'>Personalise Text:</div>
            <div className='flex justify-between py-1 first:pt-0 last:pb-0'>
              <div className='font-semibold'>Font</div>
              <div className='text-right'>
                {
                  product.displayLineAttributeOptions[0]
                    .linePersonalizeDetails[0].font
                }
              </div>
            </div>
            <div className='flex justify-between py-1 first:pt-0 last:pb-0'>
              <div className='font-semibold'>Color</div>
              <div className='text-right'>
                {
                  product.displayLineAttributeOptions[0]
                    .linePersonalizeDetails[0].color
                }
              </div>
            </div>
            <div className='flex justify-between py-1 first:pt-0 last:pb-0'>
              <div className='font-semibold'>Personalization Location</div>
              <div className='text-right'>
                {
                  product.displayLineAttributeOptions[0]
                    .linePersonalizeDetails[0].location
                }
              </div>
            </div>
          </div>
          {product.displayLineAttributeOptions.map(
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
                            <div className='text-right'>{line.line1Text}</div>
                          </div>
                          {line.line2Text && line.line2Text !== '' && (
                            <div className='flex justify-between py-1 first:pt-0 last:pb-0'>
                              <div className='font-semibold'>Line 2</div>
                              <div className='text-right'>{line.line2Text}</div>
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
    </>
  );
};

export default ThankYouProductTable;
