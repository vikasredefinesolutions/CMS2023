import {
  CG_STORE_CODE,
  cartRemoveConfirmMessage,
} from '@constants/global.constant';
import { commonMessage } from '@constants/successError.text';
import { _CartItem, _ProductDetails } from '@definations/startOrderModal';
import { deleteItemCart } from '@services/cart.service';
import {
  FetchColors,
  FetchInventoryById,
  FetchProductById,
} from '@services/product.service';
import { GoogleAnalyticsTrackerForCG } from 'helpers_v2/common.helper';
import { GetCustomerId, useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useState } from 'react';

const CartController = () => {
  const {
    fetchCartDetails,
    showModal,
    setShowLoader,
    updateCheckoutObject,
    storeProductColor,
    store_productDetails,
    setColor,
    product_storeData,
  } = useActions_v2();
  const { cart: cartData } = useTypedSelector_v2((state) => state.cart);

  const { loggedIn: isEmployeeLoggedIn } = useTypedSelector_v2(
    (state) => state.employee,
  );

  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const customerId = GetCustomerId();
  const isAttributeSaparateProduct = useTypedSelector_v2(
    (state) => state.store.isAttributeSaparateProduct,
  );
  const [showEdit, setShowEdit] = useState(false);
  const [product, setProduct] = useState<_ProductDetails>();
  const [currentCartProduct, setCurrentCartProduct] = useState<_CartItem>();
  const [showAddOtf, setShowAddOtf] = useState(false);

  const fetchCartData = async () => {
    const response = await fetchCartDetails({
      customerId,
      isEmployeeLoggedIn,
    });
    return response;
  };

  //GTM event for remove_from_cart
  const captureRemoveItemEvent = (removedProductId: number) => {
    if (storeId === CG_STORE_CODE) {
      const remainingProducts = cartData?.filter(
        (item) => item.shoppingCartItemsId !== removedProductId,
      );
      const payload = {
        storeId: storeId,
        customerId: customerId,
        shoppingCartItemsModel: remainingProducts?.map((item) => ({
          productId: item.productId,
          productName: item?.productName,
          colorVariants: item?.attributeOptionValue,
          price: item.totalPrice,
          quantity: item.totalQty,
        })),
      };

      GoogleAnalyticsTrackerForCG(
        'GoogleRemoveFromCartScript',
        storeId,
        payload,
      );
    }
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

  return {
    cartData,
    removeCartItem,
    showEdit,
    product,
    setShowEdit,
    currentCartProduct,
    loadProduct,
    showAddOtf,
    setShowAddOtf,
  };
};

export default CartController;
