import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useEffect } from 'react';

const SuccessErrorModal = () => {
  const modal = useTypedSelector_v2((state) => state.success);
  const { hideModal } = useActions_v2();
  useEffect(() => {
    if (modal.showModal) {
      setTimeout(() => {
        hideModal();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal.showModal]);

  return (
    <div
      id='LoginModal'
      style={{ display: modal.showModal ? 'unset' : 'none' }}
      className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal h-full inset-0'
    >
      <div className='w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
        <div className='relative px-4 w-full max-w-2xl h-fullborder border-neutral-200 inline-block h-auto'>
          <div className='relative bg-white rounded-lg shadow max-h-screen overflow-y-auto'>
            <div className='flex justify-between items-start p-5 rounded-t border-b sticky top-0 left-0 bg-white'>
              <div className='text-xl font-semibold text-gray-900 lg:text-2xl login-top-title '>
                {modal.title}
              </div>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                onClick={() => hideModal()}
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
            <div className='p-3'>
              <div
                className={`mb-4 text-center ${
                  modal.title === 'Error' ? 'text-rose-500' : ''
                } ${modal.title.includes('error') ? 'text-rose-500' : ''}`}
              >
                {modal.message}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessErrorModal;
