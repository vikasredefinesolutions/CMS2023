import Price from '@appComponents/Price';
import LoginModal from '@appComponents/modals/loginModal';
import { _modals } from '@appComponents/modals/modal';
import { storeBuilderTypeId } from '@configs/page.config';
import { __Cookie } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { _Selectedproduct_v2 } from '@definations/product.type';
import {
  CaptureGTMEvent,
  getAddToCartObject,
  setCookie,
} from '@helpers/common.helper';
import { highLightError } from '@helpers/console.helper';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { addSubStore, addToCart } from '@services/cart.service';
import { _ProductInfoProps } from '@templates/ProductDetails/Components/productDetailsComponents';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DiscountPrice from './DiscountPrice';
import DiscountPricing from './DiscountPricing';
import ProductCompanion from './ProductCompanion';
import Inventory from './ProductInventory';
import Subtotal from './SubTotal';
import TotalQtySelected from './TotalQuantitySelected';

const ProductInfo: React.FC<_ProductInfoProps> = ({ product, storeCode }) => {
  const [openModal, setOpenModal] = useState<null | _modals>(null);
  const router = useRouter();
  const {
    totalQty,
    minQty,
    sizeQtys,
    price: pricePerItem,
  } = useTypedSelector_v2((state) => state.product.toCheckout);
  const { id: userId } = useTypedSelector_v2((state) => state.user);
  const storeTypeId = useTypedSelector_v2((state) => state.store.storeTypeId);
  const { sbState } = useTypedSelector_v2((state) => state.product.selected);

  const totalCheckout = useTypedSelector_v2(
    (state) => state?.product?.toCheckout,
  );
  const {
    clearToCheckout,
    showModal,
    setShowLoader,
    product_storeData,
    fetchCartDetails,
  } = useActions_v2();
  const { toCheckout, product: storeProduct } = useTypedSelector_v2(
    (state) => state.product,
  );
  // const productDis = useTypedSelector_v2((state) =>
  //   console.log(state, 'discount'),
  // );
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const { colors } = useTypedSelector_v2((state) => state.product.product);

  const selectedProduct = useTypedSelector_v2(
    (state) => state.product.selected,
  );
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );
  const modalHandler = (param: null | _modals) => {
    if (param) {
      setOpenModal(param);
      return;
    }
    setOpenModal(null);
  };

  const buyNowHandler = (e: any, isLoggedIn: boolean) => {
    e.preventDefault();
    if (isLoggedIn === false) {
      modalHandler('login');
      return;
    }

    if (isLoggedIn === true) {
      const addToCartHandler = async () => {
        setShowLoader(true);
        const { sizeQtys, totalPrice, totalQty, logos, price } = toCheckout;
        const location = await getLocation();

        const selectedProducts: _Selectedproduct_v2[] = [];

        colors &&
          colors?.forEach((color) => {
            if (sizeQtys && sizeQtys.map((c) => c.color).includes(color.name)) {
              selectedProducts.push({
                color: { ...color },
                sizeQtys: sizeQtys?.filter((size) => size.color == color.name),
                productId: color.productId,
                image: {
                  id: 0,
                  imageUrl: color.imageUrl,
                  altTag: '',
                },
                inventory: null,
              });
            }
          });

        for (let Product of selectedProducts) {
          // console.log(totalQty, 'totalPrice');

          // let totalPrice = price;
          const cartObject = await getAddToCartObject({
            userId: customerId || 0,
            storeId: storeId || 0,
            isEmployeeLoggedIn,
            note: '',
            sizeQtys: Product.sizeQtys || [],
            productDetails: Product,
            total: {
              totalPrice,
              totalQty,
            },
            shoppingCartItemId: 0,
            logos: null,
            isSewOutEnable: false,
            sewOutCharges: 0,
          });

          if (cartObject) {
            //GTM event for add-to-cart
            const eventPayload = {
              pageTitle: document?.title ? document?.title : '',
              pageCategory: 'Add to Cart',
              visitorType: isLoggedIn ? 'high-value' : 'low-value',
              customProperty1: '',
              event: 'add_to_cart',
              ecommerce: {
                value: toCheckout?.totalPrice,
                currency: 'USD', // USD,
                coupon: '',
                items: [
                  {
                    item_name: storeProduct?.name,
                    item_id: storeProduct?.sku,
                    item_brand: storeProduct?.brand?.name,
                    item_category: '',
                    item_category2: '',
                    item_category3: '',
                    item_category4: '',
                    item_variant: storeProduct?.colors?.length
                      ? storeProduct?.colors?.find(
                          (clr) => clr.productId === storeProduct.id,
                        )?.name
                      : '',
                    item_list_name: storeProduct?.name,
                    item_list_id: storeProduct?.id,
                    index: storeProduct.id,
                    quantity: toCheckout?.totalQty,
                    price: toCheckout?.totalPrice,
                  },
                ],
              },
            };
            CaptureGTMEvent(eventPayload);
            try {
              let c_id = customerId;
              let res;
              await addToCart(cartObject)
                .then((res) => {
                  if (res) {
                    res = res;
                  }
                  return res;
                })
                .then((res) => {
                  if (storeTypeId === storeBuilderTypeId) {
                    const Sbs_constant = {
                      id: 0,
                      rowVersion: '',
                      location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
                      ipAddress: location.ip_address,
                      macAddress: '00-00-00-00-00-00',
                      shoppingCartItemsId: res,
                      isRequired: true,
                      isExclusive: true,
                      isChargePerCharacter: true,
                    };
                    const payload_sbs = sbState.map((el: any) => {
                      return { ...el, ...Sbs_constant };
                    });

                    addSubStore({
                      shoppingCartItemsCustomFieldModel: payload_sbs,
                    });
                  }
                  setShowLoader(false);
                  showModal({
                    message: __pagesText.cart.successMessage,
                    title: 'Success',
                  });
                })
                .catch((err) => {
                  setShowLoader(false);
                });
              if (!customerId && res) {
                c_id = res;
                setCookie(__Cookie.tempCustomerId, '' + res, 'Session');
              }
              if (c_id)
                fetchCartDetails({
                  customerId: c_id,
                  isEmployeeLoggedIn,
                });
            } catch (error) {
              highLightError({ error, component: 'StartOrderModal' });
            }
            router.push('/cart/IndexNew');
          }
        }
      };
      if (sizeQtys === null || sizeQtys[0]?.qty === 0) {
        modalHandler('requiredQty');
        return;
      } else if (totalQty < minQty) {
        showModal({
          message: `Please enter quantity greater than or equal to ${minQty}.`,
          title: 'Required Quantity',
        });

        return;
      } else {
        addToCartHandler();
      }

      // router.push(`${paths.CUSTOMIZE_LOGO}/${product?.id}`);
    }
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
              {__pagesText.productInfo.msrp}
            </span>
            <span>:</span>{' '}
            <span className='ml-[4px]'>
              <Price
                value={undefined}
                prices={{
                  msrp: product ? product.msrp : 0,
                  salePrice: product ? product.salePrice : 0,
                }}
                addColon={true}
              />
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
        <Inventory productId={product.id} storeCode={''} />

        {product?.companionProductName !== null ? (
          <ProductCompanion product={product} />
        ) : null}
        <div className='mt-[15px] text-default-text bg-light-gray p-[15px] flex flex-wrap items-end justify-between gap-[10px] mb-[20px]'>
          <div className=''>
            <TotalQtySelected total={totalCheckout.totalQty} />
            <div className=''>
              <DiscountPrice
                storeCode={storeCode}
                ourCost={product?.ourCost || 0}
                msrp={product?.msrp || 0}
                imap={product?.imap || 0}
                salePrice={pricePerItem || 0}
              />
            </div>
          </div>
          <Subtotal subTotal={totalCheckout.totalPrice} />
        </div>
        <form className='mt-[15px]'>
          <div className=''>
            <button
              disabled={product?.isDiscontinue}
              onClick={(e) => {
                buyNowHandler(e, !!userId);
              }}
              className='btn btn-primary text-center btn-lg w-full'
            >
              {product?.isDiscontinue
                ? 'Discontinued'
                : userId
                ? 'ADD TO CART'
                : 'LOGIN TO SHOP NOW WITH LIVE INVENTORY'}
            </button>
          </div>
        </form>
      </div>
      {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
    </>
  );
};

export default ProductInfo;
