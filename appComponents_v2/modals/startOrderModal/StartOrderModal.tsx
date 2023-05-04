import { __pagesText } from '@constants/pages.text';
import { _startOrderModalProps } from '@definations/startOrderModal';
import { FetchInventoryById } from '@services/product.service';
import AskToLogin from '@templates/ProductDetails/Components/AskToLogin';
import CalculativeFigure from '@templates/ProductDetails/Components/CalculativeFigure';
import DiscountPricing from '@templates/ProductDetails/Components/DiscountPricing';
import SizePriceQtyTable from '@templates/ProductDetails/Components/SizePriceQtyTable';
import SomActionsHandler from '@templates/ProductDetails/Components/SomActionsHandler';
import SomCustomizeLogoOptions from '@templates/ProductDetails/Components/SomCustomizeLogoOptions';
import StartOrderAvailableColors from '@templates/ProductDetails/Components/StartOrderAvailableColors';
import Inventory from '@templates/ProductDetails/productDetailType4/component/ProductInventory';
import Price from 'appComponents_v2/reUsable/Price';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import React, { useEffect, useRef, useState } from 'react';

const StartOrderModal: React.FC<_startOrderModalProps> = (props) => {
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const { product, modalHandler, editDetails } = props;
  const { clearToCheckout, setShowLoader, product_storeData, setColor } =
    useActions_v2();

  const [allColors, showAllColors] = useState<boolean>(false);
  const { layout: storeLayout } = useTypedSelector_v2((state) => state.store);

  const { name: colorName } = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );
  const { toCheckout } = useTypedSelector_v2((state) => state.product);
  const { colors, inventory: allColorsInventory } = useTypedSelector_v2(
    (state) => state.product.product,
  );
  const selectedProduct = useTypedSelector_v2(
    (state) => state.product.selected,
  );
  const customizationEnable = useTypedSelector_v2(
    (state) => state.product.product.customization,
  );

  useEffect(() => {
    setShowLoader(false);
    if (!allColorsInventory && colors) {
      const allColorAttributes = colors?.map(
        (color) => color.attributeOptionId,
      );

      FetchInventoryById({
        productId: selectedProduct.productId,
        attributeOptionId: allColorAttributes,
      }).then((res) => {
        product_storeData({
          type: 'INVENTORY_LIST',
          data: res,
        });
      });
    }

    // return () => {
    //   clearToCheckout();
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct.productId]);

  useEffect(() => {
    if (editDetails && colors) {
      const selectedColor = editDetails
        ? colors.find(
            (color) => color.name === editDetails?.attributeOptionValue,
          )
        : null;
      if (selectedColor) {
        setColor(selectedColor);
      }
    }
  }, [editDetails]);

  const getEditDetails = () => {
    if (editDetails) {
      return editDetails.shoppingCartItemDetailsViewModels.map((res) => ({
        qty: res.qty,
        price: res.price,
        optionValue: res.attributeOptionValue,
      }));
    }
    return [];
  };

  return (
    <div
      id='startorderModal'
      className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0'
    >
      <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
        <div className='relative px-[16px] w-full max-w-4xl h-full md:h-auto'>
          {allColorsInventory && (
            <div className='relative bg-[#ffffff] shadow max-h-screen overflow-y-auto h-full'>
              <div className='flex justify-between items-start p-[25px] rounded-t border-b sticky top-0 left-0 bg-[#ffffff] z-50'>
                <div className='font-[600] text-large-text'>{product.name}</div>
                <button
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] p-[6px] ml-auto inline-flex items-center'
                  onClick={() => modalHandler(null)}
                >
                  <svg
                    className='w-[24px] h-[24px]'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>

              <div className='p-[25px]'>
                <div className='flex flex-wrap mb-[25px]'>
                  <div className='w-full lg:w-1/2'>
                    <div className=''>
                      <span className='font-[600]'>
                        {__pagesText.productInfo.sku} :
                      </span>
                      <span> {product?.sku}</span>
                    </div>
                    <div className=''>
                      <span className='font-[600]'>
                        {__pagesText.productInfo.startOrderModal.color}
                      </span>
                      <span>{colorName}</span>
                    </div>
                  </div>

                  <div className='w-full lg:w-1/2 lg:text-right'>
                    <div className='font-[600]'>
                      {__pagesText.productInfo.startOrderModal.itemTotal}
                    </div>
                    <div className='font-[600]'>
                      <Price value={toCheckout.totalPrice} />
                    </div>
                  </div>
                </div>

                <div className='mb-[25px]'>
                  {storeLayout !== 'DI' && (
                    <div className=''>
                      <button
                        type='button'
                        onClick={() => showAllColors((show) => !show)}
                        className='text-anchor hover:text-anchor-hover font-[600] underline text-medium-text'
                      >
                        {allColors
                          ? 'Show less'
                          : `See All ${colors?.length} Colors`}
                      </button>
                    </div>
                  )}

                  {allColors && <StartOrderAvailableColors />}
                  <div className='mt-3'>
                    <h2 className='sr-only'>
                      {
                        __pagesText.productInfo.startOrderModal
                          .productInformation
                      }
                    </h2>
                  </div>
                  <div>
                    <DiscountPricing
                      storeCode={storeLayout ? storeLayout : ''}
                      showMsrpLine={false}
                      price={{
                        msrp: product.msrp,
                        salePrice: product.salePrice,
                      }}
                    />

                    <AskToLogin modalHandler={modalHandler} />
                  </div>
                </div>
                {storeLayout !== 'DI' ? (
                  <SizePriceQtyTable editDetails={getEditDetails()} />
                ) : (
                  <Inventory
                    storeCode={storeLayout}
                    productId={editDetails?.productId}
                    editDetails={editDetails}
                  />
                )}

                {storeLayout !== 'DI' && customizationEnable && (
                  <SomCustomizeLogoOptions
                    editDetails={editDetails?.shoppingCartLogoPersonViewModels}
                    totalQty={editDetails?.totalQty || 0}
                  />
                )}

                <CalculativeFigure />

                <div className=''>
                  <label className='block mb-[1px] font-[600]'>Notes</label>
                  <textarea
                    name=''
                    id=''
                    className='block w-full border border-gray-600 shadow-sm text-base py-2 px-4'
                    rows={3}
                  ></textarea>
                </div>
              </div>
              <SomActionsHandler
                closeStartOrderModal={() => modalHandler(null)}
                note={textRef.current?.value || ''}
                cartItemId={editDetails?.shoppingCartItemsId || 0}
                isUpdate={Boolean(editDetails?.shoppingCartItemsId)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartOrderModal;
