import { __LocalStorage } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { Logout } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const _TABS = [
  { label: 'Account Settings', path: paths.myAccount.account_settings },
  { label: 'User Management', path: paths.myAccount.user_management },
  { label: 'Manage Logo', path: paths.myAccount.manage_logo },
  { label: 'Orders', path: paths.myAccount.orders },
  { label: 'Address', path: paths.myAccount.address },
  { label: 'Logout', path: null },
];

const MyAccountTabsType1: React.FC = () => {
  const {
    setWishListEmpty,
    updateEmployeeV2,
    product_employeeLogin,
    logoutClearCart,
    logInUser,
  } = useActions_v2();
  const { pathname: currentPath } = useRouter();
  const [selectedStage, setSelectedStage] = useState('');
  const router = useRouter();
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.empId,
  );

  useEffect(() => {
    _TABS.filter((tab) => {
      tab.path === router.asPath && setSelectedStage(tab.label);
    });
  }, [router.asPath]);

  const logoutHandler = () => {
    if (isEmployeeLoggedIn) {
      updateEmployeeV2('CLEAN_UP');
      product_employeeLogin('MinQtyToOne_CleanUp');
      localStorage.removeItem(__LocalStorage.empData);
      localStorage.removeItem(__LocalStorage.empGuest);
    }
    logoutClearCart();
    setWishListEmpty([]);
    Logout(logInUser);
  };

  const onChangeHandler = (event: any) => {
    _TABS.map((tab) => {
      switch (event.target.value) {
        case tab.label:
          router.push(tab?.path ? tab.path : '');
          break;
      }
    });
  };

  return (
    <>
      <section className='pt-[40px]'>
        <div className='container mx-auto'>
          <div className='text-2xl-text text-center'>MY ACCOUNT</div>
          <div className='bg-light-gray mt-[40px] flex justify-center p-[10px] lg:p-0'>
            <ul className='w-full md:space-x-[28px] max-w-[1350px] mx-auto text-center lg:block hidden'>
              {_TABS.map((tab, index) => {
                if (tab.path === null) {
                  return (
                    <li
                      key={index}
                      className={`border-t border-transparent hover:border-black text-base font-semibold text-[#0a1c2b] hover:text-[#0a1c2b] focus:text-[#0a1c2b] px-[3%] py-2.5 whitespace-nowrap inline-block ${
                        tab.path === currentPath ? 'border-black border-t ' : ''
                      }`}
                    >
                      <button
                        onClick={logoutHandler}
                        className={`w-full block text-right text-medium-text hover:text-medium-text focus:text-medium-text font-[600] py-[10px] hover:bg-gray-100 border-r-[5px] border-white pr-4 hover:border-tertiary ${
                          tab.path === currentPath ? 'active' : ''
                        }`}
                      >
                        {tab.label}
                      </button>
                    </li>
                  );
                }

                const activeDir = currentPath.includes(tab.path);
                return (
                  <li
                    key={index}
                    className={`border-t hover:border-black px-[40px] py-[13px] md:inline-block block text-center  ${
                      activeDir ? 'border-black ' : ''
                    }`}
                  >
                    <Link href={tab.path}>
                      <a
                        className={`text-medium-text hover:text-medium-text focus:text-medium-text font-[600] ${
                          activeDir ? 'active' : ''
                        }`}
                      >
                        {tab.label}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className='lg:hidden block w-full'>
              <select
                className='form-input'
                value={selectedStage}
                onChange={(event) => onChangeHandler(event)}
              >
                {_TABS.map((tab, index) => {
                  if (tab.path === null) {
                    return (
                      <option key={index}>
                        {/* <button
                          onClick={logoutHandler}
                          className={`text-[#0a1c2b] hover:text-[#0a1c2b] focus:text-[#0a1c2b] font-semibold ${
                            tab.path === currentPath ? 'active' : ''
                          }`}
                        > */}
                        {tab.label}
                        {/* </button> */}
                      </option>
                    );
                  }

                  const activeDir = currentPath.includes(tab.path);
                  return (
                    <option key={index}>
                      {/* <Link
                        className={`text-medium-text hover:text-medium-text focus:text-medium-text font-[600]`}
                        href={tab.path}
                      > */}
                      {tab.label}
                      {/* <a
                          className={`text-medium-text hover:text-medium-text focus:text-medium-text font-[600] ${
                            activeDir ? 'active' : ''
                          }`}
                        >
                        </a> */}
                      {/* </Link> */}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAccountTabsType1;
