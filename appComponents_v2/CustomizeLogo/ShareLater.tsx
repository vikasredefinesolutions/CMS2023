import { _LogoSteps } from '@definations/product.type';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { _AvailableLocationDetailsOtherStores } from '@redux/slices/product.slice.types';
import React from 'react';
interface _props {
  setNextStep: React.Dispatch<React.SetStateAction<_LogoSteps[]>>;
  selectedLocation: _AvailableLocationDetailsOtherStores | null;
  setShowLogoComponent: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareLater: React.FC<_props> = ({
  setNextStep,
  selectedLocation,
  setShowLogoComponent,
}) => {
  const { clearToCheckout } = useActions_v2();
  const { updateOptions, updateLogoDetails } = useActions_v2();
  const { price: pricePerItem } = useTypedSelector_v2(
    (state) => state.product.toCheckout,
  );
  const actionHandler = (action: 'CONTINUE' | 'CANCEL') => {
    if (action === 'CANCEL') {
      setShowLogoComponent(false);
      clearToCheckout(pricePerItem);
      return;
    }

    if (action === 'CONTINUE') {
      if (selectedLocation !== null) {
        updateOptions({
          logoLocationDetailId: selectedLocation?.logoLocationDetailId,
          name: selectedLocation?.name,
          image: selectedLocation?.image,
          threeDImage: selectedLocation?.threeDImage,
          threeDLogoLocationClass: selectedLocation?.threeDLogoLocationClass,
          price: selectedLocation?.price,
          cost: selectedLocation?.cost,
          brandGuideLines: selectedLocation?.brandGuideLines,
          addOrRemove: 'REMOVE',
        });
        updateLogoDetails({
          location: selectedLocation,
          url: '',
          name: '',
        });
      }

      setNextStep(['SELECT_LOCATION', 'SHARE_LATER', 'DONE']);
      return;
    }
  };

  return (
    <div className='p-4'>
      <div className='text-lg md:text-xl lg:text-small-title font-small-title text-color-small-title mb-2'>
        2. Share Logo Later
      </div>
      <div className=''>
        <div className=''>
          No Worries! One of our gear guides will be contacting you after your
          order has been submitted. We can finalize decoration details at that
          time.
        </div>
      </div>
      <div className='mt-3'>
        <button
          onClick={() => actionHandler('CONTINUE')}
          className='btn btn-primary mr-1'
        >
          CONTINUE
        </button>
        <button
          onClick={() => actionHandler('CANCEL')}
          className='btn btn-primary'
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default ShareLater;
