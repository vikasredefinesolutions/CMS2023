import { paths } from '@constants/paths.constant';
import { Logout } from '@helpers/common.helper';
import { useActions_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const _TABS = [
  { label: 'Account Settings', path: paths.myAccount.account_settings },
  { label: 'User Management', path: paths.myAccount.user_management },
  { label: 'Manage Logo', path: paths.myAccount.manage_logo },
  { label: 'Orders', path: paths.myAccount.orders },
  { label: 'Address', path: paths.myAccount.address },
  { label: 'Logout', path: null },
];

const MyAccountTabs: React.FC = () => {
  const { logInUser, logoutClearCart, setWishListEmpty } = useActions_v2();
  const { pathname: currentPath } = useRouter();

  const logoutHandler = () => {
    logoutClearCart();
    setWishListEmpty([]);
    Logout(logInUser);
  };

  return (
    <>
      <section className='pt-[40px]'>
        <div className='container mx-auto'>
          <div className='text-2xl-text font-[600] text-center'>MY ACCOUNT</div>
          <div className='bg-light-gray mt-[40px] flex justify-center'>
            <ul className='w-full md:space-x-[28px] max-w-[1350px] mx-auto text-center'>
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
                        className={`text-[#0a1c2b] hover:text-[#0a1c2b] focus:text-[#0a1c2b] font-semibold ${
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
                    className={`border-t hover:border-black px-[40px] py-[10px] md:inline-block block text-center  ${
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
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAccountTabs;
