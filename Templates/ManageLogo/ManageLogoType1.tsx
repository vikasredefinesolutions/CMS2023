import MyAccountTabs from '@appComponents/common/MyAccountTabsType1';
import NxtImage from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import moment from 'moment';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { _globalStore } from 'store.global';
import { _ManageLogoProps } from './managelogo';

let mediaBaseUrl = _globalStore.blobUrl;
const ManageLogoType1: NextPage<_ManageLogoProps> = ({ logoList }) => {
  const clientSideMediaUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );
  mediaBaseUrl = mediaBaseUrl || clientSideMediaUrl;

  const router = useRouter();
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
                {logoList?.items?.length ? (
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
                            src={logo?.logo || null}
                            alt=''
                            className='img-responsive'
                          />
                        </div>
                      </td>
                      <td className='border-b border-r border-[#ddd] p-[16px]'>
                        <div className='w-24 h-24'>
                          <NxtImage
                            src={logo?.approvedLogo || null}
                            alt=''
                            className='img-responsive'
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
                          {/* {logo.logoSize ? logo.logoSize : 'Null'} */}
                          {logo.logoSize}
                        </div>
                      </td>
                      <td className='border-b border-r border-[#ddd] p-[16px]'>
                        <div className='w-24 h-24 m-auto'>
                          <NxtImage
                            src={logo?.logoLocationImage || null}
                            alt=''
                            className=''
                          />{' '}
                        </div>
                      </td>
                      <td className='border-b border-r border-[#ddd] p-[16px]'>
                        <div className=''>{logo.logoLocation}</div>
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
                          <div
                            className='text-xs inline-block font-medium border border-green-300 bg-green-100 text-green-600 rounded-md text-center px-2.5 py-1 w-28'
                            onClick={() =>
                              router.push(
                                `/ManageLogo/CheckLogoApproved?logoId=${logo.logoId}`,
                              )
                            }
                          >
                            {__pagesText.ManageLogo.Approved}
                          </div>
                        )}
                        {logo.status === __pagesText.ManageLogo.Waiting ? (
                          <div className='text-center'></div>
                        ) : (
                          <div>
                            <div className=''>
                              {__pagesText.ManageLogo.ApprovedDate}
                            </div>
                            <div className=''>
                              {moment(logo.approvedDate).format('MMMM D, YYYY')}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className='text-center p-5 w-full ' colSpan={8}>
                      No record found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageLogoType1;
