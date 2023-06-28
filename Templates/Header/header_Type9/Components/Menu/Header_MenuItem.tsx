import { paths } from '@constants/paths.constant';
import {
  _t_Brands,
  _t_MenuCategory,
  _t_MenuTopic,
} from '@definations/header.type';

import Brand from '@header/header_Type9/Components/Menu//Header_BrandItem';
import Custom from '@header/header_Type9/Components/Menu//Header_CustomItem';
import Topic from '@header/header_Type9/Components/Menu//Header_TopicItem';
import React from 'react';
import Header_MainCategory from './Header_MainCategory';

// -----------
interface _props {
  content: _t_MenuTopic | _t_Brands | _t_MenuCategory | string | null;
  type: 'BRANDS' | 'CATEGORY' | 'TOPIC' | 'CUSTOM' | 'LAYOUT_DROPDOWN';
  title: string;
  url: string | null;
  openTab: string;
  setOpenTab: (arg: string) => void;
  showPipe: boolean;
}

const MenuItem: React.FC<_props> = ({
  type,
  url,
  title,
  content,
  openTab,
  setOpenTab,
  showPipe,
}) => {
  let _titleURL = '/';

  if (url) {
    _titleURL = url;
  }
  // console.log(content, '56444444444444444444444444444');
  // if (content === null) {
  //   return <></>;
  // }
  if (content !== null && typeof content === 'string') {
    return (
      <Custom
        title={title}
        url={_titleURL}
        content={content}
        openTab={openTab}
        setOpenTab={setOpenTab}
      />
    );
  }

  if (content !== null && 'dataType' in content) {
    if (type === 'BRANDS' && content.dataType === 'BRANDS') {
      return (
        <Brand
          title={title}
          url={paths.BRAND}
          content={content.brands}
          openTab={openTab}
          setOpenTab={setOpenTab}
        />
      );
    }

    if (type === 'CATEGORY' && content.dataType === 'CATEGORIES') {
      return (
        <Header_MainCategory
          title={title}
          url={_titleURL}
          content={content.categories}
          openTab={openTab}
          setOpenTab={setOpenTab}
        />
      );
    }
  }
  if (type === 'TOPIC') {
    return <Topic title={title} url={_titleURL} showPipe={showPipe} />;
  }

  return <Topic title={title} url={_titleURL} showPipe={showPipe} />;
};

export default MenuItem;
