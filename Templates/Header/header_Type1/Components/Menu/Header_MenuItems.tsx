import { _MenuItems } from '@definations/header.type';
import MenuItem from '@header/header_Type1/Components/Menu//Header_MenuItem';
import React, { useEffect, useState } from 'react';
import Backdrop from '../Backdrop';

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
      <div className='fixed z-[100] lg:hidden inset-0 bg-[#000000] bg-opacity-50'>
        <Backdrop />
        <div className='w-full max-w-xs bg-[#ffffff] h-screen overflow-x-scroll'>
          <div
            className='header-nav relative tracking-[1px]'
            x-data='{open : false, open1 : false, subopen1 : false, subopen2 : false, open3 : false, open4 : false, open5 : false}'
          >
            {/* <CloseIcon /> */}
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
      <div className='h-full hidden lg:flex items-center flex-1'>
        <div className=''>
          <div className='h-full flex header-nav relative'>
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
