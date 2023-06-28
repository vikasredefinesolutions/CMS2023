import { useActions_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import React from 'react';

interface _props {
  itemLabel: string;
  type: 'BRAND' | 'CATEGORY';
  view: 'DESKTOP' | 'MOBILE';
  url?: string;
}

const SubCategoryItem: React.FC<_props> = ({ type, itemLabel, view, url }) => {
  //   const { toggleSideMenu } = useActions_v2();
  const { toggleSideMenu } = useActions_v2();
  if (type === 'CATEGORY') {
    if (view === 'MOBILE') {
      return (
        <li className='py-[12px] border-b border-b-gray-border' key={itemLabel}>
          <Link href={url ? `/${url}` : 'javascript:void(0);'}>
            <a
              className='inline-block pl-[70px] leading-[18px] text-[#000000]'
              title=''
              onClick={() => toggleSideMenu('CLOSE')}
            >
              {itemLabel}
            </a>
          </Link>
        </li>
      );
    }
  }
  if (type === 'BRAND') {
    if (view === 'MOBILE') {
      return (
        <li className='py-[12px] border-b border-b-gray-border'>
          <Link href={url ? url : 'javascript:void(0);'} passHref>
            <a
              className='inline-block pl-[70px] leading-[18px] text-[#000000]'
              title=''
              onClick={() => toggleSideMenu('CLOSE')}
            >
              {itemLabel}
            </a>
          </Link>
        </li>
      );
    }
  }
  return <></>;
};

export default SubCategoryItem;
