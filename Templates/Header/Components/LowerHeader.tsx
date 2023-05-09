import { _AnnouncementRow } from '@definations/header.type';
import React from 'react';

interface _props {
  headerContent: _AnnouncementRow;
}
const LowerHeader: React.FC<_props> = (headerContent) => {
  const leftcontent = headerContent.headerContent.leftSideText
    ? headerContent.headerContent.leftSideText
    : '';
  const rightContent = headerContent.headerContent.rightSideText
    ? headerContent.headerContent.rightSideText
    : '';
  return (
    <>
      <div
        className={`${headerContent.headerContent.textColor} ${headerContent.headerContent.backgroundColor} flex flex-wrap justify-between`}
      >
        <div dangerouslySetInnerHTML={{ __html: leftcontent }} />
        <div dangerouslySetInnerHTML={{ __html: rightContent }} />
      </div>
    </>
  );
};

export default LowerHeader;
