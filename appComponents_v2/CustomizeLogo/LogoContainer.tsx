import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';
import { _globalStore } from 'store.global';

interface _props {
  firstLogoFree: boolean;
  id: number;
  image: string;
  label: string;
  price: number;
  selected: {
    url: string;
    name: string;
    id: number;
  } | null;
  setSelected: React.Dispatch<
    React.SetStateAction<{
      url: string;
      name: string;
      id: number;
    } | null>
  >;
}
let mediaBaseUrl = _globalStore.blobUrl;
const LogoContainer: React.FC<_props> = ({
  firstLogoFree,
  id,
  image,
  label,
  price,
  selected,
  setSelected,
}) => {
  const store = useTypedSelector_v2((state) => state.store);
  const logo = useTypedSelector_v2((state) => state.product.toCheckout.logos);
  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;

  return (
    <div
      className={`border-gray border-2 py-[10px] bg-white min-h-[230px] hover:bg-light-gray hover:border-primary cursor-pointer ${
        selected?.id === id ? 'border-primary' : 'border-gray-200'
      }`}
      onClick={() =>
        setSelected({
          url: image,
          name: label,
          id: id,
        })
      }
    >
      <div className='mb-[10px] flex flex-wrap items-center justify-center h-[120px] px-[10px]'>
        <img
          src={`${mediaBaseUrl}${image}`}
          className='max-h-[120px] w-auto mx-auto'
        />
      </div>
      <div className='text-center mb-[10px]'>Logo #{id}</div>
      <div className='text-center mb-[10px]'>In Process</div>
      <div className='text-center'>
        Estimated Cost: {logo === null && firstLogoFree ? 'FREE' : price}
      </div>
    </div>
  );
};

export default LogoContainer;
