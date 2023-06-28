import {
  AddressAPIRequest,
  _DeleteCustomerAddressReq,
} from '@definations/APIs/address.req';
import { _Country, _State } from '@definations/app.type';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  CreateUserAddress,
  UpdateUserAddress,
  deleteCustomerAddress,
} from '@services/address.service';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  CO4_addEditInputFields,
  _CO4_AddEditInputFieldsName,
} from '../CO4_Extras';
import {
  CO4_AddEditAddressInput,
  CO4_AddEditAddressSelect,
} from './CO4_Inputs';

interface _Props {
  modalType: 'ADD' | 'EDIT';
  addressType: 'BILL' | 'SHIP';
  closeModal: (show: 'CHANGE' | null) => void;
}

const CO4_AddEditAddressModal: React.FC<_Props> = ({
  closeModal,
  modalType,
  addressType,
}) => {
  const [initialValues, setInitialValues] = useState<
    Record<_CO4_AddEditInputFieldsName, string>
  >({
    firstName: '',
    lastName: '',
    companyName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phoneNumber: '',
  });
  const [countries, setCountries] = useState<_Country[]>([]);
  const [states, setStates] = useState<_State[]>([]);

  const { getStoreCustomer } = useActions_v2();

  const editAddress = useTypedSelector_v2(
    (state) => state.checkout.address.editing,
  );
  const customerId = useTypedSelector_v2((state) => state.user.customer?.id);

  const handleSubmit = (
    inputs: Record<_CO4_AddEditInputFieldsName, string>,
  ) => {
    let payload: AddressAPIRequest = {
      storeCustomerAddressModel: {
        id: 0,
        rowVersion: '',
        location: '',
        ipAddress: '',
        macAddress: '',
        customerId: 0,
        firstname: inputs.firstName,
        lastName: inputs.lastName,
        email: '',
        address1: inputs.address1,
        address2: inputs.address2,
        suite: '',
        city: inputs.city,
        state: inputs.state,
        postalCode: inputs.zipcode,
        phone: inputs.phoneNumber,
        fax: '',
        countryName: inputs.country,
        countryCode: inputs.country,
        companyName: inputs.companyName,
        addressType: addressType === 'SHIP' ? 'S' : 'B',
        isDefault: false,
        recStatus: 'A',
      },
    };

    if (modalType === 'ADD') {
      CreateUserAddress(payload)
        .then(() => {
          closeModal('CHANGE');
        })
        .catch(() => {});
    }

    if (modalType === 'EDIT' && editAddress) {
      payload = {
        storeCustomerAddressModel: {
          ...payload.storeCustomerAddressModel,
          id: editAddress.id,
          email: editAddress.email,
          suite: editAddress.suite,
          fax: editAddress.fax,
          isDefault: editAddress.isDefault,
          recStatus: 'A',
        },
      };

      UpdateUserAddress(payload)
        .then(() => {
          closeModal('CHANGE');
        })
        .catch(() => {});
    }
  };

  const handleRemoveAddress = async () => {
    if (!editAddress || !customerId) return;

    // Take confirmation from user ( modal missing )

    const location = await getLocation();

    const payload: _DeleteCustomerAddressReq = {
      args: {
        id: editAddress.id,
        rowVersion: editAddress.rowVersion,
        status: 0,
        location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
        ipAddress: location.ip_address,
        macAddress: '00-00-00-00-00-00',
      },
    };

    deleteCustomerAddress(payload)
      .then(() => {
        getStoreCustomer(customerId);
        closeModal('CHANGE');
      })
      .catch(() => {
        // Handle if user address not deleted.
      });
  };

  const callOptionAPIs = () => {
    FetchCountriesList().then((countriesExist) => {
      if (countriesExist) {
        setCountries(countriesExist);
        FetchStatesList(countriesExist[0].id).then(
          (res) => res && setStates(res),
        );
      }
    });
  };

  useEffect(() => {
    if (editAddress) {
      setInitialValues({
        firstName: editAddress.firstname,
        lastName: editAddress.lastName,
        companyName: editAddress.companyName,
        address1: editAddress.address1,
        address2: editAddress.address2,
        city: editAddress.city,
        state: editAddress.state,
        zipcode: editAddress.postalCode,
        country: editAddress.countryCode,
        phoneNumber: editAddress.phone,
      });
    }
  }, []);

  useEffect(() => {
    callOptionAPIs();
  }, []);

  return (
    <div
      id='addshippingaddressModal'
      className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0'
    >
      <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
        <div className='relative px-[16px] w-full max-w-4xl h-full md:h-auto'>
          <div className='relative bg-[#ffffff] shadow max-h-screen overflow-y-auto h-full '>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values, handleBlur, handleChange, setFieldValue }) => {
                return (
                  <Form>
                    <div className='flex justify-between items-start p-[25px] rounded-t border-b sticky top-0 left-0 bg-[#ffffff]'>
                      <div
                        className='font-[600] text-large-text'
                        id='shippingaddresstitle'
                      >
                        {modalType === 'ADD' ? 'Add' : 'Edit'}{' '}
                        {addressType === 'SHIP' ? 'Shipping' : 'Billing'}{' '}
                        Address
                      </div>
                      <button
                        type='button'
                        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] p-[6px] ml-auto inline-flex items-center'
                        onClick={() => closeModal(null)}
                      >
                        <svg
                          className='w-[24px] h-[24px]'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fill-rule='evenodd'
                            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                            clip-rule='evenodd'
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className='p-[25px]'>
                      <div className='flex flex-wrap -mx-3 gap-y-6'>
                        {CO4_addEditInputFields.map((input) => {
                          if (input.type === 'select') {
                            let options: {
                              name: string;
                              id: string | number;
                            }[] = [];

                            switch (input.name) {
                              case 'country':
                                options = countries;
                                break;
                              case 'state':
                                options = states;
                                break;
                              default:
                                options = [];
                                break;
                            }
                            return (
                              <CO4_AddEditAddressSelect
                                key={input.name}
                                name={input.name}
                                label={input.label}
                                required={input.required}
                                value={values[input.name]}
                                fullWidth={input.fullWidth}
                                onBlur={handleBlur}
                                onChange={(ev) => {
                                  if (input.name === 'country') {
                                    FetchStatesList(+ev.target.value).then(
                                      (res) => res && setStates(res),
                                    );
                                  }
                                  handleChange(ev);
                                }}
                                options={options}
                                setFieldValue={setFieldValue}
                                noOptionText={input.noOptionFound}
                              />
                            );
                          }
                          return (
                            <CO4_AddEditAddressInput
                              key={input.name}
                              type={input.type}
                              name={input.name}
                              label={input.label}
                              required={input.required}
                              value={values[input.name]}
                              fullWidth={input.fullWidth}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          );
                        })}
                        <div className='w-full lg:w-1/2 pl-[12px] pr-[12px]'>
                          <div className='relative z-0 w-full mb-[20px]'>
                            Used for delivery questions only
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='p-[25px] text-center border-t flex justify-end gap-2'>
                      <button type='submit' className='btn btn-secondary'>
                        {modalType === 'ADD' ? 'ADD NEW' : 'UPDATE'} ADDRESS
                      </button>
                      {modalType === 'EDIT' && (
                        <button
                          onClick={() => handleRemoveAddress()}
                          className='btn btn-secondary'
                        >
                          REMOVE ADDRESS
                        </button>
                      )}
                      <button
                        type='button'
                        className='btn btn-secondary'
                        onClick={() => closeModal('CHANGE')}
                      >
                        CANCEL
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CO4_AddEditAddressModal;
