import { ApprovedLogoItem } from '@definations/APIs/logo.res';
import { _LogoSteps } from '@definations/product.type';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { _AvailableLocationDetailsOtherStores } from '@redux/slices/product.slice.types';
import { getApprovedLogoWithPosition } from '@services/logo.service';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import LogoContainer from './LogoContainer';
import UploadLogoPopup from './UploadLogoPopup';

interface _props {
  setNextStep: React.Dispatch<React.SetStateAction<_LogoSteps[]>>;
  firstLogoFree: boolean;
  selectedLocation: _AvailableLocationDetailsOtherStores | null;
}

const SelectLogo: React.FC<_props> = ({
  setNextStep,
  selectedLocation,
  firstLogoFree,
}) => {
  const router = useRouter();
  const { updateOptions, updateLogoDetails } = useActions_v2();
  const [availableLogos, setAvailableLogos] = useState<ApprovedLogoItem[]>([]);
  const [selected, setSelected] = useState<null | {
    url: string;
    name: string;
    id: number;
  }>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const actionHandler = (action: 'apply' | 'cancel') => {
    if (action === 'cancel') {
      router.back();
      return;
    }

    if (selected === null) {
      setShowError(true);
      return;
    }

    if (action === 'apply') {
      if (selectedLocation !== null && selected !== null) {
        updateOptions({
          logoLocationDetailId: selectedLocation.logoLocationDetailId,
          name: selectedLocation.name,
          image: selectedLocation.image,
          threeDImage: selectedLocation.threeDImage,
          threeDLogoLocationClass: selectedLocation.threeDLogoLocationClass,
          price: selectedLocation.price,
          cost: selectedLocation.cost,
          brandGuideLines: selectedLocation.brandGuideLines,
          addOrRemove: 'REMOVE',
        });
        updateLogoDetails({
          location: selectedLocation,
          url: selected.url,
          name: selected.name,
        });
      }

      setNextStep(['SELECT_LOCATION', 'SELECT_NOW', 'DONE']);
      return;
    }
  };

  const customerId = useTypedSelector_v2((state) => state.user.id);
  const storeId = useTypedSelector_v2((state) => state.store.id);

  const fetchLogoLibrary = async () => {
    try {
      if (storeId && customerId && selectedLocation?.name) {
        await getApprovedLogoWithPosition({
          customerid: customerId,
          storeid: storeId,
          LogoPosition: selectedLocation.name,
        }).then((res) => {
          if (res) {
            setAvailableLogos(res);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLogoLibrary();
  }, [selectedLocation]);

  return (
    <>
      <hr className='mb-[15px]' />
      <div className='font-semibold mb-[15px]'>
        2. Select a Logo{' '}
        {showError && (
          <span className='text-rose-600'>{`(Please Select Logo)`}</span>
        )}
      </div>
      <div className='grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-[15px] mb-[15px]'>
        {availableLogos.map((logo, index) => {
          return (
            <LogoContainer
              firstLogoFree={firstLogoFree}
              key={index}
              id={logo.id}
              image={logo.logo}
              label={logo.logoName}
              price={selectedLocation?.cost ? selectedLocation.cost : 0}
              selected={selected}
              setSelected={(val) => {
                setSelected(val);
                if (showError) {
                  setShowError(false);
                }
              }}
            />
          );
        })}

        <div
          className='border-gray border-2 py-[10px] bg-white min-h-[230px] hover:bg-light-gray hover:border-primary cursor-pointer'
          onClick={() => setOpenModal(true)}
        >
          <div className='mb-[10px] flex flex-wrap items-center justify-center h-[120px] px-[10px]'>
            <img
              src='/assets/images/logo-addnewLogo.jpg'
              alt='add-new-Logo'
              className='max-h-[120px] w-auto mx-auto'
            />
          </div>
          <div className='text-center mb-[10px]'></div>
          <div className='text-center mb-[10px]'></div>
          <div className='text-center'></div>
        </div>
      </div>
      <div className='flex flex-wrap items-center sm:justify-start justify-center sm:mx-[-15px] mx-0'>
        <div className='mx-[15px] mb-[15px]'>
          <button
            onClick={() => actionHandler('apply')}
            className='btn btn-md btn-primary text-center btn-block uppercase'
          >
            APPLY LOGO
          </button>
        </div>
        <div className='mx-[15px] mb-[15px]'>
          <button
            onClick={() => actionHandler('cancel')}
            className='btn btn-md btn-primary text-center btn-block uppercase'
          >
            CANCEL
          </button>
        </div>
      </div>
      {openModal && (
        <UploadLogoPopup
          id={'upload'}
          setOpenModal={setOpenModal}
          logoToShow={(logo) =>
            setAvailableLogos((logos) => [
              ...logos,
              {
                id: logos.length + 1,
                customerId: customerId ? customerId : 0,
                storeId: storeId,
                logo: logo.logoPathURL || '',
                logoName: logo.name,
                locationName: selectedLocation?.name || '',
                logoPositionImage: '',
              },
            ])
          }
        />
      )}
    </>
  );
};

export default SelectLogo;
