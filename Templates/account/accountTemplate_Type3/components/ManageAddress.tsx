import AddAddress from '@appComponents/modals/addAddressModal';
import IOSSwitch from '@appComponents/ui/switch';
import { UserAddressType } from '@constants/enum';
import { AddressType } from '@controllers/checkoutController/CheckoutAddressForm';
import { CustomerAddress } from '@definations/APIs/user.res';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FormControlLabel } from '@mui/material';
import {
  CreateUserAddress,
  UpdateUserAddress,
  deleteCustomerAddress,
  udpateIsDefaultAddress,
} from '@services/address.service';
import { GetAdminCustomerUsers } from '@services/user.service';
import { useEffect, useState } from 'react';

const ManageAddress = () => {
  const { getStoreCustomer } = useActions_v2();
  const [showAddressPopup, setShowAddresss] = useState('');
  const [showTab, setShowTab] = useState(UserAddressType.SHIPPINGADDRESS);
  const [editData, setEditData] = useState<CustomerAddress | null>(null);
  const [address, setAddress] = useState<CustomerAddress[] | null>(null);
  const [id, setId] = useState<number | null>(null);

  const customer = useTypedSelector_v2((state) => {
    return state.user.customer;
  });

  const customerId = useTypedSelector_v2((state) => state.user.id);
  const storeId = useTypedSelector_v2((state) => state.store.id);

  useEffect(() => {
    if (customer && customer.customerAddress) {
      if (showTab === UserAddressType.OTHERUSERADDRESS) {
        getAdminCustomerUsers();
      } else {
        const data = customer.customerAddress.filter(
          (res) => res.addressType === showTab,
        );
        setAddress(data);
        if (data.length > 0) {
          setId(data[0].id);
        }
      }
    }
  }, [customer, showTab]);

  const closePopupHandler = () => {
    setShowAddresss('');
    setEditData(null);
  };

  const getAdminCustomerUsers = async () => {
    const usersData = await GetAdminCustomerUsers({
      customerid: customerId ? customerId : 0,
      storeid: storeId,
    });
    if (usersData && usersData.length > 0) {
      let otherUserAddressArr = usersData.map((userObj) => {
        return userObj.customerAddress;
      });
      setAddress(otherUserAddressArr.flat());
    } else if (usersData && usersData.length == 0) {
      setAddress([]);
    }
  };

  const submitHandler = async (values: AddressType) => {
    const data = await getLocation();
    const obj = {
      storeCustomerAddressModel: {
        id: editData ? editData.id : 0,
        rowVersion: editData ? editData.rowVersion : '',
        location: `${data.city}, ${data.region}, ${data.country}, ${data.postal_code}`,
        ipAddress: data.ip_address,
        macAddress: '00-00-00-00-00-00',
        customerId: customerId || 0,
        firstname: values.firstname,
        lastName: values.lastName,
        email: customer ? customer.email : '',
        address1: values.address1,
        address2: values.address2 || ' ',
        suite: values.suite || ' ',
        city: values.city,
        state: values.state,
        postalCode: values.postalCode,
        phone: values.phone,
        fax: values.fax,
        countryName: values.countryName,
        countryCode: '91',
        addressType: showAddressPopup,
        isDefault: values.isDefault,
        recStatus: 'A',
        companyName: values.companyName || ' ',
      },
    };
    if (editData) {
      await UpdateUserAddress(obj).then(() => setEditData(null));
    } else {
      await CreateUserAddress(obj);
    }
    await getStoreCustomer(customerId || 0);
    setShowAddresss('');
  };

  const deleteAddress = async (id: number, rowVersion: string) => {
    const isConfirm = await confirm('Are you sure? You want to delete this.');
    const location = await getLocation();
    if (isConfirm) {
      const obj = {
        args: {
          id: id,
          rowVersion: rowVersion,
          status: 0,
          location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
          ipAddress: location.ip_address,
          macAddress: '00-00-00-00-00-00',
        },
      };
      await deleteCustomerAddress(obj);
      await getStoreCustomer(customerId || 0);
    }
  };

  const handleChange = async (checked: boolean, id: number) => {
    setId(id);
    const obj = {
      isDefault: checked,
      addressId: id,
      customerId: customerId || 0,
      addressType: showTab,
    };

    await udpateIsDefaultAddress(obj);
    await getStoreCustomer(customerId || 0);
  };

  return (
    <>
      <section className=''>
        <div className='container max-w-7xl mx-auto'>
          <div
            x-data="{activeTab:01, activeClass: 'tab block text-title-text uppercase font-[600] px-[30px] py-[15px] text-medium-text !bg-[#f18a00]', inactiveClass : 'tab block bg-secondary text-title-text uppercase font-[600] px-[30px] py-[15px] text-medium-text' }"
            className='w-full mt-[50px] mb-[50px]'
          >
            <ul className='w-full flex justify-center max-w-4xl mx-auto flex-wrap'>
              <li className='font-semibold'>
                <button
                  onClick={() => setShowTab(UserAddressType.SHIPPINGADDRESS)}
                  className={`tab py-2 px-2 block btn-lg  ${
                    showTab === UserAddressType.BILLINGADDRESS ||
                    showTab === UserAddressType.OTHERUSERADDRESS
                      ? 'btn-secondary border-spacing-0'
                      : 'text-black py-[15px] block text-center uppercase btn-primary'
                  } border-0 uppercase`}
                  style={{ borderWidth: '0px' }}
                >
                  Shipping Address
                </button>
              </li>
              <li className='font-semibold'>
                <button
                  onClick={() => setShowTab(UserAddressType.BILLINGADDRESS)}
                  className={`tab py-2 px-2 block btn-lg ${
                    showTab === UserAddressType.SHIPPINGADDRESS ||
                    showTab === UserAddressType.OTHERUSERADDRESS
                      ? 'btn-secondary border-spacing-0'
                      : 'text-black py-[15px] block text-center uppercase btn-primary'
                  } uppercase`}
                  style={{ borderWidth: '0px' }}
                >
                  Billing Address
                </button>
              </li>
            </ul>
            <div className='mx-auto pt-[40px] max-w-[1050px]'>
              <div className='panel-01 tab-content pb-4'>
                <div className='flex flex-wrap lg:-mx-3 gap-y-[24px]'>
                  {address ? (
                    address.map((address_obj) => (
                      <div
                        className='w-full lg:w-1/2 lg:px-[12px]'
                        key={address_obj.id}
                      >
                        <div className='border border-[#d2d2d2]'>
                          <div className='bg-[#f5f5f6] font-[600] border-b last:border-b-0 border-[#d2d2d2] flex flex-wrap px-[20px] py-[10px]'>
                            <div className='w-2/5 text-right'>Name:</div>
                            <div className='ml-[10px]'>
                              {address_obj.firstname} {address_obj.lastName}
                            </div>
                          </div>
                          <div className='border-b last:border-b-0 border-[#d2d2d2] flex flex-wrap px-[20px] py-[10px]'>
                            <div className='w-2/5 text-right'>Address:</div>
                            <div className='ml-[10px]'>
                              {address_obj.address1} {address_obj.address2}
                              <br />
                              {[
                                address_obj.city,
                                address_obj.countryName,
                                address_obj.postalCode,
                              ].join(', ')}
                            </div>
                          </div>
                          {showTab === UserAddressType.OTHERUSERADDRESS ? (
                            <></>
                          ) : (
                            <div className='border-b last:border-b-0 border-[#d2d2d2] flex flex-wrap px-[20px] py-[10px]'>
                              <div className='w-2/5 text-right'>
                                Make Primary:
                              </div>

                              <div className='flex items-center justify-end ml-[10px]'>
                                <div className='w-16 relative'>
                                  <FormControlLabel
                                    control={
                                      <IOSSwitch
                                        onChange={(e: {
                                          target: { checked: boolean };
                                        }) => {
                                          handleChange(
                                            e.target.checked,
                                            address_obj.id,
                                          );
                                        }}
                                        sx={{ m: 1 }}
                                        checked={address_obj.id === id}
                                      />
                                    }
                                    label=''
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                          <div className='border-b last:border-b-0 border-[#d2d2d2] flex flex-wrap px-[20px] py-[10px]'>
                            <div className='w-2/5 text-right'>
                              {showTab === UserAddressType.OTHERUSERADDRESS
                                ? `Address Type:`
                                : `Action:`}
                            </div>
                            <div className='flex flex-wrap gap-x-[16px] ml-[10px]'>
                              {showTab === UserAddressType.OTHERUSERADDRESS ? (
                                <>
                                  {address_obj.addressType ===
                                  UserAddressType.SHIPPINGADDRESS
                                    ? `Shipping Address`
                                    : `Billing Address`}
                                </>
                              ) : (
                                <>
                                  <EditIcon
                                    className='svg-inline--fa fa-pencil text-primary h-[16px] w-[16px] inline-block'
                                    onClick={() => {
                                      setShowAddresss(showTab);
                                      setEditData(address_obj);
                                    }}
                                  />
                                  <DeleteIcon
                                    onClick={() =>
                                      deleteAddress(
                                        address_obj.id,
                                        address_obj.rowVersion,
                                      )
                                    }
                                    className='svg-inline--fa fa-trash-can text-red-500 h-[16px] w-[16px] inline-block'
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <section className='container mx-auto text-center'>
                        <div className='pt-[60px] pb-[30px] flex flex-col justify-center items-center '>
                          <div className='mb-[30px] mt-[15px]'>
                            <div className='text-2xl-text mb-[20px] font-bold border-rose-600'>
                              No Address Available
                            </div>
                          </div>
                        </div>
                      </section>
                    </>
                  )}
                </div>
                {showTab === UserAddressType.OTHERUSERADDRESS ? (
                  <></>
                ) : (
                  <div className='mt-[40px] text-center'>
                    <button
                      className='btn btn-primary btn-md'
                      type='button'
                      data-modal-toggle='AddNewAddress'
                      onClick={() => setShowAddresss(showTab)}
                    >
                      Add{' '}
                      {showTab === UserAddressType.SHIPPINGADDRESS
                        ? 'Shipping'
                        : 'Billing'}{' '}
                      Address
                      {/* <i className='fa fa-plus ml-1' aria-hidden='true'></i> */}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {showAddressPopup && (
        <AddAddress {...{ closePopupHandler, submitHandler, editData }} />
      )}
    </>
  );
};

export default ManageAddress;
