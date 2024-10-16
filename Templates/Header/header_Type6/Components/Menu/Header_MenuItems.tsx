import {
  SIMPLI_SAFE_CODE,
  UCA,
  UNITI_CODE,
  _Store_CODES,
} from '@constants/global.constant';
import { _MenuItems } from '@definations/header.type';
import MenuItem from '@header/header_Type6/Components/Menu//Header_MenuItem';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Backdrop from '@templates/Header/header_Type6/Components/Backdrop';
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
  const [menuItems, setMenuItems] = useState<null | _MenuItems>(null);
  const [openTab, setOpenTab] = useState<string>('');
  const store_Code = useTypedSelector_v2((state) => state.store.code);
  const router = useRouter();
  useEffect(() => {
    setOpenTab('');
  }, [router.asPath]);
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
        className='fixed z-[100]  inset-0 bg-[#000000] bg-opacity-50 '
        id='mobile_menu_box'
      >
        <Backdrop setOpenTab={setOpenTab} />
        <div className='w-full max-w-xs bg-[#ffffff] h-screen overflow-x-scroll'>
          <div
            className='header-nav relative tracking-[1px]'
            x-data='{open : false, open1 : false, subopen1 : false, subopen2 : false, open3 : false, open4 : false, open5 : false}'
          >
            <CloseIcon />

            
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
      <div
        className={`hidden lg:block ${
          store_Code == UNITI_CODE ||
          store_Code == SIMPLI_SAFE_CODE ||
          store_Code === _Store_CODES.USAAHEALTHYPOINTS ||
          store_Code === UCA
            ? ''
            : 'border-y border-y-gray-border'
        } ml-[10px] mr-[10px] `}
      >
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
    );
  }

  return <></>;
};

export default React.memo(MenuItems);
