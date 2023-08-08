import Price from '@appComponents/Price';
import { __Cookie } from '@constants/global.constant';
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
import {
  FetchSbStoreCartDetails,
  SaveSbStreCartProductCustomFieldValues,
  _SbProductCustomField,
} from '@services/sb.service';
import { FormikErrors } from 'formik';
import React from 'react';
import { _SelectedSizeQty } from '..';

interface _Props {
  selectedSizeQtys: _SelectedSizeQty;
  customFieldValues: Record<string, string>;
  customFields: _SbProductCustomField[] | null;
  details: null | _ProductDetails;
  // colors: null | _ProductColor[];
  activeColor: _ProductColor | null;
  unitPrice: number;
  isValid: boolean;
  submitForm: () => Promise<any>;
  setSelectedSizeQtys: React.Dispatch<React.SetStateAction<_SelectedSizeQty>>;
  setValues: (
    values: React.SetStateAction<Record<string, string>>,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<Record<string, string>>>;
  errors: FormikErrors<Record<string, string>>;
}

const PD7_AddToCart: React.FC<_Props> = ({
  selectedSizeQtys,
  customFieldValues,
  customFields,
  details,
  submitForm,
  isValid,
  unitPrice,
  activeColor,
  setSelectedSizeQtys,
  setValues,
  errors,
}) => {
  const { setShowLoader, showModal, cart_UpdateItems } = useActions_v2();
  const customerId = GetCustomerId();
  const storeId = useTypedSelector_v2((state) => state.store.id);

  const numbers = {
    totalQty: selectedSizeQtys.totalQty,
    grandTotal: selectedSizeQtys.totalQty * unitPrice,
  };

  const saveCustomFieldsValue = async (
    cartId: number | null,
    location: _location,
    customerId: number,
  ): Promise<number | 'skip cart fetching'> => {
    if (!cartId || !customFields || customFields.length === 0)
      return 'skip cart fetching';

    const payload = customFields.map((item) => {
      return {
        productId: details!.id,
        shoppingCartItemsId: cartId,
        //
        storeProductCustomFieldName: item.name,
        storeProductCustomFieldValue: customFieldValues[item.name],
        customizationCharges: item.customizationCharges,
        isRequired: item.isRequired,
        isExclusive: item.isExclusive,
        isChargePerCharacter: item.isChargePerCharacter,
        //
        location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
        ipAddress: location.ip_address,
        //
        id: 0,
        rowVersion: '',
        macAddress: '00-00-00-00-00-00',
      };
    });

    return await SaveSbStreCartProductCustomFieldValues({
      shoppingCartItemsCustomFieldModel: payload,
    })
      .then(() => {
        return customerId;
      })
      .finally(() => {
        const custom: Record<string, string> = {};
        customFields.map((item) => {
          custom[item.name] = '';
        });
        setValues(custom);

        setTimeout(() => {
          submitForm();
        }, 1000);
      });
  };

  const resetColorQtys = () => {
    setSelectedSizeQtys((prev) => ({
      ...prev,
      totalQty: 0,
      sizesNqtys: prev.sizesNqtys.map((item) => ({
        ...item,
        qty: 0,
      })),
    }));
  };

  const saveTemporaryCustomerId = (id: number) => {
    setCookie(__Cookie.tempCustomerId, id.toString(), 'Session');
  };

  const fetchShoppingCartId = async (
    customerId: number | 'skip cart fetching',
  ): Promise<number | null> => {
    if (customerId === 'skip cart fetching') return null;
    if (!customerId) return null;

    saveTemporaryCustomerId(customerId);
    return await FetchSbStoreCartDetails(customerId).then((response) => {
      if (!response) throw new Error('Invalid response received from Cart API');

      //
      cart_UpdateItems({ items: response });
      resetColorQtys();

      return response[response.length - 1].shoppingCartItemsId;
    });
  };

  const saveItemsIntoCart = async (location: _location) => {
    const sizesWithQtys = selectedSizeQtys.sizesNqtys.map((item) => {
      return {
        attributeOptionId: item.sizeAttributeOptionId,
        attributeOptionValue: item.size,
        price: unitPrice,
        quantity: item.qty,
        // not to touch
        id: 0,
        code: '',
        estimateDate: new Date(),
        isEmployeeLoginPrice: 0,
      };
    });

    const payload = {
      addToCartModel: {
        customerId: +customerId,
        productId: details!.id,
        storeId: storeId,
        ipAddress: location.ip_address,

        shoppingCartItemModel: {
          price: unitPrice,
          quantity: selectedSizeQtys.totalQty,
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
        cartLogoPersonModel: sizesWithQtys.filter(
          (item) => item.quantity !== 0,
        ),
        // Static
        cartLogoPersonDetailModels: [],
        isempLogin: false,
        isForm: false,
      },
    };

    // console.log({ payload });
    await addToCart(payload)
      .then((customerId) => fetchShoppingCartId(+customerId))
      .then((cartId) => saveCustomFieldsValue(cartId, location, +customerId))
      .then((customerId) => fetchShoppingCartId(customerId))
      .then((response) => {
        if (!response) return null;
        showModal({
          title: 'Success',
          message: 'Added to cart Successfully',
        });
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
      message: 'You have not selected any quantities to add to the cart',
      title: 'Required Quantity(s)',
    });
  };

  const ifCustomFieldsAreNotFilled = () => {
    const errorsArray = Object.values(errors);

    if (errorsArray.length > 0 && errorsArray[0]) {
      showModal({
        message: errorsArray[0],
        title: 'Required Custom Fields',
      });
      return;
    }

    showModal({
      message: 'Please Enter Values In Custom Fields',
      title: 'Required Custom Fields',
    });
  };

  const addToCartHandler = async () => {
    if (selectedSizeQtys.totalQty === 0) {
      ifNoQuantitiesAdded();
      return;
    }

    if (!isValid) {
      ifCustomFieldsAreNotFilled();
      return;
    }

    setShowLoader(true);

    const location = await getLocation();
    await saveItemsIntoCart(location);
  };

  const priceToShow = () => {
    if (numbers.grandTotal === 0) {
      if (details?.salePrice) {
        return +details.salePrice;
      }
      if (details?.msrp) {
        return +details?.msrp;
      }
    }

    return numbers.grandTotal;
  };

  return (
    <div className='pt-[30px] pb-[30px] border-gray '>
      <div className='w-full flex justify-between flex-wrap items-center text-default-text relative'>
        <div className='text-sub-text font-bold'>
          You Pay
          <span className='text-quaternary ml-[10px]'>
            <Price value={priceToShow()} />
          </span>
        </div>
        <div className=''>
          {selectedSizeQtys.stockAvailable === false ? (
            <button className='btn btn-lg btn-secondary' disabled={true}>
              Out of Stock
            </button>
          ) : (
            <button
              title='Add to Cart'
              className='btn btn-lg btn-secondary'
              onClick={() => addToCartHandler()}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PD7_AddToCart;
