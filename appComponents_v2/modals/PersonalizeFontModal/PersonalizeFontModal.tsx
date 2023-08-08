import NxtImage from '@appComponents/reUsable/Image';
import { PersonalizationFont } from '@services/cart';
import { getPersonalizationFont } from '@services/cart.service';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import React, { useEffect, useState } from 'react';
import { _SizeChartModalProps } from '../modal.d';

const PersonalizeFontModal: React.FC<_SizeChartModalProps> = ({
  modalHandler,
}) => {
  const storeId = useTypedSelector_v2((state) => state.store.id);

  const { setShowLoader } = useActions_v2();
  const [personalizationFontsData, setpersonalizationFontsData] = useState<
    PersonalizationFont[]
  >([]);
  useEffect(() => {
    setShowLoader(true);
    getPersonalizationFont(storeId)
      .then((res) => {
        if (res) {
          setpersonalizationFontsData(res);
          setShowLoader(false);
        }
      })
      .catch((err) => {
        // console.log('ERROR', err);
        setShowLoader(false);
      });
  }, []);

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
                Personalization Font Examples
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
              {personalizationFontsData.map((el) => (
                <div className='mb-6 last:mb-0'>
                  <div className=''>
                    <NxtImage
                      className='w-full mx-auto'
                      src={el.image}
                      alt={el.name}
                    />
                  </div>
                  <div className='p-2 bg-gray-100'>{el.name}</div>
                </div>
              ))}
            </div>
            {/* <!-- <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200">
                  <button data-modal-toggle="PersonalizeFontsModal" type="button" className="p-2 px-3 bg-white border border-neutral-200 text-gray-500 hover:text-gray-700">Cancel</button>
                  <button data-modal-toggle="PersonalizeFontsModal" type="button" className="p-2 px-3 bg-indigo-500 hover:bg-indigo-600 text-white">Save</button>
              </div> --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizeFontModal;
