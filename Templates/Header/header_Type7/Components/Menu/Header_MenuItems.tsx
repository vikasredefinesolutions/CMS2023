import { _MenuItems } from '@definations/header.type';
import MenuItem from '@header/header_Type7/Components/Menu//Header_MenuItem';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import Backdrop from '../Backdrop';
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
  const [openTab, setOpenTab] = useState<string>('');
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<null | _MenuItems>(null);
  useEffect(() => {
    if (menuItemsFromRoot) {
      setMenuItems(menuItemsFromRoot);
    }
  }, [menuItemsFromRoot]);
  useEffect(() => {
    setOpenTab('');
  }, [router.asPath]);

  if (!menuItems) return <></>;

  if (screen === 'MOBILE' && showSideMenu === 'CLOSE') return <></>;

  if (screen === 'MOBILE') {
    return (
      <div className='fixed z-[100] lg:hidden inset-0 bg-[#000000] bg-opacity-50'>
        <Backdrop setOpenTab={setOpenTab} />
        <div className='w-full max-w-xs bg-[#ffffff] h-screen overflow-x-scroll'>
          <div
            className='header-nav relative tracking-[1px]'
            x-data='{open : false, open1 : false, subopen1 : false, subopen2 : false, open3 : false, open4 : false, open5 : false}'
          >
            <CloseIcon />
            {menuItems.items_content?.map((menu, index) => {
              if (menu === null) {
                return <Fragment key={index}>null</Fragment>;
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
      <div className='hidden lg:inline-block ml-[10px] mr-[10px]'>
        <div className=''>
          <div className='h-full flex justify-center header-nav relative'>
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
