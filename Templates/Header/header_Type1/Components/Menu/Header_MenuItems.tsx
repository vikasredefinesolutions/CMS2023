import { _MenuItems } from '@definations/header.type';
import MenuItem from '@header/header_Type1/Components/Menu//Header_MenuItem';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import Backdrop from '../Backdrop';
import Header_JustTitle from './Header_JustTitle';

interface _props {
  screen: 'DESKTOP' | 'MOBILE';
  menuItems: _MenuItems | null;
  showSideMenu: 'OPEN' | 'CLOSE';
}

const MenuItems: React.FC<_props> = ({ screen, menuItems, showSideMenu }) => {
  const [openTab, setOpenTab] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    setOpenTab('');
  }, [router.asPath]);

  if (!menuItems) return <></>;

  if (screen === 'MOBILE' && showSideMenu === 'CLOSE') return <></>;

  if (screen === 'MOBILE') {
    return (
      <div className='fixed z-[100] inset-0 bg-[#000000] bg-opacity-50'>
        <Backdrop setOpenTab={setOpenTab} />
        <div className='w-full max-w-xs bg-[#ffffff] h-screen overflow-x-scroll'>
          <div
            className='header-nav relative tracking-[1px]'
            x-data='{open : false, open1 : false, subopen1 : false, subopen2 : false, open3 : false, open4 : false, open5 : false}'
          >
            {/* <CloseIcon /> */}
            {menuItems.items_content?.map((menu, index) => {
              if (menu === null) {
                return null;
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
      <div className='h-full hidden lg:flex items-center flex-1'>
        <div className=''>
          <div className='h-full flex header-nav relative'>
            {menuItems.items?.map((item, index) => {
              const menu =
                menuItems.items_content && menuItems.items_content[index];

              if (!menu) {
                return (
                  <Header_JustTitle
                    key={item?.title}
                    title={item?.title || ''}
                  />
                );
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
