import React from 'react';

interface _props {
  itemLabel: string;
  type: 'BRAND' | 'CATEGORY';
  view: 'DESKTOP' | 'MOBILE';
}

const SubCategoryItem: React.FC<_props> = ({ type, itemLabel, view }) => {
  if (type === 'CATEGORY') {
    if (view === 'MOBILE') {
      return (
        <li className='py-[12px] border-b border-b-gray-border'>
          <a
            className='inline-block pl-[70px] leading-[18px] text-[#000000]'
            title=''
            href='javascript:void(0);'
          >
            {itemLabel}
          </a>
        </li>
      );
    }
  }
  return <></>;
};

export default SubCategoryItem;
