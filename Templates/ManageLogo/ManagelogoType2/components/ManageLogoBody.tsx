import NxtImage from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import { _ManageLogoProps } from '@templates/ManageLogo/managelogo';
import { NextPage } from 'next';
import Link from 'next/link';

const ManageLogoBody: NextPage<_ManageLogoProps> = ({ logoList }) => {
  return (
    <>
      <div className='w-4/4 lg:w-4/5'>
        <div className='bg-[#ffffff]'>
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
                </tr>
                {logoList &&
                  logoList.items.map((logo) => (
                    <tr key={logo.logo} className='text-center'>
                      <td className='border-b border-r border-gray-border p-[16px]'>
                        <div className='w-24 h-24 mx-auto'>
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
                        <div className=''>{logo.productType}</div>
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
