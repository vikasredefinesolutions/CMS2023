import NxtImage from '@appComponents/reUsable/Image';
import { _modals } from '@definations/product.type';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';
import { _globalStore } from 'store.global';

interface _Props {
  selectedFontImage: string;
  selectedFont: string;
  modalHandler(val: null | _modals): void;
}

const SelectedFontZoom: React.FC<_Props> = ({
  modalHandler,
  selectedFontImage,
  selectedFont,
}) => {
  let mediaBaseUrl = _globalStore.blobUrl; // for server side
  const clientSideMediaBaseUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );
  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;
  return (
    <div
      id='PersonalizeFontsModal'
      className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal h-full inset-0'
    >
      <div className='w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
        <div className='relative px-4 w-full max-w-3xl h-full md:h-auto'>
          <div className='relative bg-white rounded-lg shadow max-h-screen overflow-y-auto'>
            <div className='flex justify-between items-start p-5 rounded-t border-b sticky top-0 left-0 bg-white z-40'>
              <div className='text-xl font-semibold text-gray-900 lg:text-2xl'>
                {selectedFont}
              </div>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                onClick={() => modalHandler(null)}
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
            </div>
            <div className='p-6'>
              <NxtImage
                className='w-full mx-auto'
                src={selectedFontImage}
                alt={selectedFont}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedFontZoom;
