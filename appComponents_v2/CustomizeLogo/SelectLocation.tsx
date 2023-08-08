import NxtImage from '@appComponents/reUsable/Image';
import { _LogoSteps } from '@definations/product.type';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { _AvailableLocationDetailsOtherStores } from '@redux/slices/product.slice.types';
import { useState } from 'react';

interface _props {
  setNextStep: React.Dispatch<React.SetStateAction<_LogoSteps[]>>;
  selectedLocation: _AvailableLocationDetailsOtherStores | null;
  setSelectedLocation: React.Dispatch<React.SetStateAction<any>>;
}

const SelectLocation: React.FC<_props> = ({
  setNextStep,
  selectedLocation,
  setSelectedLocation,
}) => {
  const [showError, setShowError] = useState<boolean>(false);

  const { availableOptions } = useTypedSelector_v2(
    (state) => state.product.toCheckout,
  );

  const actionHandler = (action: 'now' | 'later') => {
    if (selectedLocation === null && action !== 'later') {
      setShowError(true);
      return;
    }

    if (action === 'later') {
      setNextStep(['SELECT_LOCATION', 'SHARE_LATER']);
      return;
    }

    if (action === 'now') {
      setNextStep(['SELECT_LOCATION', 'SELECT_NOW']);
      return;
    }
  };

  return (
    <>
      <div className='font-semibold mb-[15px]'>
        1. Select a Location
        {showError && (
          <span className='text-rose-600'>{`(Please Select Location)`}</span>
        )}
      </div>
      <div className='grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-[15px] mb-[15px]'>
        {availableOptions?.map((pos) => {
          return (
            <div
              key={pos.logoLocationDetailId}
              className={`border-gray border-2 py-[10px] bg-white min-h-[230px] hover:bg-light-gray hover:border-primary ${
                selectedLocation?.name === pos.name
                  ? 'border-primary'
                  : 'border-gray-200'
              }`}
              onClick={() => {
                setSelectedLocation({
                  logoLocationDetailId: pos.logoLocationDetailId,
                  name: pos.name,
                  image: pos.image,
                  threeDImage: pos.threeDImage,
                  threeDLogoLocationClass: pos.threeDLogoLocationClass,
                  price: pos.price,
                  cost: pos.cost,
                  brandGuideLines: pos.brandGuideLines,
                });
                if (showError) {
                  setShowError(false);
                }
              }}
            >
              <div className='mb-[10px] flex flex-wrap items-center justify-center h-[120px] px-[10px]'>
                <NxtImage
                  className='max-h-[120px] w-auto mx-auto'
                  src={pos?.image || null}
                  alt={pos.name}
                />
              </div>
              <div className='text-center mt-10'>{pos.name}</div>
            </div>
          );
        })}
      </div>

      {selectedLocation && (
        <div className='flex flex-wrap items-center sm:justify-start justify-center mb-[15px] sm:mx-[-15px] mx-0'>
          <div className='mx-[15px]'>
            <button
              onClick={() => actionHandler('now')}
              className='btn btn-md btn-primary text-center btn-block uppercase'
            >
              SELECT YOUR LOGO
            </button>
          </div>
          <div className='px-[10px] py-[10px] md:w-auto w-full text-center'>
            OR
          </div>
          <div className='mx-[15px]'>
            <button
              onClick={() => actionHandler('later')}
              className='btn btn-md btn-primary text-center btn-block uppercase'
            >
              SHARE LOGO LATER
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectLocation;
