import { logoLocation as logoLocationEnum } from '@constants/enum';
import { cartRemoveConfirmMessage } from '@constants/global.constant';
import { commonMessage } from '@constants/successError.text';
import { CommanMessage } from '@constants/successErrorMessages.constant';
import { _CartItem, _ProductDetails } from '@definations/startOrderModal';
import { LogoDetails as SOMLogoDetails } from '@redux/slices/cart';
import { addToCart, deleteItemCart } from '@services/cart.service';
import {
  FetchColors,
  FetchInventoryById,
  FetchProductById,
} from '@services/product.service';
import {
  CaptureGTMEvent,
  generateImageUrl,
  getAddToCartObject,
} from 'helpers_v2/common.helper';
import { GetCustomerId, useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  EmpCustomQtyPriceType,
  FileToUpload,
  LogoLocationDetail,
  ShoppingCartLogoPersonViewModel,
} from './cartController.type';

const CartController = () => {
  const {
    fetchCartDetails,
    showModal,

    updateSomLogo,
    setShowLoader,
    updateCheckoutObject,
    storeProductColor,
    store_productDetails,
    setColor,
    product_storeData,
  } = useActions_v2();
  const { cart: cartData, lastUpdate: lastUpdatedAt } = useTypedSelector_v2(
    (state) => state.cart,
  );

  const { loggedIn: isEmployeeLoggedIn, isLoadingComplete } =
    useTypedSelector_v2((state) => state.employee);

  const [cartApiLoadedOnce, setCartApiLoadedOnce] = useState<{
    show: null | 'loader' | 'emptyCart' | 'dataFound';
    lastUpdatedAt: number;
  }>({ show: 'loader', lastUpdatedAt: lastUpdatedAt });
  const {
    id: storeId,
    sewOutCharges,
    isSewOutEnable,
  } = useTypedSelector_v2((state) => state.store);
  const customerId = GetCustomerId();
  const [empCustomQtyPrice, setEmpCustomQtyPrice] =
    useState<EmpCustomQtyPriceType>([]);
  const isAttributeSaparateProduct = useTypedSelector_v2(
    (state) => state.store.isAttributeSaparateProduct,
  );
  const [showEdit, setShowEdit] = useState(false);
  const [product, setProduct] = useState<_ProductDetails>();
  const [currentCartProduct, setCurrentCartProduct] = useState<_CartItem>();
  const [showAddOtf, setShowAddOtf] = useState(false);

  const getNewOptionAr = () =>
    cartData
      ? cartData.map((item) =>
          item.shoppingCartItemDetailsViewModels.map((option) => ({
            attributeOptionId: option.attributeOptionId,
            size: option.attributeOptionValue,
            qty: option.qty,
            price: option.price / option.qty,
            id: option.id,
          })),
        )
      : [];

  const fetchCartData = async () => {
    const response = await fetchCartDetails({
      customerId,
      isEmployeeLoggedIn,
    });
    return response;
  };

  //GTM event for remove_from_cart
  const captureRemoveItemEvent = (removedProductId: number) => {
    const removedProduct = cartData?.find(
      (item) => item.shoppingCartItemsId === removedProductId,
    );
    const eventPayload = {
      pageTitle: document?.title || 'Cart',
      pageCategory: 'Remove From Cart',
      visitorType: isEmployeeLoggedIn ? 'high-value' : 'low-value',
      customProperty1: '',
      event: 'remove_from_cart',
      ecommerce: {
        value: removedProduct?.totalPrice,
        currency: 'USD', // USD
        items: [
          {
            item_name: removedProduct?.productName,
            item_id: removedProduct?.sku,
            item_brand: removedProduct?.brandName,
            item_category: '',
            item_category2: '',
            item_category3: '',
            item_category4: '',
            item_variant: '',
            item_list_name: removedProduct?.productName,
            item_list_id: removedProduct?.productId,
            index: removedProduct?.productId,
            quantity: removedProduct?.totalQty,
            price: removedProduct?.totalPrice,
          },
        ],
      },
    };
    CaptureGTMEvent(eventPayload);
  };

  const removeCartItem = async (itemId: number) => {
    const confirmRes = confirm(cartRemoveConfirmMessage);
    if (confirmRes) {
      setShowLoader(true);
      const response = await deleteItemCart(itemId);
      if (response) {
        captureRemoveItemEvent(itemId);
        await fetchCartData();
      } else {
        showModal({
          message: commonMessage.somethingWentWrong,
          title: commonMessage.failed,
        });
      }
      setShowLoader(false);
    }
  };

  const employeeAmtChangeHandler = (
    event: ChangeEvent<HTMLInputElement>,
    cartProdDetailsIndex: number,
    cartProductIndex: number,
  ) => {
    const { name, value } = event.target;
    const _empCustomQtyPrice = JSON.parse(JSON.stringify(empCustomQtyPrice));
    const currentObj =
      _empCustomQtyPrice[cartProductIndex][cartProdDetailsIndex];
    _empCustomQtyPrice[cartProductIndex][cartProdDetailsIndex] = {
      ...currentObj,
      [name]: +value,
    };
    setEmpCustomQtyPrice(_empCustomQtyPrice);
  };

  const amtQtyBlurHandler = async (
    cartItemIndex: number,
    mediaBaseUrl: string,
  ) => {
    if (
      JSON.stringify(getNewOptionAr()) !== JSON.stringify(empCustomQtyPrice) &&
      cartData
    ) {
      setShowLoader(true);
      const cartProduct = cartData[cartItemIndex];
      const cartItemSelected = empCustomQtyPrice[cartItemIndex];
      if (cartProduct) {
        let totalPrice = 0;
        let totalQty = 0;
        const sizeQtys = cartItemSelected.map((res) => {
          const price = res.price * res.qty;
          totalPrice += price;
          totalQty += res.qty;

          return {
            attributeOptionId: res.attributeOptionId,
            id: res.id,
            size: res.size,
            qty: res.qty,
            price: price,
          };
        });
        if (cartProduct.shoppingCartLogoPersonViewModels) {
          const { som_logoDetails: logoDetails } = await getDetailsLogo(
            cartProduct.shoppingCartLogoPersonViewModels,
            [],
            cartProduct.totalQty,
            mediaBaseUrl,
          );
          const cartObject = await getAddToCartObject({
            userId: +customerId,
            note: '',
            storeId: storeId || 0,
            isEmployeeLoggedIn,
            sizeQtys,
            productDetails: {
              productId: cartProduct.productId,
              color: {
                altTag: cartProduct.colorImage,
                imageUrl: cartProduct.colorImage,
                name: cartProduct.attributeOptionValue,
                attributeOptionId: +cartProduct.attributeOptionId,
              },
              inventory: null,
            },
            total: {
              totalPrice,
              totalQty,
            },
            shoppingCartItemId: cartProduct.shoppingCartItemsId,
            logos: null,
            isSewOutEnable: isSewOutEnable,
            sewOutCharges: sewOutCharges,
          });

          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const customerId: any = await addToCart(cartObject);
            await fetchCartDetails({
              customerId,
              isEmployeeLoggedIn,
            });
            setShowLoader(false);
          } catch (error) {
            setShowLoader(false);
            showModal({
              message: CommanMessage.Failed,
              title: 'Failed',
            });
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const getDetailsLogo = (
    editDetails: ShoppingCartLogoPersonViewModel[],
    logoLocation: LogoLocationDetail[],
    totalQty: number,
    mediaBaseUrl: string,
  ) => {
    let isLater = false;
    const som_logoDetails: SOMLogoDetails[] = [];
    const details = editDetails.map((res) => {
      let logoStatus: string = '';
      let fileToUpload: FileToUpload = null;
      if (res.logoName === logoLocationEnum.customizeLater) {
        isLater = true;
      } else if (res.logoName === logoLocationEnum.addLogoLater) {
        logoStatus = 'later';
        som_logoDetails.push({
          date: new Date().toString(),
          location: {
            imageUrl: res.logoPositionImage,
            name: res.logoLocation || '',
            value: res.logoLocation || '',
          },
          price: res.logoPrice,
          quantity: 5,
          status: logoLocationEnum.submitLater,
        });
      } else {
        som_logoDetails.push({
          date: new Date().toString(),
          filePath: res.logoImagePath,
          location: {
            imageUrl: res.logoPositionImage,
            name: res.logoLocation || '',
            value: res.logoLocation || '',
          },
          price: res.logoPrice / totalQty,
          quantity: totalQty,
          status: logoLocationEnum.logoSubmitted,
          title: res.name,
        });
        logoStatus = logoLocationEnum.submitted;

        // eslint-disable-next-line no-useless-escape
        const filename = res.logoImagePath.replace(/^.*[\\\/]/, '');
        fileToUpload = {
          name: filename,
          type: filename.split('.').pop() as string,
          previewURL: generateImageUrl(
            res.logoImagePath,
            false,
            mediaBaseUrl,
          ) as string,
        };
      }

      const selectedLocation = {
        label: res.logoLocation || '',
        value: res.logoLocation || '',
        image: {
          url: res.logoPositionImage || '',
          alt: res.logoLocation || '',
        },
        show: true,
        price: res.logoPrice,
        cost: res.logoPrice,
      };

      return {
        logoStatus,
        fileToUpload,
        selectedLocation,
      };
    });
    if (!isLater) {
      updateSomLogo({
        details: som_logoDetails.length > 0 ? som_logoDetails : null,
        allowNextLogo: logoLocation.length > som_logoDetails.length,
        availableOptions: logoLocation
          .filter((logo) =>
            som_logoDetails.findIndex(
              (detail) => detail.location.name === logo.name,
            ) > -1
              ? 0
              : 1,
          )
          .map((logo) => ({
            image: {
              url: logo.image,
              alt: logo.image,
            },
            label: logo.name,
            value: logo.name,
            price: logo.price,
            cost: logo.cost,
          })),
      });
    }
    return {
      isLater,
      details,
      som_logoDetails,
    };
  };

  const loadProduct = (product: _CartItem) => {
    if (storeId) {
      const obj = {
        totalQty: product.totalQty,
        sizeQtys: product.shoppingCartItemDetailsViewModels.map((res) => ({
          attributeOptionId: res.attributeOptionId,
          size: res.attributeOptionValue,
          qty: res.qty,
          price: res.price,
        })),
        totalPrice: product.totalPrice,
      };

      updateCheckoutObject(obj);
      setCurrentCartProduct(product);
      FetchProductById({
        seName: product.seName,
        storeId,
        productId: 0,
      }).then((resp) => {
        if (resp) {
          const res = resp as _ProductDetails;
          store_productDetails({
            brand: {
              id: res.brandID,
              name: res.brandName,
              url: res.brandColorLogoUrl,
              url2: res.brandImage,
              url3: res.productBrandLogo || '',
              brandSEname: res.brandSEname,
            },
            product: {
              id: res?.id || null,
              name: res.name || null,
              sizes: res.sizes || '',
              sizeChart: null,
              colors: null,
              customization: res.isEnableLogolocation,
              price:
                {
                  msrp: res.msrp,
                  ourCost: res.ourCost,
                  salePrice: res.salePrice,
                } || null,
            },
          });
          setProduct(res);
          FetchColors({
            productId: res.id,
            storeId: ~~storeId,
            isAttributeSaparateProduct: isAttributeSaparateProduct,
          }).then((res) => {
            if (res) {
              const allColorAttributes = res?.map(
                (color) => color.attributeOptionId,
              );

              FetchInventoryById({
                productId: product.productId,
                attributeOptionId: allColorAttributes,
              }).then((res) => {
                product_storeData({
                  type: 'INVENTORY_LIST',
                  data: res,
                });
              });
              storeProductColor({
                colors: res,
              });
              const color = res.filter(
                (item) => item.name === product.attributeOptionValue,
              );
              setColor(color[0]);
              setProduct((pro) => {
                if (pro?.id) {
                  return {
                    ...pro,
                    colors: res,
                  };
                }
                return undefined;
              });
              setShowLoader(false);
              setShowEdit(true);
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    if (isLoadingComplete) {
      if (cartData && cartData.length > 0) {
        setEmpCustomQtyPrice(getNewOptionAr());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData, customerId]);

  useEffect(() => {
    if (cartApiLoadedOnce.show === null) {
      setCartApiLoadedOnce({ show: 'loader', lastUpdatedAt: 0 });
      fetchCartData();
      return;
    }

    if (cartData && cartData?.length > 0) {
      setCartApiLoadedOnce({
        show: 'dataFound',
        lastUpdatedAt: lastUpdatedAt,
      });
      return;
    } else {
      if (lastUpdatedAt === cartApiLoadedOnce.lastUpdatedAt) {
        return;
      }
      setCartApiLoadedOnce({ show: 'emptyCart', lastUpdatedAt: lastUpdatedAt });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedAt]);

  return {
    cartData,
    removeCartItem,
    showEdit,
    product,
    setShowEdit,
    currentCartProduct,
    empCustomQtyPrice,
    employeeAmtChangeHandler,
    amtQtyBlurHandler,
    loadProduct,
    showAddOtf,
    showLoaderOrEmptyText: cartApiLoadedOnce.show,
    setShowAddOtf,
  };
};

export default CartController;
