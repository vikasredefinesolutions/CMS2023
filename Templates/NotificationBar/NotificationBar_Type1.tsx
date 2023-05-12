import { __Cookie } from '@constants/global.constant';
import { deleteCookie } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import React from 'react';

const NotificationBar_Type1: React.FC = () => {
  // const storeLayout = useTypedSelector_v2((state) => state.store.layout);
  const { clearEmployeeDetails } = useActions_v2();
  const employeeDetails = useTypedSelector_v2((state) => state.employee);

  const employeeClear = () => {
    deleteCookie(__Cookie.empData);
    clearEmployeeDetails({});
  };

  return (
    <>
      <div className='bg-primary hidden md:block'>
        <div className='container pl-[15px] pr-[15px] mx-auto'>
          <div className='flex flex-wrap justify-between items-center'>
            <div className='flex items-center'>
              <span className='material-icons mr-[4px] text-quaternary leading-[30px]'>
                verified
              </span>
              <div className='text-[#ffffff] text-[14px] tracking-[1.4px] leading-[30px]'>
                Free Logo &amp; Proof on All Orders + Free Shipping on Orders
                Over $4K
              </div>
            </div>
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
                      <a
                        href='javascript:void(0);'
                        className='ml-1'
                        style={{ color: '#7BC24E' }}
                      >
                        (LogOut)
                      </a>
                    </button>
                  </span>
                  <span className='p-l-5 p-r-5'>|</span>
                </>
              ) : (
                ''
              )}
            </div>
            <div className='flex items-center'>
              <span className='material-icons mr-[5px] bg-tertiary rounded-full text-[16px] w-[22px] h-[22px] text-[#000000] flex items-center justify-center leading-[16px]'>
                phone
              </span>
              <div className='text-[#ffffff] text-[14px] tracking-[1.4px] leading-[30px]'>
                888-293-5648
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  // }

  // return <></>;
};

export default NotificationBar_Type1;
