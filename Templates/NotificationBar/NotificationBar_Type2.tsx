import React from 'react';

const NotificationBar_Type2: React.FC = () => {
  // const storeLayout = useTypedSelector_v2((state) => state.store.layout);
  // const { clearEmployeeDetails } = useActions_v2();
  // const employeeDetails = useTypedSelector_v2((state) => state.employee);

  // const employeeClear = () => {
  //   clearEmployeeDetails({});
  //   localStorage.removeItem('empData');
  // };

  return (
    <div className='bg-white text-black py-1 hidden md:block text-sm'>
      <div className='container mx-auto'>
        <div className='w-full items-center text-center'>
          <div className='items-center'>
            Email:
            <a href='mailto:info@drivingi.com' title='info@drivingi.com'>
              info@drivingi.com
            </a>
            <span className='mx-2'>OR</span> Call:
            <a href='tel:+18887374864' title='888.737.4864'>
              888.737.4864
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBar_Type2;
