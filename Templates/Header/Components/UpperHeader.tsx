import { __Cookie } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { _AnnouncementRow } from '@definations/header.type';
import { deleteCookie } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import React from 'react';
interface _props {
  headerContent: _AnnouncementRow;
}
const UpperHeader: React.FC<_props> = (headerContent) => {
  const router = useRouter();
  const { updateEmployeeV2 } = useActions_v2();
  const employeeDetails = useTypedSelector_v2((state) => state.employee);

  const leftcontent = headerContent.headerContent.leftSideText
    ? headerContent.headerContent.leftSideText
    : '';

  const rightContent = headerContent.headerContent.rightSideText
    ? headerContent.headerContent.rightSideText
    : '';

  const employeeClear = () => {
    updateEmployeeV2('CLEAN_UP');
    deleteCookie(__Cookie.empData);
    router.push(paths.HOME);
  };

  return (
    <>
      <div className=''>
        <div className='bg-primary hidden md:block'>
          <div className='container pl-[15px] pr-[15px] mx-auto'>
            <div className='flex flex-wrap justify-between items-center'>
              <div dangerouslySetInnerHTML={{ __html: leftcontent }} />
              <div className='flex items-center gap-3'>
                {employeeDetails.empId ? (
                  <>
                    <span className='text-center text-capitalize cursor-pointer'>
                      Employee logged in
                      <button
                        className='ml-1'
                        style={{ color: '#7BC24E' }}
                        onClick={() => employeeClear()}
                      >
                        (LogOut)
                      </button>
                    </span>
                    <span className='p-l-5 p-r-5'>|</span>
                  </>
                ) : null}
              </div>
              <div dangerouslySetInnerHTML={{ __html: rightContent }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpperHeader;
