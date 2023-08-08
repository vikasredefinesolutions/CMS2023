import { BACARDI } from '@constants/global.constant';
import { __pagesConstant } from '@constants/pages.constant';
import { paths } from '@constants/paths.constant';
import { _HeaderProps, _MenuItems } from '@definations/header.type';
import { extractCookies } from '@helpers/common.helper';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
  useWindowDimensions_v2,
} from '@hooks_v2/index';
import { FetchSbStoreCartDetails } from '@services/sb.service';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header_MenuItems from './Components/Menu/Header_MenuItems';
import MiddleHeader from './Components/Middleheader';
import TopHeader from './Components/Topheader';

const Header_Type9: NextPage<_HeaderProps> = ({
  logoUrl,
  menuItems,
  headerBgColor,
  headerTextColor,
}) => {
  const { store_setAppView, cart_UpdateItems, setShowLoader } = useActions_v2();
  const { width } = useWindowDimensions_v2();
  const router = useRouter();
  const showSideMenu = useTypedSelector_v2((state) => state.modals.sideMenu);
  const [isMobileView, setIsMobileView] = useState<boolean>(
    width <= __pagesConstant._header.mobileBreakPoint,
  );

  const selectedBacardiStor = extractCookies(
    'BacardiSelectedStore',
    'browserCookie',
  ).BacardiSelectedStore;

  const { code: storeCode } = useTypedSelector_v2((state) => state.store);

  const customerId = GetCustomerId();

  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );

  const fetchCartDetails = async () => {
    return await FetchSbStoreCartDetails(+customerId, isEmployeeLoggedIn).then(
      (response) => {
        if (!response) return;

        cart_UpdateItems({ items: response });
      },
    );
  };

  useEffect(() => {
    setShowLoader(true);
    fetchCartDetails().finally(() => {
      setShowLoader(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId, isEmployeeLoggedIn]);

  useEffect(() => {
    const isMobile = width <= __pagesConstant._header.mobileBreakPoint;
    const showMobile = isMobile ? 'MOBILE' : 'DESKTOP';
    store_setAppView(showMobile);
    setIsMobileView(isMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  if (router.asPath == paths.CART || router.asPath == paths.CHECKOUT) {
    return (
      <>
        {/* <!-- Secondary navigation --> */}
        <div className='flex flex-wrap md:flex-nowrap justify-center md:justify-between bg-white sticky top-0 left-0 right-0 z-50 border-b-2 border-b-transparent'>
          <div className='w-full sm:w-2/12 pt-[0] flex justify-start'>
            <a
              href={
                storeCode == BACARDI
                  ? selectedBacardiStor === 'Bacardi'
                    ? paths.bacardi.bacardi
                    : selectedBacardiStor === 'GreyGoose'
                    ? paths.bacardi.greyGoose
                    : paths.bacardi.bacardi
                  : paths.HOME
              }
              title=''
              className='w-full flex justify-center items-center text-center'
            >
              <img
                className='w-auto'
                src='/bacardi/logo-checkout.png'
                alt='BACARDI'
              />
            </a>
          </div>
          <div className='w-full sm:w-10/12 flex items-center justify-center pb-[0] text-title-text text-center'>
            SHOPPING CART
          </div>
        </div>
      </>
    );
  }
  return (
    <section
      className={`bg-white  sticky top-0 left-0 right-0 z-50 border-b-2 border-b-transparent bg-[#efefef]`}
      id='mobile_menu_box'
    >
      {isMobileView && router.asPath != paths.CHECKOUT && (
        <Header_MenuItems
          showSideMenu={showSideMenu}
          // storeCode={storeCode}
          screen='MOBILE'
          menuItems={menuItems as _MenuItems}
        />
      )}

      <div
        className={` bg-primary md:block p-[8px] lg:p-[5px] lg:py-[8px]`}
        // style={{ backgroundColor: headerBgColor }}
      >
        {/* <header className='relative trancking-[1px]' id='spy'> */}
        <div className='container mx-auto'>
          <div
            className={`${headerBgColor ? '' : 'bg-[#ffffff]'}]`}
            // style={{ backgroundColor: headerBgColor }}
          >
            {' '}
            {/* {router.asPath !== paths.CHECKOUT && <MenuIcon />} */}
            <TopHeader />
            {/* <SearchBar screen={'MOBILE'} /> */}
          </div>
        </div>
        {/* </header> */}
      </div>
      <div>
        <MiddleHeader />{' '}
        {isMobileView
          ? null
          : router.asPath != paths.CHECKOUT && (
              <Header_MenuItems
                showSideMenu={showSideMenu}
                screen='DESKTOP'
                menuItems={menuItems as _MenuItems}
              />
            )}
      </div>
    </section>
  );
};

export default Header_Type9;
