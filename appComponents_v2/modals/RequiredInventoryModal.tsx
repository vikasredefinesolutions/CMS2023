import { FC } from 'react';
interface props {
  data: { name: string; min: number }[];
  closeModal: () => void;
}

const RequiredInventoryModal: FC<props> = ({ closeModal, data }) => {
  return (
    <>
      {' '}
      <div
        id='requiredData'
        className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal h-full inset-0'
      >
        <div className='w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='relative px-4 w-full max-w-2xl h-fullborder border-neutral-200 inline-block h-auto'>
            <div className='relative bg-white rounded-lg shadow max-h-screen overflow-y-auto'>
              <div className='flex justify-between items-start p-5 rounded-t border-b sticky top-0 left-0 bg-white'>
                <div className='text-xl font-semibold text-gray-900 login-top-title '>
                  {'Required'}
                </div>
                <button
                  type='button'
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                  onClick={closeModal}
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
              <div className='pt-3 px-3'>
                Please Enter Minimum Quanity For Color(s).
              </div>
              <div className='p-3'>
                {data.map((el) => (
                  <div className='p-3'>{`${el.name} (${el.min})`}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequiredInventoryModal;
