import MenuItem from '@header/header_Type2/Components/Menu//Header_MenuItem';
import { _MenuItems } from '@templates/Header/header.type';
import Backdrop from '@templates/Header/header_Type2/Components/Backdrop';
import React, { useEffect, useState } from 'react';
import { CloseIcon } from '../Icons';

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
  const [menuItems, setMenuItems] = useState<null | _MenuItems>(null);
  useEffect(() => {
    if (menuItemsFromRoot) {
      setMenuItems(menuItemsFromRoot);
    }
  }, [menuItemsFromRoot]);

  if (!menuItems) return <></>;

  if (screen === 'MOBILE' && showSideMenu === 'CLOSE') return <></>;

  if (screen === 'MOBILE') {
    return (
      <div
        className='fixed z-[100] lg:hidden inset-0 bg-[#000000] bg-opacity-50 '
        id='mobile_menu_box'
      >
        <Backdrop />
        <div className='w-full max-w-xs bg-[#ffffff] h-screen overflow-x-scroll'>
          <div
            className='header-nav relative tracking-[1px]'
            x-data='{open : false, open1 : false, subopen1 : false, subopen2 : false, open3 : false, open4 : false, open5 : false}'
          >
            <CloseIcon />

            <div className='pt-[15px] pb-[15px] px-[10px] text-right'>
              (877) 216-1011
            </div>
            {menuItems.items_content?.map((menu, index) => {
              if (menu === null) {
                return <></>;
              }

              return (
                <MenuItem
                  key={index}
                  title={menu.title}
                  type={menu.type}
                  content={menu.items}
                  url={menu.seName}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  if (screen === 'DESKTOP') {
    return (
      <div className='hidden lg:block border-y border-y-gray-border'>
        <div className='container mx-auto'>
          <div className='h-full flex justify-center header-nav relative'>
            {menuItems.items_content?.map((menu, index) => {
              if (menu === null) {
                return <></>;
              }
              return (
                <MenuItem
                  key={index}
                  title={menu.title}
                  type={menu.type}
                  content={menu.items}
                  url={menu.seName}
                />
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
