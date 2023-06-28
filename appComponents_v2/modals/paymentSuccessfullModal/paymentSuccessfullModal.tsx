import { paths } from '@constants/paths.constant';
import { useRouter } from 'next/router';

/* eslint-disable no-unused-vars */
interface _modalHandlerProps {
  setmodalopen: (val: boolean) => void;
}
const ConfirmModal: React.FC<_modalHandlerProps> = ({ setmodalopen }) => {
  const router = useRouter();
  return (
    <>
      <div
        id='Login1Modal'
        aria-hidden='true'
        className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0 text-default-text'
      >
        {' '}
        <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
          <div className='relative px-[16px] w-full max-w-xl h-full md:h-auto'>
            <div className='relative bg-[#ffffff] shadow max-h-screen overflow-y-auto h-full rounded-md'>
              <div className='flex justify-between items-center p-[15px] rounded-t border-b sticky top-0 left-0 bg-[#ffffff] z-50'>
                <div className='font-[600] text-medium-text'>
                  Payment Successfull
                </div>
                <button
                  type='button'
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] p-[6px] ml-auto inline-flex items-center'
                  onClick={() => {
                    router.push({
                      pathname: paths.HOME,
                      query: '',
                    });
                    setmodalopen(false);
                  }}
                >
                  <svg
                    className='w-[24px] h-[24px]'
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
              <div className='my-[25px] flex flex-wrap justify-center gap-2.5 '>
                You have already completed the payment.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
