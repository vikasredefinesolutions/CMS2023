import LoginModal from '@appComponents/modals/loginModal';
import { _MenuCategory } from '@definations/header.type';
import { _modals } from '@definations/product.type';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header_Category from './Header_CategoryItem';
interface _props {
  title: string;
  url: string;
  content: _MenuCategory[] | null;
  openTab: string;
  setOpenTab: (arg: string) => void;
}

const Header_MainCategory: React.FC<_props> = ({
  content,
  title,
  url,
  openTab,
  setOpenTab,
}) => {
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const { view, code } = useTypedSelector_v2((state) => state.store);
  const { toggleSideMenu, setRedirectPagePath } = useActions_v2();
  const [focus, setFocus] = useState(false);
  const [showAllItems, setShowAllItems] = useState<boolean>(false);
  const [showtab, setShowTab] = useState<boolean>(false);
  useEffect(() => {
    if (openTab == title) {
      setShowTab(true);
      setShowAllItems(true);
    } else {
      setShowTab(false);
      setShowAllItems(false);
    }
  }, [openTab]);
  const [openModal, setOpenModal] = useState<null | _modals>(null);

  const router = useRouter();
  const modalHandler = (param: null | _modals) => {
    if (param) {
      setOpenModal(param);
      return;
    }
    setOpenModal(null);
  };

  if (view === 'MOBILE') {
    return (
      <>
        {content?.map((item, index) => {
          // if (index > content.length / 2) return <></>;
          return (
            <Header_Category
              title={item.categoryName}
              url={`${item.seName}.html`}
              itemId={item.id}
              openTab={openTab}
              setOpenTab={setOpenTab}
              showPipe={content.length - 1 !== index ? true : false}
            />
          );
        })}
        {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
      </>
    );
  }
  if (view === 'DESKTOP') {
    return (
      <>
        {content?.map((item, index) => {
          // if (index > content.length / 2) return <></>;
          return (
            <Header_Category
              title={item.categoryName}
              url={`${item.seName}.html`}
              itemId={item.id}
              openTab={openTab}
              setOpenTab={setOpenTab}
              showPipe={content.length - 1 !== index ? true : false}
            />
          );
        })}
        {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
      </>
    );
  }

  return <></>;
};

export default Header_MainCategory;
