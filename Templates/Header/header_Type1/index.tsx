import { __pagesConstant } from '@constants/pages.constant';
// import { _MenuItems } from '@src/show.type';
import {
  useActions_v2,
  useTypedSelector_v2,
  useWindowDimensions_v2,
} from 'hooks_v2';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { storeBuilderTypeId } from '@configs/page.config';
import { paths } from '@constants/paths.constant';
import { _HeaderProps } from '@definations/header.type';
import {
  LoggedInMenu,
  LoginIcon,
  Logo,
  MenuIcon,
  MyCartIcon,
  WishListIcon,
} from '@header/header_Type1/Components/Icons';
import MenuItems from '@header/header_Type1/Components/Menu/Header_MenuItems';
import SearchBar from '@header/header_Type1/Components/Menu/Header_SearchBar';
import { useRouter } from 'next/router';

const Header_Type1: NextPage<_HeaderProps> = ({
  logoUrl,
  menuItems,
  headerBgColor,
  headerTextColor,
}) => {
  const { store_setAppView } = useActions_v2();
  const { width } = useWindowDimensions_v2();
  const router = useRouter();

  // const router = useRouter;
  // ------------------------------------------------------------------------
  // const userId = useTypedSelector_v2((state) => state.user.id);
  // const storeName = useTypedSelector_v2((state) => state.store.storeName);
  const showSideMenu = useTypedSelector_v2((state) => state.modals.sideMenu);
  const storeTypeId = useTypedSelector_v2((state) => state.store.storeTypeId);
  const islogo = useTypedSelector_v2((state) => state.sbStore.isLogo);

  // ------------------------------------------------------------------------
  const [isMobileView, setIsMobileView] = useState<boolean>(
    width <= __pagesConstant._header.mobileBreakPoint,
  );
  useEffect(() => {
    const isMobile = width <= __pagesConstant._header.mobileBreakPoint;
    const showMobile = isMobile ? 'MOBILE' : 'DESKTOP';
    store_setAppView(showMobile);
    setIsMobileView(isMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <div
      className={`bg-[${headerBgColor}] sticky md:top-7 z-40 shadow-[0_0px_5px_rgba(0,0,0,0.12)] `}
      id={'header_with_navBar'}
    >
      {/* <NotificationBar /> */}
      <div className={`bg-[${headerBgColor}]`}>
        {isMobileView && router.asPath != paths.CHECKOUT && (
          <MenuItems
            showSideMenu={showSideMenu}
            // storeCode={storeCode}
            screen='MOBILE'
            menuItems={menuItems}
          />
        )}

        <div className='fixed z-40 lg:hidden'></div>
        <header className='relative trancking-[1px]'>
          <nav aria-label='Top'>
            <div className={`bg-[${headerBgColor}]`}>
              <div className='container pl-[15px] pr-[15px] mx-auto'>
                <div className='pt-[10px] pb-[10px]'>
                  <div className='flex items-center justify-between'>
                    {storeTypeId == storeBuilderTypeId ? (
                      islogo &&
                      (isMobileView ? null : (
                        <Logo
                          // screen='DESKTOP'
                          logo={{
                            desktop: logoUrl.desktop,
                            mobile: logoUrl.desktop,
                          }}
                        />
                      ))
                    ) : isMobileView ? null : (
                      <Logo
                        // screen='DESKTOP'
                        logo={{
                          desktop: logoUrl.desktop,
                          mobile: logoUrl.desktop,
                        }}
                      />
                    )}

                    {isMobileView
                      ? null
                      : router.asPath != paths.CHECKOUT && (
                          <MenuItems
                            showSideMenu={showSideMenu}
                            screen='DESKTOP'
                            menuItems={menuItems}
                          />
                        )}

                    {islogo &&
                      (isMobileView ? (
                        <Logo
                          // screen='MOBILE'
                          logo={{
                            desktop: logoUrl.desktop,
                            mobile: logoUrl.desktop,
                          }}
                        />
                      ) : null)}
                    <div className='flex items-center justify-end'>
                      <div className='flex items-center '>
                        <div className='flex items-center '>
                          <SearchBar screen={'DESKTOP'} />

                          <WishListIcon />
                          <LoginIcon />
                          <LoggedInMenu />
                          {/* {storeCode !== _Store.type1 && <CompareIcon />} */}
                          {/* <!-- <span className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true"></span> --> */}
                          <MyCartIcon />
                          <div className='lg:hidden pl-[15px]'>
                            {router.asPath !== paths.CHECKOUT && <MenuIcon />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <SearchBar screen={'MOBILE'} />
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Header_Type1;
