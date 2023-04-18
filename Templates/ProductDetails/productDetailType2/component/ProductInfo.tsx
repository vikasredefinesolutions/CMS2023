import Price from '@appComponents/Price';
import LoginModal from '@appComponents/modals/loginModal';
import { _modals } from '@appComponents/modals/modal';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AvailableColors from './AvailableColors';
import DiscountPricing from './DiscountPricing';
import Inventory from './ProductInventory';
import { _ProductInfoProps } from './productDetailsComponents';

const ProductInfo: React.FC<_ProductInfoProps> = ({ product, storeCode }) => {
  const [openModal, setOpenModal] = useState<null | _modals>(null);
  const selectedColor = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );
  const router = useRouter();
  const modalHandler = (param: null | _modals) => {
    if (param) {
      setOpenModal(param);
      return;
    }
    setOpenModal(null);
  };

  const goToProduct = (seName: string | null) => {
    if (seName === null) return;
    router.push(`${seName}`);
  };

  return (
    <>
      <div className='col-span-1 mt-[15px] pl-[0px] pr-[0px] md:pl-[15px] md:pr-[15px] sm:pl-[0px] sm:pr-[0px] lg:mt-[0px]'>
        <div className='hidden md:flex flex-wrap'>
          <div className='w-full'>
            <h1 className='text-title-text'>{product?.name}</h1>
          </div>
        </div>
        <div className='mainsection text-center text-sm leading-none mt-[20px]'>
          <div className='md:pt-[20px] md:pb-[20px] text-center bg-quaternary'>
            <div className='md:flex justify-center'>
              <div className='w-full md:w-auto inline-block p-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-white'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons text-2xl-text leading-[15px] text-tertiary'>
                    {__pagesText.productListing.Banner.shippingIcon}
                  </span>
                  <div className='ml-[8px] text-left text-extra-small-text leading-[15px] tracking-[1px] text-white'>
                    <div>{__pagesText.productListing.Banner.shiping}</div>
                    <div> {__pagesText.productListing.Banner.location}</div>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-auto inline-block p-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-white'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons text-2xl-text leading-[15px] text-secondary'>
                    {__pagesText.productListing.Banner.drawIcon}
                  </span>
                  <div className='ml-[8px] text-left text-extra-small-text leading-[15px] tracking-[1px] text-white'>
                    <div>{__pagesText.productListing.Banner.firstLogoFree}</div>
                    <div>
                      {__pagesText.productListing.Banner.uptoTenThousandStiches}
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-auto inline-block p-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-white'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons text-2xl-text leading-[15px] text-primary'>
                    {__pagesText.productListing.Banner.verifyIcon}
                  </span>
                  <div className='ml-[8px] text-left text-extra-small-text leading-[15px] tracking-[1px] text-white'>
                    <div>{__pagesText.productListing.Banner.freeProof}</div>
                    <div>{__pagesText.productListing.Banner.onAllOrders}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=''>
          <div className='pt-[15px] text-default-text'>
            <span className='inline-block w-[90px]'>
              {' '}
              {__pagesText.productInfo.sku}
            </span>
            <span>:</span> <span className='ml-[4px]'>{product?.sku}</span>
          </div>
          <div className='pt-[15px] text-default-text'>
            <span className='inline-block w-[90px]'>
              {' '}
              {__pagesText.productInfo.msrp}
            </span>

            <span className='ml-[4px]'>
              <Price
                value={undefined}
                prices={{
                  msrp: product ? product.msrp : 0,
                  salePrice: product ? product.salePrice : 0,
                }}
                addColon={true}
              />{' '}
            </span>
          </div>
        </div>
        <DiscountPricing
          storeCode={storeCode}
          showMsrpLine={true}
          price={{
            msrp: product ? product.msrp : 0,
            salePrice: product ? product.salePrice : 0,
          }}
          showLogin={product ? !product.isDiscontinue : false}
          modalHandler={modalHandler}
        />
        <AvailableColors />
        {/* <div className='pt-[15px] text-default-text'>
          <span className='inline-block w-[90px]'>Color Name</span>
          <span>:</span> <span className='ml-[4px]'>Stonewash</span>
        </div> */}
        <div className='pt-[15px] text-default-text text-right'>
          <a
            href='javascript:void(0);'
            className='text-anchor hover:text-anchor-hover underline'
            data-modal-toggle='FitandSize'
          >
            Fit and Size
          </a>{' '}
          <a
            href='javascript:void(0);'
            className='text-anchor hover:text-anchor-hover underline'
            data-modal-toggle='Personalize'
          >
            Personalize
          </a>
        </div>
        <Inventory
          attributeOptionId={selectedColor.attributeOptionId}
          storeCode={''}
        />
        <div className='pt-[15px] text-default-text'>
          <div className='text-red-700'>
            {__pagesText.productInfo.notesPk.minimumPiecePerColor}
          </div>
        </div>
        <div className='pt-[15px] text-default-text flex flex-wrap items-center gap-[10px]'>
          <div className=''>Price Per Item</div>
          <div className='text-title-text'>${product?.salePrice}</div>
          <div className='line-through'>${product?.msrp}</div>
        </div>
        <form className='mt-[24px]'>
          <div className='m-[12px] mt-[24px]'>
            <a
              href='apply-logo.html'
              className='btn btn-primary text-center btn-lg w-full'
            >
              CUSTOMIZE NOW AND ADD TO CART
            </a>
          </div>
        </form>
        <div className='pt-[15px] text-default-text'>
          <div className=''>{__pagesText.productInfo.notesPk.backordered}</div>
        </div>
      </div>
      {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
    </>
  );
};

export default ProductInfo;
