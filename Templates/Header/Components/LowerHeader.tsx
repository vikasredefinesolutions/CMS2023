import { _AnnouncementRow } from '@definations/header.type';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';
interface _props {
  content: _AnnouncementRow[];
}
const LowerHeader: React.FC<_props> = ({ content }) => {
  const storeCode = useTypedSelector_v2((state) => state.store.code);

  if (content.length <= 1) return null;
  const leftcontent = content[1].leftSideText || '';
  const rightContent = content[1].rightSideText || '';

  return (
    <>
      {/* <div
        className={`${headerContent.headerContent.textColor} ${headerContent.headerContent.backgroundColor} flex flex-wrap justify-between`}
      >
        <div dangerouslySetInnerHTML={{ __html: leftcontent }} />
        <div dangerouslySetInnerHTML={{ __html: rightContent }} />
      </div> */}
      {storeCode === 'PKHG' ? (
        <>
          <div className={`w-full top-banner-msg`}>
            {!rightContent ? (
              <div
                style={{
                  backgroundColor: `${content[1].backgroundColor}`,
                  color: `${content[1].textColor}`,
                }}
                className='w-full mx-auto text-center pt-[10px] pb-[10px]'
                dangerouslySetInnerHTML={{ __html: leftcontent }}
              ></div>
            ) : (
              <>
                <div className='container-fluid mx-auto text-center'>
                  <div dangerouslySetInnerHTML={{ __html: leftcontent }} />
                  <div dangerouslySetInnerHTML={{ __html: rightContent }} />
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className={`flex flex-wrap justify-between`}>
            {!rightContent ? (
              <div
                style={{
                  backgroundColor: `${content[1].backgroundColor}`,
                  color: `${content[1].textColor}`,
                }}
                className='w-full mx-auto text-center pt-[10px] pb-[10px]'
                dangerouslySetInnerHTML={{ __html: leftcontent }}
              ></div>
            ) : (
              <>
                <div className='text-center'>
                  <div dangerouslySetInnerHTML={{ __html: leftcontent }} />
                  <div dangerouslySetInnerHTML={{ __html: rightContent }} />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default LowerHeader;
