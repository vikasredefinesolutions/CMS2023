/* eslint-disable no-unused-vars */
import AddUserModal from '@appComponents/modals/addUserModal';
import { __LocalStorage } from '@constants/global.constant';
import { __pagesConstant } from '@constants/pages.constant';
import {
  CommanMessage,
  UserManagement as UserMessage,
} from '@constants/successErrorMessages.constant';
import { _User } from '@definations/user.type';
import { Logout } from '@helpers/common.helper';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  AddCustomerUser,
  UpdateCustomerUser,
  deleteCustomerUserList,
  getCustomerUserList,
} from '@services/customerUser.service';
import {
  CustomerAddResponse,
  CustomerUsersObject,
} from '@services/responses/customerUser';
import moment from 'moment';
import { useEffect, useState } from 'react';

export type User = {
  email: string;
  createdDate?: Date;
  role: string;
  lastLoggedIn?: Date;
  firstName: string;
  lastName: string;
};

const UserManagement = () => {
  const {
    showModal,
    setShowLoader,
    setWishListEmpty,
    updateEmployeeV2,
    product_employeeLogin,
    logoutClearCart,
    logInUser,
  } = useActions_v2();
  const customer = useTypedSelector_v2((state) => state.user.customer);
  const store = useTypedSelector_v2((state) => state.store.id);
  const [userList, setUserList] = useState<CustomerUsersObject[] | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editData, setEditData] = useState<CustomerUsersObject | null>(null);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.empId,
  );
  const closeModal = () => {
    setShowAddUserModal(false);
    setEditData(null);
  };

  const logoutHandler = () => {
    if (isEmployeeLoggedIn) {
      updateEmployeeV2('CLEAN_UP');
      product_employeeLogin('MinQtyToOne_CleanUp');
      localStorage.removeItem(__LocalStorage.empData);
      localStorage.removeItem(__LocalStorage.empGuest);
    }

    logoutClearCart();
    setWishListEmpty([]);
    Logout(logInUser);
  };

  const fetchUserList = async () => {
    const userList = await getCustomerUserList(customer?.id || 0);
    if (userList) {
      setUserList(userList);
    }
  };
  useEffect(() => {
    if (customer?.id) {
      fetchUserList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer?.id]);

  const submitHandler = async (
    values: _User,
    formikProps: {
      setFieldError: (arg0: string, arg1: string | undefined) => void;
    },
  ) => {
    const location = await getLocation();
    const isUpdating = Boolean(editData);
    const userObject = {
      storeCustomerUsersModel: {
        id: isUpdating ? editData?.id : 0,
        rowVersion: '',
        location: location.country,
        ipAddress: location.ip_address,
        macAddress: '00-00-00-00-00-00',
        firstname: values.firstName ? values.firstName : '',
        lastName: values.lastName ? values.lastName : '',
        email: values.email,
        customerRoleId: values.role,
        customerId: customer?.id ? customer.id : 0,
        storeId: store,
        recStatus: 'A',
      },
    };
    setShowLoader(true);
    try {
      const res = (await (isUpdating ? UpdateCustomerUser : AddCustomerUser)(
        userObject,
      )) as unknown as CustomerAddResponse;
      if (res) {
        showModal({
          message: isUpdating
            ? UserMessage.UpdatedSuccessfully
            : UserMessage.AddedSuccessfully,
          title: 'Success',
        });

        fetchUserList();
        closeModal();
      } else {
        if (res['storeCustomerUsersModel.Email']) {
          formikProps.setFieldError(
            'email',
            res['storeCustomerUsersModel.Email'],
          );
        } else {
          showModal({ message: CommanMessage.Failed, title: 'Failed' });
          closeModal();
        }
      }
    } catch (error) {
      closeModal();
      showModal({ message: CommanMessage.Failed, title: 'Failed' });
    }
    setShowLoader(false);
  };
  const isAdmin =
    customer?.customerRoleId === 0 || customer?.customerRoleId === 4
      ? true
      : false;
  const deleteUser = async (customerId: number) => {
    const isConfirm = await confirm('Are you sure? You want to delete this.');
    if (isConfirm) {
      setShowLoader(true);
      try {
        await deleteCustomerUserList(customerId);
        await fetchUserList();
        showModal({
          message: UserMessage.DeletedSuccessfully,
          title: 'Success',
        });
      } catch (error) {
        showModal({ message: CommanMessage.Failed, title: 'Failed' });
      }
      setShowLoader(false);
    }
  };

  return (
    <>
      <section className='pt-[40px] pb-[50px]'>
        <div className='container mx-auto'>
          <div className='mx-auto space-y-10 sm:px-[16px] lg:px-0 pb-[8px]'>
            <div className='bg-[#ffffff] border-t border-b border-gray-border sm:border'>
              <div className='flex items-center p-[10px] pr-[20px] bg-light-gray border-b p-2 sm:p-4'>
                <div className=''>User Details</div>
              </div>
              <ul
                role='list'
                className='divide-y divide-border-gray-border text-default-text bg-light-gray px-[20px]'
              >
                <li className='p-2 sm:p-4'>
                  <div className='flex flex-wrap'>
                    <div className='w-full lg:w-1/3'>
                      {customer?.firstname} {customer?.lastName}
                    </div>
                    <div className='w-full lg:w-1/3'>
                      Created on:{' '}
                      {customer && customer.createdDate
                        ? moment(customer.createdDate).format(
                            __pagesConstant._myAccount.userManagement
                              .dateFormat,
                          )
                        : '-'}
                    </div>
                    <div className='w-full lg:w-1/3'>
                      {customer && customer.customerRoleId === 1
                        ? 'You are a User'
                        : 'You have admin acceess'}
                    </div>
                  </div>
                </li>
                <li className='p-2 sm:p-4'>
                  <div className='flex flex-wrap'>
                    <div className='w-full lg:w-1/3'>{customer?.email}</div>
                    <div className='w-full lg:w-1/3'>
                      Last log on:{' '}
                      {moment().format(
                        __pagesConstant._myAccount.userManagement.dateFormat,
                      )}
                    </div>
                    <div className='w-full lg:w-1/3'>
                      <button onClick={logoutHandler}>Logout</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {isAdmin && (
              <div className='bg-[#ffffff] sm:border overflow-auto'>
                <table className='table w-full border border-gray-border'>
                  <thead className=''>
                    <tr className='divide-x divide-border-gray-border text-left text-default-text bg-light-gray'>
                      <th className='px-[12px] py-[14px]'>Username</th>
                      <th className='px-[12px] py-[14px]'>Role</th>
                      {/* <th className='px-[12px] py-[14px]'>Rec Status</th> */}
                      <th className='px-[12px] py-[14px]'>Email Address</th>
                      <th className='px-[12px] py-[14px]'>Created date</th>
                      {/* <th className='px-[12px] py-[14px]'>Action</th> */}
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-border-gray-border text-left text-default-text'>
                    {userList &&
                      userList.map((user, index) => (
                        <tr key={index} className=''>
                          <td className='border-b border-r border-gray-border px-[12px] py-[12px]'>
                            {user.firstname} {user.lastname}
                          </td>
                          <td className='border-b border-r border-gray-border px-[12px] py-[12px]'>
                            {user.customerRoleName}
                          </td>
                          {/* <td className='border-b border-r border-gray-border px-[12px] py-[12px]'>
                            {user.recStatus}
                          </td> */}
                          <td className='border-b border-r border-gray-border px-[12px] py-[12px]'>
                            {user.email}
                          </td>
                          <td className='border-b border-r border-gray-border px-[12px] py-[12px]'>
                            {moment(user.createdDate).format(
                              __pagesConstant._myAccount.userManagement
                                .dateFormat,
                            )}
                          </td>
                          {/* <td className='border-b border-r border-gray-border px-[12px] py-[12px]'>
                            <div className='flex flex-wrap gap-x-0 md:gap-x-4'>
                              <EditIcon
                                className='text-primary'
                                onClick={() => {
                                  setEditData(user);
                                  setShowAddUserModal(true);
                                }}
                              />
                              <DeleteIcon
                                onClick={() => deleteUser(user?.id || 0)}
                                className='text-red-500'
                              />
                            </div>
                          </td> */}
                        </tr>
                      ))}
                  </tbody>
                </table>
                {!userList?.length ? (
                  <div className='text-center col-span-8 p-2'>
                    No record found.
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      {showAddUserModal && (
        <AddUserModal
          store={store}
          submitHandler={submitHandler}
          closeModal={closeModal}
          editData={editData}
        />
      )}
    </>
  );
};

export default UserManagement;
