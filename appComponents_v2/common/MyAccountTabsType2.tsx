import { paths } from '@constants/paths.constant';
import { Logout } from '@helpers/common.helper';
import { useActions_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';

const _TABS = [
  { id: 1, label: 'Account Settings', path: paths.myAccount.account_settings },
  { id: 2, label: 'Manage Logo', path: paths.myAccount.manage_logo },
  { id: 3, label: 'Orders', path: paths.myAccount.orders },
  { id: 4, label: 'Address', path: paths.myAccount.address },
  { id: 5, label: 'Logout', path: null },
];

const MyAccountTabsType2: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { logInUser, logoutClearCart, setWishListEmpty } = useActions_v2();
  const { pathname: currentPath } = useRouter();
  const [pageHeading, setPageHeading] = useState<string>('');

  const handleLogout = () => {
    logoutClearCart();
    setWishListEmpty([]);
    Logout(logInUser);
  };

  useEffect(() => {
    _TABS.forEach((tab) => {
      if (tab.path === null) {
        return;
      }

      if (currentPath.includes(tab.path!)) {
        setPageHeading(tab.label);
      }
    });
  }, []);

  return (
    <>
      <section className='pt-[40px]'>
        <div className='container mx-auto'>
          <div className='text-2xl-text text-center'>{pageHeading}</div>
        </div>
      </section>
      <section className='container mx-auto mt-[50px] mb-[50px]'>
        <div className='block lg:flex lg:space-x-10'>
          <div className='w-4/4 lg:w-1/5 pb-10'>
            <div className='bg-white flex justify-center'>
              <ul className='w-full max-w-[1350px] mx-auto text-center lg:text-right lg:block '>
                {_TABS.map((tab) => {
                  if (tab.path === null) {
                    return (
                      <li key={tab.id} className='w-full block text-right py-0'>
                        <button
                          className='w-full block text-medium-text hover:text-medium-text focus:text-medium-text font-[600] py-[10px] hover:bg-gray-100 border-r-[5px] border-white pr-4 hover:border-tertiary'
                          onClick={() => handleLogout}
                        >
                          {tab.label}
                        </button>
                      </li>
                    );
                  }

                  const activeDir = currentPath.includes(tab.path);
                  return (
                    <li key={tab.id} className='w-full block text-right py-0'>
                      <Link href={tab.path}>
                        <a
                          className={`w-full block text-medium-text hover:text-medium-text focus:text-medium-text font-[600] py-[10px] hover:bg-gray-100 border-r-[5px] pr-4 hover:border-tertiary ${
                            activeDir
                              ? 'active bg-gray-100  border-tertiary'
                              : 'border-white'
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
          {children}
        </div>
      </section>
    </>
  );
};

export default MyAccountTabsType2;
