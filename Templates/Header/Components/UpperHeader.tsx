import { __LocalStorage } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { _AnnouncementRow } from '@definations/header.type';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import React from 'react';
interface _props {
  content: _AnnouncementRow[];
}
const UpperHeader: React.FC<_props> = ({ content }) => {
  const router = useRouter();
  const {
    setShowLoader,
    updateEmployeeV2,
    product_employeeLogin,
    logoutClearCart,
    logInUser,
  } = useActions_v2();
  const employeeDetails = useTypedSelector_v2((state) => state.employee);

  const logoutEmployeeHandler = () => {
    // Don't logout LoggedIn user
    setShowLoader(true);
    updateEmployeeV2('CLEAN_UP');
    product_employeeLogin('MinQtyToOne_CleanUp');
    // logoutClearCart();
    // logInUser('CLEAN_UP');

    // setCookie(__Cookie.userId, '', 'EPOCH');
    // deleteCookie(__Cookie.tempCustomerId);
    localStorage.removeItem(__LocalStorage.guestEmailID);
    localStorage.removeItem(__LocalStorage.empData);
    localStorage.removeItem(__LocalStorage.empGuest);
    router.push(paths.HOME);
  };
  const storeCode = useTypedSelector_v2((state) => state.store.code);

  if (content.length === 0 || router.pathname === paths.CHECKOUT) return null;

  return (
    <>
      <div className=''>
        <div className='bg-primary hidden md:block' style={{ backgroundColor: storeCode==='PKHG' ? "#006CD0" : "", height: storeCode==='PKHG' ? "30px" : ""}}>
          <div className='container pl-[15px] pr-[15px] mx-auto'>
            <div className='flex flex-wrap justify-between items-center'>
              {content[0]?.isVisible ? <div
                dangerouslySetInnerHTML={{
                  __html: content[0].leftSideText || '',
                }}
              /> : <div></div>
              }
              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-3'>
                  {employeeDetails.empId ? (
                    <>
                    {storeCode === 'CG' && <>
                    <span
                        onClick={() => router.push(paths.DISCOUNTED)}
                        className='text-center text-capitalize cursor-pointer text-[#ffffff]'
                      >
                        Discontinued
                      </span>
                      <span className='p-l-5 p-r-5 text-[#ffffff]'>|</span>
                    </>}
                      
                      <span className='text-center text-capitalize cursor-pointer text-[#ffffff]'>
                        Employee Logged In
                        <button
                          className='ml-1'
                          style={{ color: '#7BC24E' }}
                          onClick={logoutEmployeeHandler}
                        >
                          (LogOut)
                        </button>
                      </span>
                      {content[0].rightSideText && <span className='p-l-5 p-r-5 text-[#ffffff]'>|</span>}
                      
                    </>
                  ) : null}
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: content[0].rightSideText || '',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpperHeader;
