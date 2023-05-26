import { _MenuItemsWithBrand } from '@definations/header.type';
import MenuItem from '@header/header_Type5/Components/Menu//Header_MenuItem';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Backdrop from '@templates/Header/header_Type5/Components/Backdrop';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { CloseIcon } from '../Icons';

interface _props {
  screen: 'DESKTOP' | 'MOBILE';
  menuItems: _MenuItemsWithBrand | null;
  showSideMenu: 'OPEN' | 'CLOSE';
}

const MenuItems: React.FC<_props> = ({
  screen,
  menuItems: menuItemsFromRoot,
  showSideMenu,
}) => {
  const [openTab, setOpenTab] = useState<string>('');
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<null | _MenuItemsWithBrand>(null);
  useEffect(() => {
    if (menuItemsFromRoot) {
      setMenuItems(menuItemsFromRoot);
    }
  }, [menuItemsFromRoot]);
  useEffect(() => {
    setOpenTab('');
  }, [router.asPath]);
  const PhoneNumber = useTypedSelector_v2((state) => state.store.phone_number);
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
              {PhoneNumber}
            </div>
            {menuItems.items_content?.map((menu, index) => {
              if (menu === null) {
                return <></>;
              }

              return (
                <Fragment key={index}>
                  <MenuItem
                    title={menu.title}
                    type={menu.type}
                    content={menu.items}
                    url={menu.seName}
                    openTab={openTab}
                    setOpenTab={setOpenTab}
                  />
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  if (screen === 'DESKTOP') {
    return (
      <div className='hidden lg:block bg-tertiary relative'>
        <div className='container mx-auto'>
          <div className='h-full flex justify-center header-nav gap-[3px]'>
            {menuItems.items_content?.map((menu, index) => {
              if (menu === null) {
                return <></>;
              }
              return (
                <Fragment key={index}>
                  <MenuItem
                    title={menu.title}
                    type={menu.type}
                    content={menu.items}
                    url={menu.seName}
                    openTab={openTab}
                    setOpenTab={setOpenTab}
                  />
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return <></>;
};

export default React.memo(MenuItems);