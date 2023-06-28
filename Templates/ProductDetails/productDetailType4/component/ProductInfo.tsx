import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import { _modals } from '@appComponents/modals/modal';
import RequiredInventoryModal from '@appComponents/modals/RequiredInventoryModal';
import Price from '@appComponents/Price';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { _Selectedproduct_v2 } from '@definations/product.type';
import { GoogleAnalyticsTrackerForAllStore } from '@helpers/common.helper';
import { highLightError } from '@helpers/console.helper';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { _Product_SizeQtys } from '@redux/slices/product.slice.types';
import { addToCart } from '@services/cart.service';
import { FetchCustomerQuantityByProductId } from '@services/product.service';
import { FetchSbStoreCartDetails } from '@services/sb.service';
import { _ProductInfoProps } from '@templates/ProductDetails/Components/productDetailsComponents';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
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
  const [currentPresentQty, setCurrentPresentQty] = useState<number>(0);
  const QtyPresent = useTypedSelector_v2(
    (state) => state.product.selected.presentQty,
  );
  const discountedPrice = useTypedSelector_v2(
    (state) => state.product.toCheckout.price,
  );

  const discount = useTypedSelector_v2(
    (state) => state.product.product.discounts,
  );

  const {
    product_PresentQty,
    updateDiscountPrice,
    cart_UpdateItems,
    updatePrice,
  } = useActions_v2();

  useEffect(() => {
    if (product && userId) {
      const payload = {
        ProductId: product.id,
        ShoppingCartItemsId: 0,
        CustomerId: userId,
      };
      FetchCustomerQuantityByProductId(payload).then((res) => {
        const payload = {
          presentQty: res ? res : 0,
        };
        setCurrentPresentQty(res ? res : 0);
        product_PresentQty(payload);
      });
    }
  }, [product, userId]);

  useEffect(() => {
    const discountpayload = {
      presentQty: QtyPresent,
      price: discountedPrice,
    };
    updateDiscountPrice(discountpayload);
  }, [QtyPresent, currentPresentQty]);

  useEffect(() => {
    if (discount?.subRows[0].discountPrice) {
      updatePrice({
        price: product.isSpecialBrand
          ? customerId
            ? +discount?.subRows[0]?.discountPrice
            : product.msrp
          : +discount?.subRows[0]?.discountPrice,
      });
    } else {
      updatePrice({
        price: product.msrp,
      });
    }
  }, [userId, discount]);

  const totalCheckout = useTypedSelector_v2(
    (state) => state?.product?.toCheckout,
  );
  const { clearToCheckout, showModal, setShowLoader, fetchCartDetails } =
    useActions_v2();
  const { toCheckout, product: storeProduct } = useTypedSelector_v2(
    (state) => state.product,
  );

  const isCaptured = useRef(false);
  // const productDis = useTypedSelector_v2((state) =>
  //   console.log(state, 'discount'),
  // );
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const { colors, inventory } = useTypedSelector_v2(
    (state) => state.product.product,
  );
  const unitUnits = minQty > 1 ? 'units' : 'unit';
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
  useEffect(() => {
    clearToCheckout();
  }, []);

  const [requiredData, setRequiredData] = useState<
    { name: string; min: number }[]
  >([]);

  const decideProductPrice = (
    sizeQtys: _Product_SizeQtys[] | null,
    totalPrice: number,
    totalQty: number,
  ) => {
    if (sizeQtys) {
      if (sizeQtys[0]?.aditionalCharges && sizeQtys[0]?.aditionalCharges > 0) {
        return sizeQtys[0].price + sizeQtys[0].aditionalCharges;
      }

      return sizeQtys[0].price;
    }

    return totalPrice / totalQty;
  };

  const decideSizePrice = (sizeQty: _Product_SizeQtys): number => {
    if (sizeQty?.aditionalCharges && sizeQty.aditionalCharges > 0) {
      return sizeQty.price + sizeQty.aditionalCharges;
    }

    return sizeQty.price;
  };

  const updateCart = async () => {
    return await FetchSbStoreCartDetails(customerId!).then((response) => {
      if (!response) throw new Error('Invalid response received from Cart API');

      cart_UpdateItems({ items: response });
    });
  };

  const buyNowHandler = async (e: any, isLoggedIn: boolean) => {
    e.preventDefault();
    if (isLoggedIn === false) {
      modalHandler('login');
      return;
    }
    if (totalinvetory === 0) {
      router.push(
        `contact-request.html?name=${product.name}&sku=${product.sku}`,
      );
      return;
    }
    let GAAddToCartPaylod: any = { shoppingCartItemsModel: [] };
    const selectedProducts: _Selectedproduct_v2[] = [];
    const { totalPrice, totalQty } = toCheckout;

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
            attributeOptionId: color.attributeOptionId,
            productName: color.productName,
            productQty: sizeQtys
              ?.filter((size) => size.color == color.name)
              .reduce((acc: any, curr) => acc + curr.qty, 0),
          });
        }
      });

    // let dataArray: { name: string; min: number }[] = [];

    // selectedProducts.forEach((el) => {
    //   if (el.productQty < el.color.minQuantity) {
    //     dataArray.push({
    //       name: el.color.name,
    //       min: el.color.minQuantity,
    //     });
    //   }
    // });
    // if (dataArray.length > 0) {
    //   setRequiredData(dataArray);
    //   setOpenModal('availableInventory');
    //   return;
    // }
    const getTotalQuantityForProduct = (product: any) => {
      let qty = 0;
      product?.sizeQtys?.forEach((sizeQty: _Product_SizeQtys) => {
        qty = qty + sizeQty.qty;
      });
      return qty;
    };

    if (isLoggedIn === true) {
      const location = await getLocation();
      const addToCartHandler = async () => {
        const productToUpdate = selectedProducts.map(async (Product) => {
          const payload = {
            addToCartModel: {
              customerId: customerId!,
              productId: Product.productId,
              storeId: storeId,
              isempLogin: false,
              ipAddress: location.ip_address,
              isForm: false,
              shoppingCartItemModel: {
                id: 0,
                price: decideProductPrice(
                  Product.sizeQtys,
                  totalPrice,
                  totalQty,
                ),
                quantity: getTotalQuantityForProduct(Product),
                weight: 0,
                productType: 0,
                discountPrice: 0,
                logoTitle: Product.color.altTag,
                logogImagePath: Product.color.imageUrl,
                perQuantity: 0,
                appQuantity: 0,
                status: 2,
                discountPercentage: 0,
                productCustomizationId: 0,
                itemNotes: '',
                isEmployeeLoginPrice: false,
              },
              shoppingCartItemsDetailModels: [
                {
                  attributeOptionName: 'Color',
                  attributeOptionValue: Product.color.name,
                  attributeOptionId: Product.color.attributeOptionId,
                },
              ],
              cartLogoPersonModel: Product.sizeQtys!.map(
                (sizeQty: _Product_SizeQtys) => {
                  return {
                    id: 0,
                    attributeOptionId: sizeQty.attributeOptionId,
                    attributeOptionValue: sizeQty.size,
                    code: '',
                    price: decideSizePrice(sizeQty),
                    quantity: sizeQty.qty,
                    estimateDate: new Date(),
                    isEmployeeLoginPrice: 0,
                  };
                },
              ),
              cartLogoPersonDetailModels: [
                {
                  id: 0,
                  logoPrice: 0,
                  logoQty: 0,
                  logoFile: '',
                  logoLocation: '',
                  logoTotal: 0,
                  colorImagePath: '',
                  logoUniqueId: '',
                  price: 0,
                  logoColors: '',
                  logoNotes: '',
                  logoDate: new Date(),
                  logoNames: '',
                  digitalPrice: 0,
                  logoPositionImage: '',
                  oldFilePath: '',
                  originalLogoFilePath: '',
                  isSewOut: false,
                  sewOutAmount: 0,
                  reUsableCustomerLogo: 0,
                },
              ],
            },
          };
          GAAddToCartPaylod = {
            storeId: storeId,
            customerId: customerId,
            value: totalPrice,
            coupon: '',
            shoppingCartItemsModel: [
              ...GAAddToCartPaylod?.shoppingCartItemsModel,
              {
                productId: Product.productId,
                productName: Product.productName,
                colorVariants: Product.attributeOptionId,
                price: Product?.productQty * pricePerItem || 0,
                quantity: Product?.productQty || 0,
              },
            ],
          };
          GoogleAnalyticsTrackerForAllStore(
            'GoogleAddToCartScript',
            storeId,
            GAAddToCartPaylod,
          );

          return await addToCart(payload);
        });

        return await Promise.allSettled(productToUpdate);
      };

      if (sizeQtys === null || sizeQtys[0]?.qty === 0 || totalQty == 0) {
        showModal({
          message: `Please Select At Least Any One Color's Quantity.`,
          title: 'Required ',
        });

        return;
      }
      // else if (totalQty < minQty) {
      //   showModal({
      //     message: `Please enter quantity greater than or equal to ${minQty}.`,
      //     title: 'Required Quantity',
      //   });
      //   return;
      // }
      else {
        let dataArray: { name: string; min: number }[] = [];

        selectedProducts.forEach((el) => {
          if (el.productQty < el.color.minQuantity) {
            dataArray.push({
              name: el.color.name,
              min: el.color.minQuantity,
            });
          }
        });
        if (dataArray.length > 0) {
          setRequiredData(dataArray);
          setOpenModal('availableInventory');
          return;
        }
        setShowLoader(true);
        await addToCartHandler()
          .then(() => updateCart())
          .then(() => {
            showModal({
              message: __pagesText.cart.successMessage,
              title: 'Success',
            });
            router.push(paths.CART);
          })
          .catch((error) => {
            highLightError({ error, component: 'StartOrderModal' });
          })
          .finally(() => {
            setShowLoader(false);
          });
      }

      // router.push(`${paths.CUSTOMIZE_LOGO}/${product?.id}`);
    }
  };

  let totalinvetory = 0;
  const data = inventory?.inventory?.map((inv) => {
    totalinvetory = totalinvetory + inv.inventory;
  });
  const buttonMessage = () => {
    if (product?.isDiscontinue) {
      return __pagesText.productInfo.Discontinued;
    } else if (userId) {
      if (totalinvetory == 0) {
        return __pagesText.productInfo.capContactUs;
      } else {
        return __pagesText.productInfo.addTocart;
      }
    } else {
      return __pagesText.productInfo.checkInventoryPricing;
    }
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
            <span className='inline-block w-[90px] font-semibold'>
              {' '}
              {__pagesText.productInfo.sku}
            </span>
            <span>:</span> <span className='ml-[4px]'>{product?.sku}</span>
          </div>
          <div className='pt-[15px] text-default-text'>
            <span className='inline-block w-[90px] font-semibold'>
              {__pagesText.productInfo.msrp}
            </span>
            <span>:</span>
            <span className='ml-[4px]'>
              <Price
                value={undefined}
                prices={{
                  msrp: product ? product.msrp : 0,
                  salePrice: product ? product.salePrice : 0,
                }}
                addColon={false}
              />
            </span>
          </div>
          {!product.isSpecialBrand && (
            <div className='pt-[15px] text-default-text'>
              <span className='ml-[4px]'>
                <span className='mr-1'>
                  {__pagesText.productInfo.discountPricing.minimumOrder}
                </span>
                {` ${minQty} ${unitUnits} per color `}
              </span>
            </div>
          )}
        </div>
        {/* <DiscountPricing
          storeCode={storeCode}
          showMsrpLine={true}
          price={{
            msrp: product ? product.msrp : 0,
            salePrice: product ? product.salePrice : 0,
          }}
          showLogin={product ? !product.isDiscontinue : false}
          modalHandler={modalHandler}
        /> */}

        {userId && product.isSpecialBrand && (
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
        )}
        {userId && <Inventory productId={product.id} storeCode={storeCode} />}
        {product.companionProductName && <ProductCompanion product={product} />}
        {userId && (
          <div className='mt-[15px] text-default-text bg-light-gray p-[15px] flex flex-wrap items-end justify-between gap-[10px] mb-[20px]'>
            <div className=''>
              <TotalQtySelected total={totalCheckout.totalQty} />
              <div className=''>
                {/* {totalQty ? (
                  <p>{totalCheckout.totalPrice / totalCheckout.totalQty}</p>
                ) : (
                  <p>{pricePerItem}</p>
                )} */}
                <DiscountPrice
                  storeCode={storeCode}
                  ourCost={product?.ourCost || 0}
                  msrp={product?.msrp || 0}
                  imap={product?.imap || 0}
                  salePrice={
                    totalQty
                      ? Math.abs(
                          totalCheckout.totalPrice / totalCheckout.totalQty,
                        )
                      : pricePerItem || 0
                  }
                />
              </div>
            </div>
            <Subtotal subTotal={totalCheckout.totalPrice} />
          </div>
        )}
        <form className='mt-[15px]'>
          <div className=''>
            <button
              disabled={product?.isDiscontinue}
              onClick={(e) => {
                buyNowHandler(e, !!userId);
              }}
              className='btn btn-primary text-center btn-lg w-full'
            >
              {buttonMessage()}
            </button>
          </div>
        </form>
      </div>
      {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
      {openModal === 'availableInventory' && (
        <RequiredInventoryModal
          data={requiredData}
          closeModal={() => modalHandler(null)}
        />
      )}
      {openModal === 'forgot' && <ForgotModal modalHandler={modalHandler} />}
    </>
  );
};

export default ProductInfo;
