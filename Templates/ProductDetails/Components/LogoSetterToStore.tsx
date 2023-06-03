import { logoLocation as LOGOlocation } from '@constants/enum';

import { _LogoLocationDetail } from '@definations/APIs/productDetail.res';
import { _CartItem } from '@services/cart';
import {
  FileToUpload,
  LogoStatus,
} from '@templates/ProductDetails/Components/productDetailsComponents';
import { generateImageUrl } from 'helpers_v2/common.helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { _SOM_LogoDetails } from 'redux_v2/slices/product.slice.types';
import { _globalStore } from 'store.global';
let mediaBaseUrl = _globalStore.blobUrl; // for server side

const LogoSetterToStore = () => {
  const { updateSomLogo } = useActions_v2();
  const clientSideMediaBaseUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );
  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;

  const getDetailsLogo = (
    editDetails: _CartItem['shoppingCartLogoPersonViewModels'] | null,
    logoLocation: _LogoLocationDetail[],
    totalQty: number,
  ) => {
    let isLater = false;
    const som_logoDetails: _SOM_LogoDetails[] = [];
    const details = editDetails?.map((res) => {
      let logoStatus: LogoStatus = '';
      let fileToUpload: FileToUpload = null;
      if (res.logoName === 'Customize Later') {
        isLater = true;
      } else if (res.logoName === 'Add Logo Later') {
        logoStatus = 'later';
        som_logoDetails.push({
          date: new Date().toString(),
          location: {
            imageUrl: res.logoPositionImage,
            name: res.logoLocation || '',
            value: res.logoLocation || '',
          },
          price: res.logoPrice ? res.logoPrice / totalQty : 0,
          quantity: totalQty,
          status: LOGOlocation.submitLater,
          isSewOut: res.isSewOut,
          sewOutAmount: res.sewOutAmount,
          reUsableCustomerLogo: res.reUsableCustomerLogo,
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
          price: res.logoPrice ? res.logoPrice / totalQty : 0,
          quantity: totalQty,
          status: LOGOlocation.submitted,
          title: res.name,
          isSewOut: res.isSewOut,
          sewOutAmount: res.sewOutAmount,
          reUsableCustomerLogo: res.reUsableCustomerLogo,
        });
        logoStatus = 'submitted';

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
        price: res.logoPrice ? res.logoPrice / totalQty : 0,
        cost: res.logoPrice ? res.logoPrice / totalQty : 0,
      };

      return {
        logoStatus,
        fileToUpload,
        selectedLocation,
        isSewOut: res.isSewOut,
        sewOutAmount: res.sewOutAmount,
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

  return {
    getDetailsLogo,
  };
};

export default LogoSetterToStore;
