import { paths } from '@constants/paths.constant';
import {
  _t_Brands,
  _t_MenuCategory,
  _t_MenuTopic,
} from '@definations/header.type';

import Brand from '@header/header_Type3/Components/Menu//Header_BrandItem';
import Category from '@header/header_Type3/Components/Menu//Header_CategoryItem';
import Custom from '@header/header_Type3/Components/Menu//Header_CustomItem';
import Topic from '@header/header_Type3/Components/Menu//Header_TopicItem';
import React from 'react';

// -----------
interface _props {
  content: _t_MenuTopic | _t_Brands | _t_MenuCategory | string | null;
  type: 'BRANDS' | 'CATEGORY' | 'TOPIC' | 'CUSTOM' | 'LAYOUT_DROPDOWN';
  title: string;
  url: string | null;
  openTab: string;
  setOpenTab: (arg: string) => void;
}

const MenuItem: React.FC<_props> = ({ type, url, title, content,  openTab,
  setOpenTab, }) => {
  let _titleURL = '/';

  if (url) {
    _titleURL = url;
  }

  // if (content === null) {
  //   return <></>;
  // }
  if (content !== null && typeof content === 'string') {
    return <Custom title={title} url={_titleURL} content={content}         openTab={openTab}
    setOpenTab={setOpenTab}/>;
  }

  if (content !== null && 'dataType' in content) {
    if (type === 'BRANDS' && content.dataType === 'BRANDS') {
      return <Brand title={title} url={paths.BRAND} content={content.brands}  openTab={openTab}
      setOpenTab={setOpenTab} />;
    }

    if (type === 'CATEGORY' && content.dataType === 'CATEGORIES') {
      return (
        <Category title={title} url={_titleURL} content={content.categories}           openTab={openTab}
        setOpenTab={setOpenTab} />
      );
    }
  }
  if (type === 'TOPIC') {
    return <Topic title={title} url={_titleURL} />;
  }

  return <Topic title={title} url={_titleURL} />;
};

export default MenuItem;
