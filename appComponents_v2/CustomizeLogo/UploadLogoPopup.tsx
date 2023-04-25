import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { UploadImage } from '@services/general.service';
import React, { useState } from 'react';

interface _props {
  id: string;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line no-unused-vars
  logoToShow: (val: {
    name: string;
    type: string;
    previewURL: string;
    logoPathURL: string | null;
  }) => void;
}

const UploadLogoPopup: React.FC<_props> = ({
  id,
  setOpenModal,
  logoToShow,
}) => {
  const [fileToUpload, setFileToUpload] = useState<{
    logoPathURL: string | null;
    name: string;
    type: string;
    previewURL: string;
  } | null>(null);
  const { showModal } = useActions_v2();
  const { id: storeId, imageFolderPath } = useTypedSelector_v2(
    (state) => state.store,
  );
  const fileReader = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files === null) return;

    try {
      const logoFileURL = await UploadImage({
        folderPath: imageFolderPath,
        files: event?.target?.files[0],
      });

      const file = {
        logoPathURL: logoFileURL,
        name: event.target.files[0].name,
        type: event.target.files[0].type,
        previewURL: URL.createObjectURL(event.target.files[0]),
      };

      setFileToUpload(file);
    } catch (error) {
      showModal({
        title: 'Error',
        message: 'Something Went Wrong. Try again, later!!!',
      });
    }
  };

  const continueHandler = () => {
    if (fileToUpload === null) {
      return;
    }
    logoToShow(fileToUpload);
    setOpenModal(false);
  };

  return (
    <>
      <div
        id='addnewlogoModal'
        aria-hidden='true'
        className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal h-full inset-0'
      >
        <div className='w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='relative px-4 w-full max-w-3xl h-full md:h-auto'>
            <div className='relative bg-white rounded-lg shadow max-h-screen overflow-y-auto'>
              <div className='flex justify-between items-start p-[20px] rounded-t border-b sticky top-0 left-0 bg-white'>
                <div className='text-title-text font-semibold'>
                  Add a new logo
                </div>
                <button
                  type='button'
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-[6px] ml-auto inline-flex items-center'
                  onClick={() => setOpenModal(false)}
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>
              <div className='p-[24px]'>
                <div className=''>
                  <p className='mb-[15px]'>
                    Accepted formats: .JPG, .GIF, .TIF, .PNG, .BMP,.TIF,.AI and
                    .EPS. Must be 10MB or less.
                  </p>
                  <p className='mb-[15px]'>
                    Please note: The new logo file is a representation of your
                    logo and can be utilized while shopping. Our design team
                    will process the file and email you a sample when it is
                    complete. You will not be charged for the logo setup until
                    you approve the sample.
                  </p>
                </div>
                <div className='flex flex-wrap'>
                  <div className='w-full sm:w-1/3'>
                    <label className='' htmlFor={id}>
                      <input
                        type='file'
                        name={id}
                        id={id}
                        // value={undefined}
                        className='sr-only'
                        onChange={fileReader}
                        accept={'image/*'}
                      />
                      {!fileToUpload?.previewURL && (
                        <div className='border border-gray bg-light-gray w-full h-full flex items-center justify-center text-center'>
                          Choose a logo file
                        </div>
                      )}
                      {fileToUpload?.previewURL && (
                        <div className='border border-gray bg-light-gray w-full h-full flex items-center justify-center text-center'>
                          <img
                            src={fileToUpload?.previewURL}
                            alt=''
                            className='img-responsive'
                          />
                        </div>
                      )}
                    </label>
                    <div className='mt-[15px]'>
                      <button
                        onClick={() => continueHandler()}
                        className='btn btn-primary w-full text-center'
                      >
                        CONTINUE
                      </button>
                    </div>
                  </div>
                  <div className='w-full sm:w-2/3'>
                    <div className='bg-light-gray sm:ml-[16px] px-[15px] py-[20px]'>
                      <div className='arrow'></div>
                      <strong className='mb-[10px] block'>Add Images</strong>
                      <p>
                        The logo setup process. JPG, GIF, PNG, BMP, TIF, AI and
                        EPS. Must be 10 MB or less.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadLogoPopup;
