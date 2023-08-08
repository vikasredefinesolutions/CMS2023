import { __LocalStorage } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { Logout } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { OktaLogout } from '@services/saml.service';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';

interface _Props {
  children: ReactNode;
  addressNum?: number;
  addressFunc?: any;
}

const _TABS = [
  { id: 1, label: 'Account Settings', path: paths.myAccount.account_settings },
  { id: 3, label: 'Orders', path: paths.myAccount.orders },
  { id: 5, label: 'Logout', path: null },
];

const _ADDRESS_TABS = paths.myAccount.additionalTab;

const MyAccountTabsType7: React.FC<_Props> = ({ children, addressNum }) => {
  const { logInUser, logoutClearCart, setWishListEmpty } = useActions_v2();
  const { pathname: currentPath, asPath } = useRouter();
  const [pageHeading, setPageHeading] = useState<string>('');
  const [selectedStage, setSelectedStage] = useState('');
  const router = useRouter();
  const { id: storeId, code: storeCode } = useTypedSelector_v2(
    (state) => state.store,
  );
  useEffect(() => {
    _TABS.filter((tab) => {
      tab.path === router.asPath && setSelectedStage(tab.label);
    });
  }, [router.asPath]);

  useEffect(() => {
    _TABS.forEach((tab) => {
      if (tab.path === null) {
        return;
      }

      if (currentPath.includes(tab.path!)) {
        setPageHeading(tab.label);
      }
    });

    _TABS.find((el) => (el.path == asPath ? setactualPath(el.path) : ''));
    if (paths.myAccount.editaddress == asPath) {
      setactualPath(paths.myAccount.address);
    } else if (paths.myAccount.billingeditaddress == asPath) {
      setactualPath(paths.myAccount.address);
    }
  }, []);

  const handleLogout = async () => {
    logoutClearCart();
    setWishListEmpty([]);
    localStorage.removeItem(__LocalStorage.guestEmailID);
    const thirdParytLogin = localStorage.getItem(
      __LocalStorage.thirdPartyServiceName,
    );
    if (thirdParytLogin?.toLowerCase() == 'okta') {
      const payload = {
        oktaLogoutModel: {
          storeId: +storeId,
        },
      };
      const res = await OktaLogout(payload);
      res && router.push(res);
    }
    Logout(logInUser);
  };

  const [actualPath, setactualPath] = useState<string>('');

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
      <section>
        <div className='container mx-auto'>
          <div className={`pt-[40px] bg-white`}>
            <div className='text-2xl-text text-center'>{pageHeading}</div>
          </div>
        </div>
      </section>
      <section className={`container mx-auto`}>
        <div
          className={`block lg:flex lg:space-x-10 pt-[50px] pb-[50px] bg-white pl-[15px] pr-[15px]`}
        >
          <div className='w-4/4 lg:w-1/5 pb-10'>
            <div className='bg-white flex justify-center'>
              <ul className='w-full max-w-[1350px] mx-auto text-center lg:text-right lg:block hidden'>
                {_TABS.map((tab) => {
                  if (tab.path === null) {
                    return (
                      <li key={tab.id} className='w-full block text-right py-0'>
                        <button
                          className='w-full block text-right text-medium-text hover:text-medium-text focus:text-medium-text font-[600] py-[10px] hover:bg-gray-100 border-r-[5px] border-white pr-4 hover:border-tertiary'
                          onClick={() => {
                            handleLogout();
                          }}
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
                            actualPath == tab.path
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

              <div className='lg:hidden block'>
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
          {children}
        </div>
      </section>
    </>
  );
};

export default MyAccountTabsType7;
