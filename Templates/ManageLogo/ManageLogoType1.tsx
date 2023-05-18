import MyAccountTabs from '@appComponents/common/MyAccountTabsType1';
import NxtImage from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import moment from 'moment';
import { NextPage } from 'next';
import Link from 'next/link';
import { _ManageLogoProps } from './managelogo';

const ManageLogoType1: NextPage<_ManageLogoProps> = ({ logoList }) => {
  // console.log('logo list', logoList);

  return (
    <>
      <MyAccountTabs />
      <section className='container mx-auto mt-[50px] mb-[50px]'>
        <div className='bg-[#ffffff]'>
          <div className='overflow-auto max-h-screen border border-[#ddd]'>
            <table className='table table-auto border-[#ddd] w-full text-default-text text-[#000]'>
              <tbody>
                <tr>
                  <th
                    className='bg-[#f5f5f6] text-center py-[14px] border-r border-[#ddd]'
                    align='center'
                  >
                    {__pagesText.ManageLogo.Logo}
                  </th>
                  <th
                    className='bg-[#f5f5f6] text-center py-[14px] border-r border-[#ddd]'
                    align='center'
                  >
                    {__pagesText.ManageLogo.ApprovedLogo}
                  </th>
                  <th
                    className='bg-[#f5f5f6] text-center py-[14px] border-r border-[#ddd]'
                    align='center'
                  >
                    {__pagesText.ManageLogo.LogoName}
                  </th>
                  <th
                    className='bg-[#f5f5f6] text-center py-[14px] border-r border-[#ddd]'
                    align='center'
                  >
                    {__pagesText.ManageLogo.LogoNumber}
                  </th>
                  <th
                    className='bg-[#f5f5f6] text-center py-[14px] border-r border-[#ddd]'
                    align='center'
                  >
                    {__pagesText.ManageLogo.LogoSize}
                  </th>
                  <th
                    className='bg-[#f5f5f6] text-center py-[14px] border-r border-[#ddd]'
                    align='center'
                  >
                    {__pagesText.ManageLogo.ProductType}
                  </th>
                  <th
                    className='bg-[#f5f5f6] text-center py-[14px] border-r border-[#ddd]'
                    align='center'
                  >
                    {__pagesText.ManageLogo.LogoPosition}
                  </th>
                  <th
                    className='bg-[#f5f5f6] text-center py-[14px] border-r border-0'
                    align='center'
                  >
                    {__pagesText.ManageLogo.Status}
                  </th>
                </tr>
                {logoList &&
                  logoList.items.map((logo) => (
                    <tr
                      key={logo.logo}
                      className={`text-center ${
                        logo.logo == '' ? 'hidden' : ''
                      }`}
                    >
                      <td className='border-b border-r border-[#ddd] p-[16px]'>
                        <div className='w-24 h-24 mx-auto'>
                          <NxtImage
                            src={logo.logo}
                            alt=''
                            className='img-responsive max-h-[100px]'
                          />
                        </div>
                      </td>
                      <td className='border-b border-r border-[#ddd] p-[16px]'>
                        <div className='w-24 h-24'>
                          <NxtImage
                            src={''}
                            alt=''
                            className='img-responsive max-h-[100px]'
                          />
                        </div>
                      </td>
                      <td className='border-b border-r border-[#ddd] p-[16px]'>
                        <div className=''>{logo.logoName}</div>
                      </td>
                      <td className='border-b border-r border-[#ddd] p-[16px]'>
                        <div className=''>
                          {logo.logoNumber ? logo.logoNumber : 'Pending'}
                        </div>
                      </td>
                      <td className='border-b border-r border-[#ddd] p-[16px]'>
                        <div className=''>
                          {logo.logoSize ? logo.logoSize : 'Null'}
                        </div>
                      </td>
                      <td className='border-b border-r border-[#ddd] p-[16px]'>
                        <div className=''>{logo.productType}</div>
                      </td>
                      <td className='border-b border-r border-[#ddd] p-[16px]'>
                        <div className='overflow-hidden'>
                          <NxtImage
                            src={logo.logoLocationImage}
                            alt=''
                            className='max-h-[100px]'
                          />{' '}
                        </div>
                      </td>
                      <td className='border-b border-r border-[#ddd] p-[16px]'>
                        {logo.status === __pagesText.ManageLogo.Waiting ? (
                          <Link
                            href={`/ManageLogo/CheckLogoApproved?logoId=${logo.logoId}`}
                            title=''
                          >
                            {__pagesText.ManageLogo.Waiting}
                          </Link>
                        ) : (
                          <div className='text-xs inline-block font-medium border border-green-300 bg-green-100 text-green-600 rounded-md text-center px-2.5 py-1 w-28'>
                            {__pagesText.ManageLogo.Approved}
                          </div>
                        )}
                        {logo.status === __pagesText.ManageLogo.Waiting ? (
                          <div className='text-center'></div>
                        ) : (
                          <>
                            <div className=''>
                              {__pagesText.ManageLogo.ApprovedDate}
                            </div>
                            <div className=''>
                              {moment(logo.approvedDate).format('MMMM D, YYYY')}
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageLogoType1;
