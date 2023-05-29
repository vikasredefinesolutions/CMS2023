import { _MenuItems } from '@definations/header.type';
import MenuItem from '@header/header_Type4/Components/Menu//Header_MenuItem';
import Backdrop from '@templates/Header/header_Type4/Components/Backdrop';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
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
      <div
        className='fixed z-[100]  inset-0 bg-[#000000] bg-opacity-50 '
        id='mobile_menu_box'
      >
        <Backdrop />
        <div className='w-full max-w-xs h-screen overflow-x-scroll bg-[#ffffff]'>
          <CloseIcon />

          <div
            className='header-nav relative tracking-[1.25px]'
            x-data='{open : false, open1 : false, subopen1 : false, subopen2 : false, open3 : false, open4 : false, open5 : false}'
          >
            {/* <div className='pt-[15px] pb-[15px] px-[10px] text-right'>
              {companyInfo.phoneNumber}
            </div> */}
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
      // <div className='hidden lg:block border-y border-y-gray-border ml-[10px] mr-[10px]'>
      //   <div className='"h-full flex justify-center header-nav relative'>
      <>
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
      </>
      //   </div>
      // </div>
    );
  }

  return <></>;
};

export default React.memo(MenuItems);
