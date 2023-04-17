import { NextPage } from 'next';
import { _ManageLogoProps } from './managelogo';
import { __pagesText } from '@constants/pages.text';
import { __pagesConstant } from '@constants/pages.constant';
import NxtImage from '@appComponents/reUsable/Image';
import Link from 'next/link';

const ManageLogoType2: NextPage<_ManageLogoProps> = ({ logoList }) => {
  return (
    <>
      <section className='pt-[40px]'>
        <div className='text-2xl-text text-center'>
          {__pagesText.ManageLogo.Heading}
        </div>
      </section>
      <section className='container mx-auto mt-[50px] mb-[50px]'>
        <div className='block lg:flex lg:space-x-10'>
          <div className='w-4/4 lg:w-1/5 pb-10'></div>
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
        </div>
      </section>
    </>
  );
};

export default ManageLogoType2;
