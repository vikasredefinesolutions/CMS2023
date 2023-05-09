import { _AnnouncementRow } from '@definations/header.type';
import React from 'react';
interface _props {
  headerContent: _AnnouncementRow;
}
const UpperHeader: React.FC<_props> = (headerContent) => {
  const leftcontent = headerContent.headerContent.leftSideText
    ? headerContent.headerContent.leftSideText
    : '';
  const rightContent = headerContent.headerContent.rightSideText
    ? headerContent.headerContent.rightSideText
    : '';
  return (
    <>
    <div className='bg-primary hidden md:block'>
        <div className='container pl-[15px] pr-[15px] mx-auto'>
          <div className='flex flex-wrap justify-between items-center'>
              <div dangerouslySetInnerHTML={{ __html: leftcontent }} />
              <div dangerouslySetInnerHTML={{ __html: rightContent }} />
          </div>
        </div>

    </div>
     
    </>
  );
};

export default UpperHeader;
