import Price from '@appComponents/Price';
import PersonalizeFontModal from '@appComponents/modals/PersonalizeFontModal/PersonalizeFontModal';
import LoginModal from '@appComponents/modals/loginModal';
import { _modals } from '@appComponents/modals/modal';
import SizeChartModal from '@appComponents/modals/sizeChartModal/SizeChartModal';
import { __pagesText } from '@constants/pages.text';
import { _ProductDetails } from '@definations/APIs/productDetail.res';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useEffect, useState } from 'react';
import AvailableColors from './AvailableColors';
import BuyNowHeader from './BuyNowHeader';
import DiscountPrice from './DiscountPrice';
import DiscountPricing from './DiscountPricing';
import Inventory from './ProductInventory';

interface _Props {
  product: _ProductDetails | null;
  storeCode: string;
  setShowLogoComponent: React.Dispatch<React.SetStateAction<boolean>>;
  showLogoComponent: boolean;
}

const ProductInfo: React.FC<_Props> = ({
  product,
  storeCode,
  setShowLogoComponent,
  showLogoComponent,
}) => {
  const [openModal, setOpenModal] = useState<null | _modals>(null);
  const {
    totalQty,
    minQty,
    sizeQtys,
    price: pricePerItem,
  } = useTypedSelector_v2((state) => state.product.toCheckout);
  const selectedColor = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );
  const { id: userId } = useTypedSelector_v2((state) => state.user);
  const { showModal } = useActions_v2();
  const { sizeChart } = useTypedSelector_v2((state) => state.product.product);
  const [isVisible, setIsVisible] = useState(false);
  const { isEmpGuest } = useTypedSelector_v2((state) => state.employee);

  const modalHandler = (param: null | _modals) => {
    if (param) {
      setOpenModal(param);
      return;
    }
    setOpenModal(null);
  };
  const buyNowHandler = (e: any) => {
    e?.preventDefault();
    if (isEmpGuest && totalQty > 0) {
      return setShowLogoComponent(true);
    }
    if (isEmpGuest && !totalQty) {
      return showModal({
        message: `Please enter quantity greater than or equal to ${minQty}.`,
        title: 'Required Quantity',
      });
    }
    const isLoggedIn = !!userId;
    if (isLoggedIn === false) {
      modalHandler('login');
      return;
    }

    if (!totalQty) {
      return showModal({
        message: `Please select any one size.
        `,
        title: `Required Size`,
      });
    }
    if (minQty > totalQty) {
      return showModal({
        message: `Oops! The minimum order requirement for this piece is ${minQty} per color.
        `,
        title: ``,
      });
    }

    if (isLoggedIn === true) {
      if (sizeQtys === null || sizeQtys[0]?.qty === 0) {
        modalHandler('requiredQty');
        return;
      }
      if (totalQty < minQty) {
        showModal({
          message: `Please enter quantity greater than or equal to ${minQty}.`,
          title: 'Required Quantity',
        });

        return;
      }
      setShowLogoComponent(true);
    }
  };

  const { image } = useTypedSelector_v2((state) => state.product.selected);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('mainContent');
      const rect = element?.getBoundingClientRect();
      const isInRange = rect ? rect?.top <= 200 : false;
      setIsVisible(isInRange);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const BUY_NOW_BTN_HTML = (): React.ReactNode => {
    //if condition order matters here
    let disableBtn = product?.isDiscontinue;
    let btnText = 'LOGIN TO SHOP NOW WITH LIVE INVENTORY';

    if (disableBtn) {
      btnText = 'Discontinued';
    }

    if (userId) {
      btnText = 'CUSTOMIZE NOW AND ADD TO CART';
    }

    if (isEmpGuest) {
      disableBtn = false;
      btnText = 'CUSTOMIZE NOW AND ADD TO CART';
    }

    return (
      <div className='m-[12px] mt-[24px]'>
        <button
          disabled={disableBtn}
          onClick={buyNowHandler}
          className='btn btn-primary text-center btn-lg w-full'
        >
          {btnText}
        </button>
      </div>
    );
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
                  <span className='material-icons leading-[15px] text-tertiary'>
                    {__pagesText.productListing.Banner.shippingIcon}
                  </span>
                  <div className='ml-[8px] text-left text-extra-small-text leading-[15px] tracking-[1px] text-[#ffffff]'>
                    <div>{__pagesText.productListing.Banner.shiping}</div>
                    <div> {__pagesText.productListing.Banner.location}</div>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-auto inline-block p-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-white'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons leading-[15px] text-secondary'>
                    {__pagesText.productListing.Banner.drawIcon}
                  </span>
                  <div className='ml-[8px] text-left text-extra-small-text leading-[15px] tracking-[1px] text-[#ffffff]'>
                    <div>{__pagesText.productListing.Banner.firstLogoFree}</div>
                    <div>
                      {__pagesText.productListing.Banner.uptoTenThousandStiches}
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-auto inline-block p-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-white'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons leading-[15px] text-primary'>
                    {__pagesText.productListing.Banner.verifyIcon}
                  </span>
                  <div className='ml-[8px] text-left text-extra-small-text leading-[15px] tracking-[1px] text-[#ffffff]'>
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
            <span className='inline-block w-[90px] font-semibold'>
              {' '}
              {__pagesText.productInfo.sku}
            </span>
            <span>:</span> <span className='ml-[4px]'>{product?.sku}</span>
          </div>
          <div className='pt-[15px] text-default-text'>
            <span className='inline-block w-[90px] font-semibold'>
              {' '}
              {__pagesText.productInfo.msrp}
            </span>
            :
            <span
              className={`ml-[4px] ${isEmpGuest ? 'line-through' : ''} ${
                pricePerItem < (product ? product?.msrp : 0)
                  ? 'line-through'
                  : ''
              }`}
            >
              <i>
                <Price
                  value={undefined}
                  prices={{
                    msrp: product ? product.msrp : 0,
                    salePrice: product ? product.salePrice : 0,
                  }}
                />{' '}
              </i>
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

        <div className='pt-[15px] text-default-text text-right items-end justify-between text-anchor hover:text-anchor-hover'>
          {sizeChart && (
            <a
              href='javascript:void(0)'
              className=' underline'
              data-modal-toggle='FitandSize'
              onClick={() => modalHandler('sizeChart')}
            >
              Fit and Size
            </a>
          )}{' '}
          <a
            href='javascript:void(0)'
            className='underline'
            data-modal-toggle='Personalize'
            onClick={() => {
              modalHandler('personalizationFonts');
            }}
          >
            Personalize
          </a>
        </div>
        {userId && (
          <Inventory
            attributeOptionId={selectedColor.attributeOptionId}
            storeCode={''}
          />
        )}

        {/* only for substore */}

        {userId ? (
          <>
            {' '}
            <div className='pt-[15px] text-default-text'>
              <div className='text-red-700'>
                {__pagesText.productInfo.notesPk.minimumPiecePerColor}
              </div>
            </div>
            <div className='pt-[15px] text-default-text flex flex-wrap items-center gap-[10px]'>
              <DiscountPrice
                storeCode={storeCode}
                ourCost={product?.ourCost || 0}
                msrp={product?.msrp || 0}
                imap={product?.imap || 0}
                salePrice={pricePerItem || 0}
              />
            </div>
          </>
        ) : (
          <>
            <div className='pt-[15px] text-default-text'>
              <div className='text-tertiary'>
                {
                  __pagesText.productInfo.notesPk
                    .minimumPiecePerColorWithoutLogin
                }
              </div>
            </div>
          </>
        )}

        <form className='mt-[24px]'>{BUY_NOW_BTN_HTML()}</form>
        <div className='pt-[15px] text-default-text '>
          <span className='font-bold'>
            {__pagesText.productInfo.notesPk.pleaseNote}
          </span>
          <span>{__pagesText.productInfo.notesPk.backordered}</span>
        </div>
      </div>
      {openModal === 'sizeChart' && (
        <SizeChartModal storeCode={storeCode} modalHandler={modalHandler} />
      )}
      {openModal === 'personalizationFonts' && (
        <PersonalizeFontModal modalHandler={modalHandler} />
      )}
      {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
      {isVisible && (
        <BuyNowHeader
          msrp={product?.msrp || 0}
          productName={product?.name || ''}
          buyNowHandler={buyNowHandler}
          image={image}
        />
      )}
    </>
  );
};

export default ProductInfo;
