import { companyInfo } from '@constants/common.constant';
import { _MenuItems } from '@definations/header.type';
import MenuItem from '@header/header_Type9/Components/Menu//Header_MenuItem';
import { extractCookies } from '@helpers/common.helper';
import Backdrop from '@templates/Header/header_Type9/Components/Backdrop';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { CloseIcon } from '../Icons';
import SearchBar from './Header_SearchBar';

interface _props {
  screen: 'DESKTOP' | 'MOBILE';
  menuItems: _MenuItems | null;
  showSideMenu: 'OPEN' | 'CLOSE';
}

const MenuItems: React.FC<_props> = ({
  screen,
  menuItems: menuItemsFromRoot,
  showSideMenu,
}) => {
  // const local = localStorage.getItem('BacardiSelectedStore');
  const [menuItems, setMenuItems] = useState<null | _MenuItems>(null);
  const [openTab, setOpenTab] = useState<string>('');
  const router = useRouter();
  useEffect(() => {
    setOpenTab('');
  }, [router.asPath]);
  useEffect(() => {
    if (menuItemsFromRoot) {
      setMenuItems(menuItemsFromRoot);
    }
  }, [menuItemsFromRoot]);
  const storeSelcted = extractCookies(
    'BacardiSelectedStore',
    'browserCookie',
  ).BacardiSelectedStore;
  useEffect(() => {}, []);

  if (!menuItems) return <></>;

  if (screen === 'MOBILE' && showSideMenu === 'CLOSE') return <></>;

  if (screen === 'MOBILE') {
    return (
      <div
        className='fixed z-[100] lg:hidden inset-0 bg-[#000000] bg-opacity-50 '
        id='mobile_menu_box'
      >
        <Backdrop setOpenTab={setOpenTab} />
        <div className='w-full max-w-xs bg-[#ffffff] h-screen overflow-x-scroll'>
          <div
            className='header-nav relative tracking-[1px]'
            x-data='{open : false, open1 : false, subopen1 : false, subopen2 : false, open3 : false, open4 : false, open5 : false}'
          >
            <CloseIcon />

            <div className='pt-[15px] pb-[15px] px-[10px] text-right'>
              {companyInfo.phoneNumber}
            </div>
            {menuItems.items_content?.map((menu, index) => {
              if (menu === null) {
                return <></>;
              }
              if (
                storeSelcted?.toLocaleLowerCase() ==
                menu.title.toLocaleLowerCase().replace(' ', '')
              ) {
                return (
                  <Fragment key={index}>
                    <MenuItem
                      title={menu.title}
                      type={menu.type}
                      content={menu.items}
                      url={menu.seName}
                      openTab={openTab}
                      setOpenTab={setOpenTab}
                      showPipe={
                        menuItems?.items_content?.length &&
                        menuItems?.items_content?.length - 1 != index
                          ? true
                          : false
                      }
                    />
                  </Fragment>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
  if (screen === 'DESKTOP') {
    return (
      <div className='container mx-auto'>
        <div className='hidden h-full lg:flex items-center justify-between'>
          <div className=''>
            <div
              className='ml-[15px]'
              x-data='Components.popoverGroup()'
              x-init='init()'
            >
              <div className='h-full flex justify-center space-x-2 xl:space-x-6 relative text-small-text xl:text-default-text'>
                {menuItems.items_content?.map((menu, index) => {
                  if (menu === null) {
                    return <></>;
                  }
                  if (
                    storeSelcted?.toLocaleLowerCase() ==
                    menu.title.toLocaleLowerCase().replace(' ', '')
                  ) {
                    return (
                      <Fragment key={index}>
                        <MenuItem
                          title={menu.title}
                          type={menu.type}
                          content={menu.items}
                          url={menu.seName}
                          openTab={openTab}
                          setOpenTab={setOpenTab}
                          showPipe={
                            menuItems?.items_content?.length &&
                            menuItems?.items_content?.length - 1 != index
                              ? true
                              : false
                          }
                        />
                      </Fragment>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <SearchBar />
        </div>
      </div>
    );
  }

  return <></>;
};

export default React.memo(MenuItems);
