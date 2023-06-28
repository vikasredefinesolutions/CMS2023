import { _Store } from '@configs/page.config';
import { __pagesText } from '@constants/pages.text';
import {
  FetchCustomerQuantityByProductId,
  FetchInventoryById,
} from '@services/product.service';
import CalculativeFigure from '@templates/ProductDetails/Components/CalculativeFigure';
import DiscountPricing from '@templates/ProductDetails/Components/DiscountPricing';
import SizePriceQtyTable from '@templates/ProductDetails/Components/SizePriceQtyTable';
import SomActionsHandler from '@templates/ProductDetails/Components/SomActionsHandler';
import SomCustomizeLogoOptions from '@templates/ProductDetails/Components/SomCustomizeLogoOptions';
import StartOrderAvailableColors from '@templates/ProductDetails/Components/StartOrderAvailableColors';
import SizePriceQtyTable4 from '@templates/ProductDetails/productDetailType4/component/SizePriceQtyTableType4';
import Price from 'appComponents_v2/reUsable/Price';
import { GetCustomerId, useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import React, { useEffect, useState } from 'react';
import { _startOrderModalProps } from './startOrderModalType';

const StartOrderModal: React.FC<_startOrderModalProps> = (props) => {
  const { product, modalHandler, edit } = props;
  const {
    clearToCheckout,
    setShowLoader,
    product_storeData,
    setColor,
    product_editLogoPrice,
    updateDiscountPrice,
  } = useActions_v2();
  const [ignoreFirstCleanUp, setIgnoreFirstCleanUp] = useState<boolean>(true);
  const { product_PresentQty } = useActions_v2();
  const [allColors, showAllColors] = useState<boolean>(false);
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);

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

  const { multipleQuantity } = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );
  const customizationEnable = useTypedSelector_v2(
    (state) => state.product.product.customization,
  );

  const [notevalue, setNotevalue] = useState<string>('');
  const [nowOrLater, setNowOrLater] = useState<'later' | 'now'>('later');

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
  const customerId = GetCustomerId();
  const [currentPresentQty, setCurrentPresentQty] = useState<number>(0);
  const [editDetails, setEditDetails] = useState<
    {
      price: number;
      qty: number;
      optionValue: string;
    }[]
  >([]);

  useEffect(() => {
    if ((product && customerId) || 0) {
      const payload = {
        ProductId: product.id,
        ShoppingCartItemsId: edit?.shoppingCartItemsId
          ? edit?.shoppingCartItemsId
          : 0,
        CustomerId: +customerId,
      };
      FetchCustomerQuantityByProductId(payload).then((res) => {
        const payload = {
          presentQty: res ? res : 0,
        };
        setCurrentPresentQty(res ? res : 0);
        product_PresentQty(payload);
      });
    }
  }, [product, customerId, edit?.shoppingCartItemsId]);

  useEffect(() => {
    if (edit && colors) {
      const selectedColor = edit
        ? colors.find((color) => color.name === edit?.attributeOptionValue)
        : null;
      if (selectedColor) {
        setColor(selectedColor);
      }
      setNotevalue(edit?.itemNote);
    }
  }, [edit]);

  useEffect(() => {
    return () => {
      if (ignoreFirstCleanUp) {
        setIgnoreFirstCleanUp(false);
        return;
      }
      clearToCheckout();
      product_storeData({ type: 'DISOCUNT_TABLE_PRICES_CLEANUP' });
      product_storeData({ type: 'INVENTORY_LIST_CLEANUP' });
    };
  }, []);

  const getEditDetails = () => {
    if (edit) {
      updateDiscountPrice({
        presentQty: Qtypresent + edit?.totalQty,
        price: discountedPrice,
      });
      return setEditDetails([
        ...edit.shoppingCartItemDetailsViewModels.map((res) => ({
          qty: res.qty,
          price: res.price,
          optionValue: res.attributeOptionValue,
        })),
      ]);
    }
  };

  const { totalQty } = useTypedSelector_v2((state) => state.product.toCheckout);
  useEffect(() => {
    if (edit) {
      let logoprizes = edit.shoppingCartLogoPersonViewModels.map(
        (el) => el.logoPrice / el.qty,
      );
      product_editLogoPrice({ prices: logoprizes });
      getEditDetails();
    }
  }, [edit?.shoppingCartLogoPersonViewModels, totalQty]);

  const { price: discountedPrice } = useTypedSelector_v2(
    (state) => state.product.toCheckout,
  );

  const Qtypresent = useTypedSelector_v2(
    (state) => state.product.selected.presentQty,
  );

  useEffect(() => {
    if (Qtypresent !== 0) {
      const payload = {
        presentQty: Qtypresent + (edit?.totalQty || 0),
        price: discountedPrice,
      };
      updateDiscountPrice(payload);
    }
  }, [currentPresentQty]);
  return (
    <div
      id='startorderModal'
      className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0 text-default-text'
    >
      <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
        <div className='relative px-[16px] w-full max-w-4xl h-full md:h-auto'>
          {allColorsInventory && (
            <div className='relative bg-[#ffffff] shadow max-h-screen overflow-y-auto h-full'>
              <div className='flex justify-between items-start p-[25px] rounded-t border-b sticky top-0 left-0 bg-[#ffffff] z-50'>
                <div className='font-[600] text-large-text'>{product.name}</div>
                <button
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] p-[6px] ml-auto inline-flex items-center'
                  onClick={() => {
                    clearToCheckout();
                    modalHandler(null);
                  }}
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

                    {multipleQuantity > 1 && (
                      <div className=''>
                        <span className='text-medium-text'>
                          {
                            __pagesText.productInfo.startOrderModal
                              .orderInMultipleOf
                          }
                          {multipleQuantity}
                        </span>
                      </div>
                    )}
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
                  {storeCode !== _Store.type4 && !edit && (
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

                  {!edit && allColors && <StartOrderAvailableColors />}
                  <div className='mt-3'>
                    <h2 className='sr-only'>
                      {
                        __pagesText.productInfo.startOrderModal
                          .productInformation
                      }
                    </h2>
                  </div>
                  {storeCode == _Store.type4 ? (
                    product.isSpecialBrand && (
                      <div>
                        <DiscountPricing
                          title={'selectsizeandquanity'}
                          storeCode={storeCode ? storeCode : ''}
                          showMsrpLine={false}
                          modalHandler={modalHandler}
                          price={{
                            msrp: product.msrp,
                            salePrice: product.salePrice,
                          }}
                          isSpecialBrand={product.isSpecialBrand}
                        />
                      </div>
                    )
                  ) : (
                    <div>
                      <DiscountPricing
                        title={'selectsizeandquanity'}
                        storeCode={storeCode ? storeCode : ''}
                        showMsrpLine={false}
                        modalHandler={modalHandler}
                        price={{
                          msrp: product.msrp,
                          salePrice: product.salePrice,
                        }}
                        isSpecialBrand={product.isSpecialBrand}
                      />
                    </div>
                  )}
                </div>
                {storeCode !== _Store.type4 ? (
                  <SizePriceQtyTable
                    editDetails={editDetails}
                    isSpecialBrand={props.product.isSpecialBrand}
                  />
                ) : (
                  <SizePriceQtyTable4
                    editDetails={editDetails}
                    isSpecialBrand={props.product.isSpecialBrand}
                    brandName={props.edit?.brandPolicyViewModels.name}
                  />
                )}

                {storeCode !== _Store.type4 && customizationEnable && (
                  <SomCustomizeLogoOptions
                    editSizes={edit?.shoppingCartLogoPersonViewModels || null}
                    totalQty={edit?.totalQty || 0}
                    setNowOrLater={setNowOrLater}
                    nowOrLater={nowOrLater}
                  />
                )}

                <CalculativeFigure />

                <div className=''>
                  <label className='block mb-[1px] font-[600]'>Notes</label>
                  <textarea
                    name=''
                    id=''
                    className={`${
                      storeCode == _Store.type4
                        ? 'form-input'
                        : 'block w-full border border-gray-600 shadow-sm text-base py-2 px-4'
                    }`}
                    rows={3}
                    onChange={(e) => setNotevalue(e.target.value)}
                    value={notevalue}
                  ></textarea>
                </div>
              </div>
              <SomActionsHandler
                closeStartOrderModal={() => {
                  clearToCheckout();
                  modalHandler(null);
                }}
                note={notevalue}
                cartItemId={edit?.shoppingCartItemsId || 0}
                isUpdate={Boolean(edit?.shoppingCartItemsId)}
                logoNowOrLater={nowOrLater}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartOrderModal;
