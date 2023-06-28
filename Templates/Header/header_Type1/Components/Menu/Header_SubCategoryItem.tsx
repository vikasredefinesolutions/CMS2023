import { useActions_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import React from 'react';

interface _props {
  itemLabel: string;
  type: 'BRAND' | 'CATEGORY';
  view: 'DESKTOP' | 'MOBILE';
  sename: string;
  key: string;
}

const SubCategoryItem: React.FC<_props> = ({
  type,
  itemLabel,
  view,
  key,
  sename,
}) => {
  const { toggleSideMenu } = useActions_v2();
  if (type === 'CATEGORY') {
    if (view === 'MOBILE') {
      return (
        <>
          <li className='py-[12px] border-b border-b-gray-border' key={key}>
            <Link href={`${sename}`} passHref>
              <a
                className='inline-block pl-[70px] leading-[18px]'
                title=''
                onClick={() => toggleSideMenu('CLOSE')}
              >
                {itemLabel}
              </a>
            </Link>
          </li>
        </>
      );
    }
  }
  return <></>;
};

export default SubCategoryItem;
