import { _Store } from '@configs/page.config';
import { SIMPLI_SAFE_CODE, __Cookie } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { _ProductColor } from '@definations/APIs/colors.res';
import { _ProductDetails } from '@definations/APIs/productDetail.res';
import { setCookie } from '@helpers/common.helper';
import getLocation, { _location } from '@helpers/getLocation';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { addToCart } from '@services/cart.service';
import { FetchSbStoreCartDetails } from '@services/sb.service';
import { useRouter } from 'next/router';

interface _SelectedSizeQty {
  colorAttributeOptionId: number; // colorId,
  totalQty: number;
  size: string;
  sizeAttributeOptionId: number;
  minQty: number;
  stockAvailable: boolean;
}

interface _Props {
  details: _ProductDetails;
  selectedSizeQty: _SelectedSizeQty;
  setSelectedSizeQty: React.Dispatch<React.SetStateAction<_SelectedSizeQty>>;
  activeColor: _ProductColor;
  setActiveColor: React.Dispatch<React.SetStateAction<_ProductColor>>;
}
const BuyNowHandlerType8: React.FC<_Props> = ({
  selectedSizeQty,
  activeColor,
  setActiveColor,
  details,
}) => {
  const router = useRouter();
  const { showModal, setShowLoader, cart_UpdateItems } = useActions_v2();
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const customerId = GetCustomerId();
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);

  const fetchShoppingCartId = async (
    customerId: number,
  ): Promise<number | null> => {
    if (!customerId) return null;

    setCookie(__Cookie.tempCustomerId, '' + customerId, 'Session');
    return await FetchSbStoreCartDetails(customerId).then((response) => {
      if (!response) throw new Error('Invalid response received from Cart API');

      //
      cart_UpdateItems({ items: response });
      // resetColorQtys();

      return response[response.length - 1].shoppingCartItemsId;
    });
  };

  const saveItemsIntoCart = async (location: _location) => {
    const sizesWithQtys = {
      attributeOptionId: selectedSizeQty.sizeAttributeOptionId,
      attributeOptionValue: selectedSizeQty.size,
      price: details!.msrp,
      quantity: selectedSizeQty.totalQty,
      // not to touch
      id: 0,
      code: '',
      estimateDate: new Date(),
      isEmployeeLoginPrice: 0,
    };

    const payload = {
      addToCartModel: {
        customerId: +customerId,
        productId: details!.id,
        storeId: storeId,
        ipAddress: location.ip_address,

        shoppingCartItemModel: {
          price: details!.salePrice,
          quantity: selectedSizeQty.totalQty,
          // color image details don't get confused with name
          logoTitle: activeColor!.name,
          logogImagePath: activeColor!.imageUrl,
          // not to touch
          id: 0,
          weight: 0,
          productType: 0,
          discountPrice: 0,
          perQuantity: 0,
          appQuantity: 0,
          status: 0,
          discountPercentage: 0,
          productCustomizationId: 0,
          itemNotes: '',
          isEmployeeLoginPrice: false,
        },
        shoppingCartItemsDetailModels: [
          {
            attributeOptionName: 'Color',
            attributeOptionValue: activeColor!.name,
            attributeOptionId: activeColor!.attributeOptionId,
          },
        ],
        cartLogoPersonModel: [sizesWithQtys],
        // Static
        cartLogoPersonDetailModels: [],
        isempLogin: false,
        isForm: false,
      },
    };

    // console.log({ payload });
    await addToCart(payload)
      .then((customerId) => fetchShoppingCartId(+customerId))
      .then((response) => {
        if (!response) return null;
        showModal({
          title: 'Success',
          message: 'Added to cart Successfully',
        });

        router.push(paths.CART);
      })
      .catch((error) => {
        console.log('AddToCart Error ==>', error);
        showModal({
          title: 'Error',
          message: 'Something went wrong',
        });
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  const ifNoQuantitiesAdded = () => {
    showModal({
      message:
        storeCode === SIMPLI_SAFE_CODE
          ? 'Please select any one size.'
          : `Please Select One Size.`,
      title: 'Required Size',
    });
  };

  const addToCartHandler = async () => {
    if (selectedSizeQty.totalQty === 0) {
      ifNoQuantitiesAdded();
      return;
    }

    if (selectedSizeQty.totalQty > 1 && storeCode === SIMPLI_SAFE_CODE) {
      setShowLoader(false);
      showModal({
        title: 'Information',
        message: `Employees may redeem only 1 piece of apparel.`,
      });

      return;
    }
    if (selectedSizeQty.totalQty < selectedSizeQty.minQty) {
      setShowLoader(false);
      showModal({
        title: 'Required',
        message: `The minimum order for this color is ${selectedSizeQty.minQty} pieces. Please increase your quantity and try again.`,
      });

      return;
    }

    setShowLoader(true);

    const location = await getLocation();
    await saveItemsIntoCart(location);
  };

  return (
    <>
      <div className='w-full text-left flex justify-end  cursor-pointer '>
        <button
          onClick={addToCartHandler}
          className='btn btn-xl btn-secondary w-full text-center'
        >
          {storeCode === _Store.type5
            ? __pagesText.productInfo.addTocart
            : __pagesText.productInfo.buyNow}
        </button>
      </div>
    </>
  );
};

export default BuyNowHandlerType8;
