/* eslint-disable no-unused-vars */
import config from '@configs/api.config';
import { _ProductColor } from '@definations/APIs/colors.res';
import { _SizeChartTransformed } from '@definations/APIs/sizeChart.res';
import { createSlice } from '@reduxjs/toolkit';
import { updatedLogosHandler } from './product.slice.helper';
import {
  _CategoryArr_Action,
  _LogoDetail,
  _ProductStore,
  _Product_SetValues_Action,
  _Product_UpdateLogoDetails_Actions,
  _Product_UpdateSelectedValeus_Action,
  _Product_UpdateSewOutCharges,
  _UpdateProperties_Action,
} from './product.slice.types';

const selected_initiaState = {
  productId: 0,
  inventory: null,
  image: {
    id: 0,
    imageUrl: '',
    altTag: '',
  },
  color: {
    productId: 0,
    attributeOptionId: 0,
    name: '',
    imageUrl: '',
    displayOrder: 0,
    altTag: '',
    moreImages: [
      {
        displayOrder: 0,
        imageUrl: '',
        altTag: '',
        id: 0,
      },
    ],
    minQuantity: 1,
    multipleQuantity: 0,
    splitproductList: null,
  },
  sbState: [],
};

// Define the initial state using that type
const initialState: _ProductStore = {
  selected: selected_initiaState,
  product: {
    sizeChart: null,
    inventory: null,
    sizes: '',
    sku: '',
    colors: null,
    brand: null,
    id: null,
    price: null,
    discounts: null,
    name: null,
    customization: false,
    categoryName: '',
  },
  toCheckout: {
    minQty: 1,
    allowAddToCart: false,
    totalQty: 0,
    price: 0,
    availableOptions: null,
    sizeQtys: null,
    totalPrice: 0,
    additionalLogoCharge: 0,
    additionalSewOutCharges: 0,
    allowNextLogo: false,
    logo: { price: null },
    logos: null,
    lines: null,
    minQtyShouldNotBeMoreThanOne: false,
  },
  som_logos: {
    prices: null,
    details: null,
    allowNextLogo: false,
    availableOptions: null,
    additionalLogoCharge: 0,
    choosedLogoCompletionPending: null,
  },
  offlineProductSelected: '',
  categoryArr: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    product_employeeLogin: (
      state,
      { payload }: { payload: 'MinQtyToOne' | 'MinQtyToOne_CleanUp' },
    ) => {
      if (payload === 'MinQtyToOne') {
        state.toCheckout.minQtyShouldNotBeMoreThanOne = true;
        return;
      }

      if (payload === 'MinQtyToOne_CleanUp') {
        state.toCheckout.minQtyShouldNotBeMoreThanOne = false;
        return;
      }
    },

    product_storeData: (state, { payload }: _UpdateProperties_Action) => {
      if (payload.type === 'DISOCUNT_TABLE_PRICES') {
        state.product.discounts = null;
        state.product.discounts = payload.data;
        return;
      }

      if (payload.type === 'INVENTORY_LIST') {
        state.product.inventory = null;
        state.product.inventory = payload.data;
        return;
      }
    },

    product_storeCategory: (state, { payload }: _CategoryArr_Action) => {
      state.categoryArr = payload.arr;
      return;
    },

    product_setValues: (state, { payload }: _Product_SetValues_Action) => {
      if (payload.type === 'MINIMUM_QTY') {
        let minQty = payload.data.qty;

        if (state.toCheckout.minQtyShouldNotBeMoreThanOne) {
          minQty = 1;
        }

        state.toCheckout.minQty = minQty;
        return;
      }
    },

    product_UpdateSelectedValues: (
      state,
      { payload }: _Product_UpdateSelectedValeus_Action,
    ) => {
      if (payload.type === 'BASIC_PRODUCT_DETAILS') {
        state.product.sku = payload.prop?.sku || state.product.sku;
        return;
      }

      if (payload.type === 'COLOR') {
        state.selected.color = payload.data;
        return;
      }

      if (payload.type === 'RESET_ALL') {
        state.selected = selected_initiaState;
        return;
      }
    },

    product_updateSewOutCharges: (
      state,
      { payload }: _Product_UpdateSewOutCharges,
    ) => {
      if (payload.type === 'Add_Charges') {
        state.toCheckout.additionalSewOutCharges =
          state.toCheckout.additionalSewOutCharges +
          payload.logo.sewOutCharges * state.toCheckout.totalQty;
        state.toCheckout.totalPrice =
          state.toCheckout.totalPrice +
          payload.logo.sewOutCharges * state.toCheckout.totalQty;
        if (state.som_logos.details) {
          state.som_logos.details[payload.logo.index]['isSewOut'] =
            payload.logo.isSewOut;
          state.som_logos.details[payload.logo.index]['sewOutAmount'] =
            state.toCheckout.totalQty * payload.logo.sewOutCharges;
        }
      }
      if (payload.type === 'Subtract_Charges') {
        state.toCheckout.additionalSewOutCharges =
          state.toCheckout.additionalSewOutCharges -
          payload.logo.sewOutCharges * state.toCheckout.totalQty;
        state.toCheckout.totalPrice =
          state.toCheckout.totalPrice -
          payload.logo.sewOutCharges * state.toCheckout.totalQty;
        if (state.som_logos.details) {
          state.som_logos.details[payload.logo.index]['isSewOut'] =
            payload.logo.isSewOut;
          state.som_logos.details[payload.logo.index]['sewOutAmount'] = 0;
        }
      }
    },

    product_updateLogoDetails: (
      state,
      { payload }: _Product_UpdateLogoDetails_Actions,
    ) => {
      if (payload.type === 'Location_Update_Pending') {
        state.som_logos.choosedLogoCompletionPending = payload.pending;
      }

      if (payload.type === 'Upload_Logo') {
        if (payload.logo === 'Customize Later') {
          state.som_logos = {
            prices: null,
            details: null,
            allowNextLogo: false,
            availableOptions: null,
            additionalLogoCharge: state.som_logos.additionalLogoCharge,
            choosedLogoCompletionPending: null,
          };
          return;
        }

        const upcomingLogo = payload.logo;
        const oldLogos = state.som_logos.details;
        const updatedLogos = updatedLogosHandler(oldLogos, upcomingLogo);
        state.som_logos = {
          ...state.som_logos,
          allowNextLogo: true,
          details: updatedLogos,
          choosedLogoCompletionPending: null,
        };
        return;
      }

      if (payload.type === 'Remove_SOM_logo') {
        if (state.som_logos.details && payload.logoIndex) {
          const logos = [...state.som_logos.details];
          state.toCheckout.additionalSewOutCharges =
            state.toCheckout.additionalSewOutCharges -
            logos[payload.logoIndex]?.sewOutAmount;
          state.toCheckout.totalPrice =
            state.toCheckout.totalPrice -
            logos[payload.logoIndex]?.sewOutAmount;
          logos.splice(payload.logoIndex, 1);
          state.som_logos.details = logos;
        }
      }

      if (payload.type === 'Update_TotalPrice_ByLogo') {
        const price = payload.logo.price === 'FREE' ? 0 : payload.logo.price;
        const addOrSubtract = payload.logo.addOrSubtract;

        if (addOrSubtract === 'add') {
          state.toCheckout = {
            ...state.toCheckout,
            additionalLogoCharge:
              state.toCheckout.additionalLogoCharge +
              price * state.toCheckout.totalQty,
            totalPrice:
              state.toCheckout.totalPrice + price * state.toCheckout.totalQty,
            logo: {
              price: state.toCheckout.logo.price
                ? [...state.toCheckout.logo.price, payload.logo.price]
                : [payload.logo.price],
            },
          };
        }

        if (addOrSubtract === 'subtract') {
          const remainingPrices = state.toCheckout.logo.price?.filter(
            (price, index) => {
              if (index === payload.logo.index) return false;
              return true;
            },
          );

          state.toCheckout = {
            ...state.toCheckout,
            additionalLogoCharge:
              state.toCheckout.additionalLogoCharge -
              price * state.toCheckout.totalQty,
            totalPrice:
              state.toCheckout.totalPrice - price * state.toCheckout.totalQty,
            logo: {
              price: remainingPrices || null,
            },
          };
        }
        return;
      }

      if (payload.type === 'Allow_Next_Logo') {
        state.som_logos = {
          ...state.som_logos,
          allowNextLogo: payload.allow,
          choosedLogoCompletionPending: null,
        };
        return;
      }

      if (payload.type === 'Update_Location_Options') {
        const addOrRemove = payload.location.addOrRemove;

        if (addOrRemove === 'REMOVE') {
          state.som_logos.availableOptions =
            state.som_logos.availableOptions?.filter(
              (opt) => opt.value !== payload.location.value,
            ) || null;
          state.som_logos.allowNextLogo = true;
        }

        if (addOrRemove === 'ADD') {
          state.som_logos.availableOptions?.push({
            price: payload.location.price,
            cost: payload.location.cost,
            label: payload.location.label,
            value: payload.location.value,
            image: payload.location.image,
          });
          state.som_logos.allowNextLogo = true;
        }
        return;
      }

      if (payload.type === 'Reset_Locations') {
        state.som_logos = {
          prices: null,
          details: null,
          allowNextLogo: false,
          availableOptions: payload.data,
          choosedLogoCompletionPending: null,

          // Do not reset below states
          additionalLogoCharge: state.som_logos.additionalLogoCharge,
        };
        return;
      }
    },

    setColor: (
      state,
      action: {
        payload: _ProductColor;
      },
    ) => {
      if (state.product.inventory) {
        const inventoryToShowByColor =
          state.product.inventory?.inventory.filter(
            (int) => int.attributeOptionId === action.payload.attributeOptionId,
          );

        const sizesToShowByColor = state.product.inventory?.sizes.filter(
          (int) =>
            int.colorAttributeOptionId === action.payload.attributeOptionId,
        );

        if (inventoryToShowByColor) {
          state.selected.inventory = {
            inventory: inventoryToShowByColor,
            sizes: sizesToShowByColor,
          };
        }
      }

      state.selected.color = action.payload;

      const minQty = state.toCheckout.minQtyShouldNotBeMoreThanOne
        ? 1
        : action.payload.minQuantity;
      state.toCheckout.minQty = minQty;
      state.selected.productId = action.payload.productId;
    },

    setImage: (
      state,
      action: {
        payload: {
          id: number;
          imageUrl: string;
          altTag: string;
        };
      },
    ) => {
      state.selected.image = {
        ...action.payload,
        imageUrl: action.payload.imageUrl,
      };
    },

    setImage_2: (
      state,
      action: {
        payload: {
          id: number;
          imageUrl: string;
          altTag: string;
        };
      },
    ) => {
      state.selected.image = {
        ...action.payload,
        imageUrl: `${config.baseUrl.media}${action.payload.imageUrl}`,
      };
    },

    store_productDetails: (
      state,
      action: {
        payload: {
          brand: {
            id: number | null;
            name: string | null;
            url: string | null;
            url2: string | null;
            url3: string | null;
            brandSEname: string | null;
          };
          product: {
            id: number | null;
            name: string | null;
            price: {
              msrp: number;
              ourCost: number;
              salePrice: number;
            } | null;
            customization: boolean;
            colors: _ProductColor[] | null;
            sizeChart: null | _SizeChartTransformed;
            sizes: string;
            categoryName?: string;
            sku?: string;
          };
        };
      },
    ) => {
      state.product.brand = action.payload.brand;
      state.product.id = action.payload.product.id;
      state.product.name = action.payload.product.name;
      state.product.price = action.payload.product.price;
      state.product.sizes = action.payload.product.sizes;
      state.product.sizeChart = action.payload.product.sizeChart;
      state.product.colors = action.payload.product.colors;
      state.product.customization = action.payload.product.customization;
      state.product.sku = action?.payload?.product?.sku || state.product.sku;
      state.product.categoryName = action?.payload?.product?.categoryName
        ? action?.payload?.product?.categoryName
        : state.product.categoryName;
    },
    setOfflineProductSelected: (
      state,
      action: {
        payload: string;
      },
    ) => {
      state.offlineProductSelected = action.payload;
    },

    toggleNextLogoButton: (state, action: { payload: boolean }) => {
      state.toCheckout.allowNextLogo = action.payload;
    },

    updatePrice: (
      state,
      action: {
        payload: {
          price: number;
        };
      },
    ) => {
      state.toCheckout.price = action.payload.price;
    },

    clearToCheckout: (state) => {
      state.toCheckout = {
        ...state.toCheckout,
        logos: null,
        totalQty: 0,
        price: 0,
        allowAddToCart: false,
        availableOptions: null,
        sizeQtys: null,
        totalPrice: 0,
        allowNextLogo: false,
        logo: { price: null },
        lines: null,
        additionalSewOutCharges: 0,
      };
    },

    updateOptions: (
      state,
      action: {
        payload: {
          logoLocationDetailId: number;
          name: string;
          image: string;
          threeDImage: string;
          threeDLogoLocationClass: string;
          price: number;
          cost: number;
          brandGuideLines: boolean;
          addOrRemove: 'ADD' | 'REMOVE';
        };
      },
    ) => {
      const addOrRemove = action.payload.addOrRemove;

      if (addOrRemove === 'REMOVE') {
        state.toCheckout.availableOptions =
          state.toCheckout.availableOptions?.filter(
            (opt) => opt.name !== action.payload.name,
          ) || null;
        state.toCheckout.allowNextLogo = true;
      }

      if (addOrRemove === 'ADD') {
        state.toCheckout.availableOptions?.push({
          logoLocationDetailId: action.payload.logoLocationDetailId,
          name: action.payload.name,
          image: action.payload.image,
          threeDImage: action.payload.threeDImage,
          threeDLogoLocationClass: action.payload.threeDLogoLocationClass,
          price: action.payload.price,
          cost: action.payload.cost,
          brandGuideLines: action.payload.brandGuideLines,
        });
        state.toCheckout.allowNextLogo = true;
      }
    },

    updatePriceByLogo: (
      state,
      action: {
        payload: {
          type: 'add' | 'subtract';
          price: 'FREE' | number;
          index: number;
        };
      },
    ) => {
      const price = action.payload.price === 'FREE' ? 0 : action.payload.price;
      const addOrSubtract = action.payload.type;

      if (addOrSubtract === 'add') {
        state.toCheckout = {
          ...state.toCheckout,
          additionalLogoCharge:
            state.toCheckout.additionalLogoCharge +
            price * state.toCheckout.totalQty,
          totalPrice:
            state.toCheckout.totalPrice + price * state.toCheckout.totalQty,
          logo: {
            price: state.toCheckout.logo.price
              ? [...state.toCheckout.logo.price, action.payload.price]
              : [action.payload.price],
          },
        };
      }

      if (addOrSubtract === 'subtract') {
        const removedPrice = state.toCheckout.logo.price?.filter(
          (price, index) => {
            if (index === action.payload.index) return false;
            return true;
          },
        );

        state.toCheckout = {
          ...state.toCheckout,
          additionalLogoCharge:
            state.toCheckout.additionalLogoCharge -
            price * state.toCheckout.totalQty,
          totalPrice:
            state.toCheckout.totalPrice - price * state.toCheckout.totalQty,
          logo: {
            price: removedPrice || null,
          },
        };
      }
    },

    clearLogoUploadHistory: (
      state,
      action: {
        payload: {
          logoLocationDetailId: number;
          name: string;
          image: string;
          threeDImage: string;
          threeDLogoLocationClass: string;
          price: number;
          cost: number;
          brandGuideLines: boolean;
        }[];
      },
    ) => {
      state.toCheckout.availableOptions = action.payload;
    },

    updateQuantitieSingle: (
      state,
      action: {
        payload: {
          attributeOptionId: number;
          size: string;
          qty: number;
          price: number;
        };
      },
    ) => {
      let productName = action.payload.size;
      let sizeAttributeOptionid = action.payload.attributeOptionId;
      let productPrice = action.payload.price;
      let productQty = action.payload.qty;
      let totalQty = 0;
      let updatedSizeQtys;

      // IT CHECKOUT ARRAY DO NOT EXIST
      updatedSizeQtys = [
        {
          attributeOptionId: sizeAttributeOptionid,
          size: productName,
          qty: productQty,
          price: productPrice,
        },
      ];
      totalQty = productQty;

      // LOGO CHARGE
      let updateAdditionalLogoCharge = 0;
      state.toCheckout.logo?.price?.forEach((price) => {
        if (price === 'FREE') return (updateAdditionalLogoCharge += 0);
        return (updateAdditionalLogoCharge += price * totalQty);
      });

      if (totalQty >= state.toCheckout.minQty) {
        state.toCheckout.allowAddToCart = true;
      }

      if (totalQty < state.toCheckout.minQty) {
        state.toCheckout.allowAddToCart = false;
      }

      const allDiscounts = state.product.discounts;
      let foundThePrice = false;

      allDiscounts?.subRows.forEach((discount) => {
        if (foundThePrice) return;
        const bulkQtyDiscount = +discount.displayQuantity.split('+')[0];
        if (totalQty >= bulkQtyDiscount) {
          productPrice = +discount.discountPrice;
        } else {
          foundThePrice = true;
        }
      });

      // TOTAL PRICE
      let totalPrice = totalQty * productPrice + updateAdditionalLogoCharge;

      // STATE UPDATES
      state.toCheckout.additionalLogoCharge = updateAdditionalLogoCharge;
      state.toCheckout.sizeQtys = updatedSizeQtys || null;
      state.toCheckout.price = productPrice;
      state.toCheckout.totalQty = totalQty;
      state.toCheckout.totalPrice = totalPrice;
    },

    storeBuilder_updateQtys: (
      state,
      action: {
        payload: {
          attributeOptionId: number;
          size: string;
          qty: number;
          price: number;
        };
      },
    ) => {
      let productName = action.payload.size;
      let productPrice = action.payload.price;
      let productQty = action.payload.qty;
      let sizeAttributeOptionid = action.payload.attributeOptionId;
      let totalQty = 0;
      let updatedSizeQtys;

      if (state.toCheckout.sizeQtys === null) {
        // IT CHECKOUT ARRAY DO NOT EXIST
        updatedSizeQtys = [
          {
            attributeOptionId: sizeAttributeOptionid,
            size: productName,
            qty: productQty,
            price: productPrice,
          },
        ];
        totalQty = productQty;
      } else {
        // IF PRODUCT ALREDY EXISTS
        updatedSizeQtys = state.toCheckout.sizeQtys?.map((product) => {
          if (product.size === productName) {
            totalQty += productQty;
            return {
              ...product,
              qty: productQty,
            };
          }
          totalQty += product.qty;
          return product;
        });

        // IF PRODUCT DO NOT EXIST IN THE CHECKOUT ARRAY
        const doesItemExist = state.toCheckout.sizeQtys.find(
          (product) => product.size === productName,
        );

        if (!doesItemExist) {
          updatedSizeQtys.push({
            attributeOptionId: sizeAttributeOptionid,
            size: productName,
            qty: productQty,
            price: productPrice,
          });
          totalQty += productQty;
        }
      }

      if (totalQty >= state.toCheckout.minQty) {
        state.toCheckout.allowAddToCart = true;
      }

      if (totalQty < state.toCheckout.minQty) {
        state.toCheckout.allowAddToCart = false;
      }

      const allDiscounts = state.product.discounts;
      let foundThePrice = false;

      allDiscounts?.subRows.forEach((discount) => {
        if (foundThePrice) return;
        const bulkQtyDiscount = +discount.displayQuantity.split('+')[0];
        if (totalQty >= bulkQtyDiscount) {
          productPrice = +discount.discountPrice;
        } else {
          foundThePrice = true;
        }
      });

      // TOTAL PRICE
      let totalPrice = totalQty * productPrice;

      // STATE UPDATES
      state.toCheckout.sizeQtys = updatedSizeQtys || null;
      state.toCheckout.price = productPrice;
      state.toCheckout.totalQty = totalQty;
      state.toCheckout.totalPrice = totalPrice;
    },
    updateSbsStore: (
      state,
      actions: {
        payload: {
          name: string;
          value: string | number;
          charge: number;
        };
      },
    ) => {
      let sbState = state.selected.sbState;
      const doesItemExist = state.selected.sbState.findIndex(
        (el: any) => el.storeProductCustomFieldName === actions.payload.name,
      );

      if (doesItemExist < 0) {
        sbState.push({
          storeProductCustomFieldName: actions.payload.name,
          storeProductCustomFieldValue: actions.payload.value,
          customizationCharges: actions.payload.charge,
        });
      } else {
        sbState.splice(doesItemExist, 1, {
          storeProductCustomFieldName: actions.payload.name,
          storeProductCustomFieldValue: actions.payload.value,
          customizationCharges: actions.payload.charge,
        });
      }
    },
    updateQuantities: (
      state,
      action: {
        payload: {
          attributeOptionId: number;
          size: string;
          qty: number;
          price: number;
        };
      },
    ) => {
      let productName = action.payload.size;
      let sizeAttributeOptionid = action.payload.attributeOptionId;
      let productPrice = action.payload.price;
      let productQty = action.payload.qty;
      let totalQty = 0;
      let updatedSizeQtys;

      if (state.toCheckout.sizeQtys === null) {
        // IT CHECKOUT ARRAY DO NOT EXIST
        updatedSizeQtys = [
          {
            attributeOptionId: sizeAttributeOptionid,
            size: productName,
            qty: productQty,
            price: productPrice,
          },
        ];
        totalQty = productQty;
      } else {
        // IF PRODUCT ALREDY EXISTS
        updatedSizeQtys = state.toCheckout.sizeQtys?.map((product) => {
          if (product.size === productName) {
            totalQty += productQty;
            return {
              ...product,
              qty: productQty,
            };
          }
          totalQty += product.qty;
          return product;
        });

        // IF PRODUCT DO NOT EXIST IN THE CHECKOUT ARRAY
        const doesItemExist = state.toCheckout.sizeQtys.find(
          (product) => product.size === productName,
        );

        if (!doesItemExist) {
          updatedSizeQtys.push({
            attributeOptionId: sizeAttributeOptionid,
            size: productName,
            qty: productQty,
            price: productPrice,
          });
          totalQty += productQty;
        }
      }

      // LOGO CHARGE
      let updateAdditionalLogoCharge = 0;
      state.toCheckout.logo?.price?.forEach((price) => {
        if (price === 'FREE') return (updateAdditionalLogoCharge += 0);
        return (updateAdditionalLogoCharge += price * totalQty);
      });

      if (totalQty >= state.toCheckout.minQty) {
        state.toCheckout.allowAddToCart = true;
      }

      if (totalQty < state.toCheckout.minQty) {
        state.toCheckout.allowAddToCart = false;
      }

      const allDiscounts = state.product.discounts;
      let foundThePrice = false;

      allDiscounts?.subRows.forEach((discount) => {
        if (foundThePrice) return;
        const bulkQtyDiscount = +discount.displayQuantity.split('+')[0];
        if (totalQty >= bulkQtyDiscount) {
          productPrice = +discount.discountPrice;
        } else {
          foundThePrice = true;
        }
      });

      // TOTAL PRICE
      let totalPrice = totalQty * productPrice + updateAdditionalLogoCharge;

      // STATE UPDATES
      state.toCheckout.additionalLogoCharge = updateAdditionalLogoCharge;
      state.toCheckout.sizeQtys = updatedSizeQtys || null;
      state.toCheckout.price = productPrice;
      state.toCheckout.totalQty = totalQty;
      state.toCheckout.totalPrice = totalPrice;
    },
    // updateSbsState: (state, action:{
    //   payload: {

    //   }
    // }),
    updateQuantities2: (
      state,
      action: {
        payload: {
          attributeOptionId: number;
          size: string;
          qty: number;
          price: number;
          color: string;
        };
      },
    ) => {
      let productName = action.payload.size;
      let productPrice = action.payload.price;
      let sizeAttributeOptionid = action.payload.attributeOptionId;
      let productQty = action.payload.qty;
      let color = action.payload.color;
      let totalQty = 0;
      let updatedSizeQtys;
      if (state.toCheckout.sizeQtys === null) {
        // IT CHECKOUT ARRAY DO NOT EXIST
        updatedSizeQtys = [
          {
            attributeOptionId: sizeAttributeOptionid,
            size: productName,
            qty: productQty,
            price: productPrice,
            color: color,
          },
        ];
        totalQty = productQty;
      } else {
        updatedSizeQtys = state.toCheckout.sizeQtys?.map((product) => {
          if (product.size === productName && product.color === color) {
            totalQty += productQty;
            return {
              ...product,
              qty: productQty,
            };
          }
          totalQty += product.qty;
          return product;
        });
        const doesItemExist = state.toCheckout.sizeQtys.find(
          (product) => product.size === productName && product.color === color,
        );
        if (!doesItemExist) {
          updatedSizeQtys.push({
            attributeOptionId: sizeAttributeOptionid,
            size: productName,
            qty: productQty,
            price: productPrice,
            color: color,
          });
          totalQty += productQty;
        }
      } // LOGO CHARGE
      let updateAdditionalLogoCharge = 0;
      // state.toCheckout.logo?.price?.forEach((price) => { // if (price === 'FREE') return (updateAdditionalLogoCharge += 0);
      // return (updateAdditionalLogoCharge += price * totalQty); // });
      // if (totalQty >= state.toCheckout.minQty) { // state.toCheckout.allowAddToCart = true; // }
      // if (totalQty < state.toCheckout.minQty) { // state.toCheckout.allowAddToCart = false; // }
      // TOTAL PRICE
      const allDiscounts = state.product.discounts;
      let foundThePrice = false;
      allDiscounts?.subRows.forEach((discount) => {
        if (foundThePrice) return;
        const bulkQtyDiscount = +discount.displayQuantity.split('+')[0];
        if (totalQty >= bulkQtyDiscount) {
          productPrice = +discount.discountPrice;
        } else {
          foundThePrice = true;
        }
      });
      let totalPrice =
        totalQty * state.toCheckout.price + updateAdditionalLogoCharge;
      // STATE UPDATES
      state.toCheckout.additionalLogoCharge = updateAdditionalLogoCharge;
      state.toCheckout.sizeQtys = updatedSizeQtys || null;
      state.toCheckout.price = productPrice;
      state.toCheckout.totalQty = totalQty;
      state.toCheckout.totalPrice = totalPrice;
    },

    updateQuantities3: (
      state,
      action: {
        payload: {
          attributeOptionId: number;
          size: string;
          qty: number;
          price: number;
          color: string;
        };
      },
    ) => {
      let productName = action.payload.size;

      let productPrice = action.payload.price;

      let sizeAttributeOptionid = action.payload.attributeOptionId;

      let productQty = action.payload.qty;

      let color = action.payload.color;

      let totalQty = 0;

      let updatedSizeQtys;

      if (state.toCheckout.sizeQtys === null) {
        // IT CHECKOUT ARRAY DO NOT EXIST

        updatedSizeQtys = [
          {
            attributeOptionId: sizeAttributeOptionid,

            size: productName,

            qty: productQty,

            price: productPrice,

            color: color,
          },
        ];

        totalQty = productQty;
      } else {
        updatedSizeQtys = state.toCheckout.sizeQtys?.map((product) => {
          product.price = productPrice;

          if (product.size === productName && product.color === color) {
            totalQty += productQty;

            return {
              ...product,

              qty: productQty,

              price: productPrice,
            };
          }

          totalQty += product.qty;

          return product;
        });

        const doesItemExist = state.toCheckout.sizeQtys.find(
          (product) => product.size === productName && product.color === color,
        );

        if (!doesItemExist) {
          updatedSizeQtys.push({
            attributeOptionId: sizeAttributeOptionid,

            size: productName,

            qty: productQty,

            price: productPrice,

            color: color,
          });

          totalQty += productQty;
        }
      }

      // LOGO CHARGE

      let updateAdditionalLogoCharge = 0;

      const allDiscounts = state.product.discounts;

      let foundThePrice = false;

      allDiscounts?.subRows.forEach((discount) => {
        if (foundThePrice) return;

        const bulkQtyDiscount = +discount.displayQuantity.split('+')[0];

        if (totalQty >= bulkQtyDiscount) {
          productPrice = +discount.discountPrice;
        } else {
          productPrice = state.product.price?.msrp
            ? state.product.price.msrp
            : 0;

          foundThePrice = true;
        }
      });

      let totalPrice =
        totalQty * state.toCheckout.price + updateAdditionalLogoCharge;

      // STATE UPDATES

      state.toCheckout.additionalLogoCharge = updateAdditionalLogoCharge;

      state.toCheckout.sizeQtys = updatedSizeQtys || null;

      state.toCheckout.price = productPrice;

      state.toCheckout.totalQty = totalQty;

      state.toCheckout.totalPrice = totalPrice;
    },
    updateLogoDetails: (
      state,
      action: {
        payload: {
          location: {
            logoLocationDetailId: number;
            name: string;
            image: string;
            threeDImage: string;
            threeDLogoLocationClass: string;
            price: number;
            cost: number;
            brandGuideLines: boolean;
          } | null;
          url?: string;
          name?: string;
        };
      },
    ) => {
      let logos: _LogoDetail[] = [];
      const upcomingLogo = action.payload;
      const oldLogos = state.toCheckout.logos;

      if (oldLogos === null) {
        logos.push({
          no: 1,
          logo: {
            url: upcomingLogo?.url || '',
            name: upcomingLogo?.name || '',
          },
          location: upcomingLogo.location || {
            logoLocationDetailId: 0,
            name: '',
            image: '',
            threeDImage: '',
            threeDLogoLocationClass: '',
            price: 0,
            cost: 0,
            brandGuideLines: false,
          },
        });
      } else {
        logos = [...oldLogos];

        logos.push({
          no: logos.length - 1,
          logo: {
            url: upcomingLogo?.url || '',
            name: upcomingLogo?.name || '',
          },
          location: upcomingLogo.location || {
            logoLocationDetailId: 0,
            name: '',
            image: '',
            threeDImage: '',
            threeDLogoLocationClass: '',
            price: 0,
            cost: 0,
            brandGuideLines: false,
          },
        });
      }
      state.toCheckout.logos = logos;
    },
    updateCheckoutObject: (state, action) => {
      state.toCheckout.totalPrice = action.payload.totalPrice;
      state.toCheckout.totalQty = action.payload.totalQty;
      state.toCheckout.sizeQtys = action.payload.sizeQtys;
    },
    storeDetails: (
      state,
      action: {
        payload: {
          brand: {
            id: number | null;
            name: string | null;
            url: string | null;
            // for image dimension 200*35
            url2: string | null;
            url3: string | null;
            brandSEname: string | null;
          };
          product: {
            id: number | null;
            name: string | null;
            price: {
              msrp: number;
              ourCost: number;
              salePrice: number;
            } | null;
          };
        };
      },
    ) => {
      state.product.brand = action.payload.brand;
      state.product.id = action.payload.product.id;
      state.product.name = action.payload.product.name;
      state.product.price = action.payload.product.price;
    },
    storeProductColor: (
      state,
      action: {
        payload: {
          colors: _ProductColor[];
        };
      },
    ) => {
      state.product.colors = action.payload.colors;
    },
    updateLogoEditDetails: (
      state,
      action: {
        payload: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          availableOptions: any;
        };
      },
    ) => {
      state.som_logos.availableOptions = action.payload.availableOptions;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
