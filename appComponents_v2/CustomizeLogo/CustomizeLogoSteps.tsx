import { _LogoSteps } from '@definations/product.type';
import { _AvailableLocationDetailsOtherStores } from '@redux/slices/product.slice.types';
import React, { useState } from 'react';
import SelectLocation from './SelectLocation';
import SelectLogo from './SelectLogo';
import ShareLater from './ShareLater';

// STEPS : SELECT => LATER / NOW => DONE

interface _props {
  setShowOrSelect: React.Dispatch<React.SetStateAction<'SHOW' | 'SELECT'>>;
  firstLogoFree: boolean;
  setShowLogoComponent: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomizeLogoSteps: React.FC<_props> = ({
  setShowOrSelect,
  firstLogoFree,
  setShowLogoComponent,
}) => {
  const [step, setNextStep] = useState<_LogoSteps[]>(['SELECT_LOCATION']);

  const [selectedLocation, setSelectedLocation] =
    useState<null | _AvailableLocationDetailsOtherStores>(null);

  if (step[2] === 'DONE') {
    setShowOrSelect('SHOW');
  }

  return (
    <>
      <div className=''>
        <div className='w-full px-[15px] py-[15px] bg-light-gray mb-[15px]'>
          <div className='flex items-center text-medium-text font-semibold'>
            LOGO
          </div>
        </div>
        {step[0] === 'SELECT_LOCATION' && (
          <SelectLocation
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            setNextStep={setNextStep}
          />
        )}
        {step[1] === 'SELECT_NOW' && (
          <SelectLogo
            firstLogoFree={firstLogoFree}
            setNextStep={setNextStep}
            selectedLocation={selectedLocation}
          />
        )}
        {step[1] === 'SHARE_LATER' && (
          <ShareLater
            setNextStep={setNextStep}
            selectedLocation={selectedLocation}
            setShowLogoComponent={setShowLogoComponent}
          />
        )}
      </div>
    </>
  );
};

export default CustomizeLogoSteps;
