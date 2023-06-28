import NxtImage from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  DeleteLogo,
  SetLogoDefault,
  UploadImage,
} from '@services/general.service';
import { UploadLogoWithDetails } from '@services/logo.service';
import { _ManageLogoProps } from '@templates/ManageLogo/managelogo';
import { NextPage } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';

const ManageLogoBody: NextPage<_ManageLogoProps> = ({
  logoList,
  fetchLogoDetails,
}) => {
  const { customer, id: customerId } = useTypedSelector_v2(
    (state) => state.user,
  );
  const { imageFolderPath } = useTypedSelector_v2((state) => state.store);
  const { showModal, setShowLoader } = useActions_v2();
  const [fileToUpload, setFileToUpload] = useState<{
    logoPathURL: string | null;
    name: string;
    type: string;
    previewURL: string;
    file: File | null;
  } | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files === null) {
      return setFileToUpload(null);
    }
    const file = {
      logoPathURL: '',
      name: event.target.files[0].name,
      type: event.target.files[0].type,
      previewURL: URL.createObjectURL(event.target.files[0]),
      file: event?.target?.files[0],
    };

    setFileToUpload(file);
  };

  const uploadLogo = async () => {
    try {
      if (fileToUpload?.file) {
        setShowLoader(true);
        const uploadedpath = await UploadImage({
          folderPath: imageFolderPath,
          files: fileToUpload?.file,
        });
        if (uploadedpath)
          await UploadLogoWithDetails({
            id: 0,
            customerId: customerId || 0,
            logo: uploadedpath,
            logoName: fileToUpload.name,
            description: '',
            logoPositionImage: '',
            orderedCartLogoDetailId: 0,
          });
        fetchLogoDetails();
        setFileToUpload(null);
      }
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);

      showModal({
        title: 'Error',
        message: 'Something Went Wrong. Try again, later!!!',
      });
    }
  };

  const handleDeleteLogo = async (logoId: number) => {
    try {
      setShowLoader(true);
      await DeleteLogo(logoId, customerId || 0);
      fetchLogoDetails();
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      showModal({
        title: 'Error',
        message: 'Something Went Wrong. Try again, later!!!',
      });
    }
  };

  const handleLogoUdpate = async (logoId: number, isDefault: boolean) => {
    try {
      setShowLoader(true);
      await SetLogoDefault(logoId, isDefault, customerId || 0);
      fetchLogoDetails();
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      showModal({
        title: 'Error',
        message: 'Something Went Wrong. Try again, later!!!',
      });
    }
  };

  console.log('--reaching logos--', logoList);
  return (
    <>
      <div className='w-4/4 lg:w-4/5'>
        <div className='bg-[#ffffff]'>
          <div className='mb-[10px] text-default-text'>
            <div className='font-bold mb-[5px]'>Name</div>
            <span className=''>
              {customer?.firstname} {customer?.lastName}
            </span>
          </div>

          <div className='mb-[10px] text-default-text'>
            <div className='mb-[5px] font-bold'>Upload Image</div>
            {!fileToUpload?.file && (
              <span className=''>
                <input
                  type='file'
                  name='FileUpload1'
                  id='FileUpload1'
                  className='mt-[5px]'
                  onChange={handleFileUpload}
                  accept={'image/*'}
                />
              </span>
            )}
          </div>

          <div className='my-[10px]'>
            <button
              type='button'
              disabled={fileToUpload?.file ? false : true}
              className='btn btn-primary'
              onClick={uploadLogo}
            >
              Upload Image
            </button>{' '}
            {fileToUpload?.file && (
              <span className='ml-3'>{fileToUpload?.name}</span>
            )}
          </div>
          <div className='overflow-auto max-h-screen border border-gray-border'>
            <table className='table table-auto border-gray-border w-full text-default-text'>
              <tbody>
                <tr>
                  <th className='bg-[#f5f5f6] text-center p-[16px] border-r border-gray-border'>
                    {__pagesText.ManageLogo.Logo}
                  </th>
                  <th className='bg-[#f5f5f6] text-center p-[16px] border-r border-gray-border'>
                    {__pagesText.ManageLogo.LogoName}
                  </th>
                  <th className='bg-[#f5f5f6] text-center p-[16px] border-r border-gray-border'>
                    {__pagesText.ManageLogo.LogoNumber}
                  </th>
                  <th className='bg-[#f5f5f6] text-center p-[16px] border-r border-gray-border'>
                    {__pagesText.ManageLogo.ProductType}
                  </th>
                  <th className='bg-[#f5f5f6] text-center p-[16px] border-r border-gray-border'>
                    {__pagesText.ManageLogo.LogoPosition}
                  </th>
                  <th
                    className='bg-[#f5f5f6] text-center p-[16px] border-r border-gray-border'
                    align='center'
                  >
                    &nbsp;
                  </th>
                </tr>
                {logoList &&
                  logoList.items.map((logo) => (
                    <tr key={logo.logo} className='text-center'>
                      <td className='border-b border-r border-gray-border p-[16px]'>
                        <div className='w-24 h-24 mx-auto flex justify-center items-center'>
                          <Link
                            href={`/ManageLogo/CheckLogoApproved?logoId=${logo.logoId}`}
                          >
                            <a className='cursor-pointer w-full'>
                              <NxtImage
                                src={logo.logo}
                                alt=''
                                className='img-responsive max-h-[100px]'
                              />
                            </a>
                          </Link>
                        </div>
                      </td>
                      <td className='border-b border-r border-gray-border p-[16px]'>
                        <div className=''>{logo.logoName}</div>
                      </td>
                      <td className='border-b border-r border-gray-border p-[16px]'>
                        <div className=''>
                          {logo.logoNumber ? logo.logoNumber : 'Pending'}
                        </div>
                      </td>

                      <td className='border-b border-r border-gray-border p-[16px]'>
                        <div className='overflow-hidden'>
                          <NxtImage
                            src={logo.logoLocationImage}
                            alt=''
                            className='max-h-[100px]'
                          />
                        </div>
                      </td>
                      <td className='border-b border-r border-gray-border p-[16px]'>
                        <div className=''>{logo.logoLocation}</div>
                      </td>
                      <td
                        className='border-b border-r border-gray-border text-left p-[10px] w-[250px]'
                        valign='middle'
                        align='center'
                      >
                        <button
                          type='button'
                          className='btn btn-sm btn-primary'
                          onClick={() =>
                            handleLogoUdpate(logo.logoId, !logo.isDefault)
                          }
                        >
                          {logo.isDefault
                            ? __pagesText.ManageLogo.removeAsDefault
                            : __pagesText.ManageLogo.setAsDefault}
                        </button>{' '}
                        <button
                          type='button'
                          className='btn btn-sm btn-secondary text-default-text'
                          onClick={() => handleDeleteLogo(logo.logoId)}
                        >
                          {__pagesText.ManageLogo.delete}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageLogoBody;
