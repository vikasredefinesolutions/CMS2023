import { __Cookie_Expiry } from '@constants/common.constant';
import { __Cookie, __UserMessages } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import {
  deleteCookie,
  extractCookies,
  KlaviyoScriptTag,
  setCookie,
} from '@helpers/common.helper';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { updateCartByNewUserId } from '@services/cart.service';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import {
  CreateNewAccount,
  GetStoreCustomer,
  signInUser,
} from '@services/user.service';
import { getWishlist } from '@services/wishlist.service';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SU3_Input from './Components/SU3_Input';
import {
  Option,
  su3_initialValues,
  _Signup3Schema,
  _SU3_Field,
  _SU3_Fields,
  _SU3_InitialValues,
} from './SU3.extras';

const SignUp_type3: React.FC = () => {
  const [countries, setCountries] = useState<Option[]>([]);
  const [states, setStates] = useState<Option[]>([]);
  const {
    showModal,
    updateWishListData,
    setShowLoader,
    updateCustomer,
    logInUser,
  } = useActions_v2();
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const router = useRouter();
  const handleFormikSubmit = async (values: _SU3_InitialValues) => {
    try {
      const location = await getLocation();
      setShowLoader(true);
      const payload: any = {
        storeCustomerModel: {
          ...location,
          rowVersion: '',
          macAddress: '00-00-00-00-00-00',
          firstname: values.firstname,
          lastName: values.lastName,
          email: values.email,
          location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
          password: values.password,
          confirmPassword: values.confirmPassword,
          companyName: values.companyName,
          organizationName: values.companyName,
          jobTitle: values.jobTitle,
          ipAddress: location.ip_address,
          storeId: storeId,
          customerType: 'corporate',
          industryId: 0,
          gender: '',
          memberFrom: 0,
          memberTo: 0,
          organizationId: 0,
          primaryColor: '',
          mascotId: '',
          teamGender: '',
          timeOfYearPurchase: '',
          position: '',
          navCustomerId: '',
          storeCustomerAddress: [
            {
              rowVersion: '',
              location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
              ipAddress: location.ip_address,
              macAddress: '00-00-00-00-00-00',
              customerId: 0,
              firstname: values.firstname,
              lastName: values.lastName,
              companyName: values.companyName,
              email: values.email,
              address1: values.address1,
              address2: values.address2,
              suite: '',
              city: values.city,
              state: values.state,
              postalCode: values.zipCode,
              phone: values.phone,
              fax: '',
              countryName: values.country,
              countryCode: '',
              addressType: 'B', //confirm
              isDefault: false,
              recStatus: 'A',
            },
          ],
          recStatus: 'A',
        },
      };
      const res: any = await CreateNewAccount(payload);

      if (Object.keys(res).includes('item2')) {
        showModal({
          message: __UserMessages.signUpPage.SuccessFullyAccountCreated,
          title: 'Success',
        });
      } else {
        showModal({
          message: (Object.values(res)[1] as string) || '',
          title: 'Error',
        });
      }
      signInUser({
        userName: payload.storeCustomerModel.email,
        password: payload.storeCustomerModel.password,
        storeId: storeId!,
      })
        .then((user) => {
          if (user.credentials === 'INVALID') {
            // setErrorMsg(user.message);
          }
          if (user.credentials === 'VALID') {
            logInUser({
              id: +user.id,
            });
            setCookie(__Cookie.userId, user.id, __Cookie_Expiry.userId);

            GetStoreCustomer(+user.id).then((res) => {
              if (res === null) return;
              if (localStorage) {
                const tempCustomerId = extractCookies(
                  __Cookie.tempCustomerId,
                  'browserCookie',
                ).tempCustomerId;

                if (tempCustomerId) {
                  updateCartByNewUserId(~~tempCustomerId, res.id);
                  deleteCookie(__Cookie.tempCustomerId);
                }
              }

              const userInfo = {
                $email: res.email,
                $first_name: res.firstname,
                $last_name: res.lastName,
                $phone_number: '',
                $organization: res.companyName,
                $title: 'title',
                $timestamp: new Date(),
              };

              KlaviyoScriptTag(['identify', userInfo]);
              updateCustomer({ customer: res });
              getWishlist(res.id).then((wishListResponse) => {
                updateWishListData(wishListResponse);
              });
            });
          }
        })
        .finally(() => {
          setShowLoader(false);
          // CartController();
        });
      router.push(paths.HOME);
      setShowLoader(false);
    } catch (err) {
      setShowLoader(false);
    }
  };

  const fetchStates = (id: number) => {
    FetchStatesList(id).then((res) => {
      if (res) {
        const convertedStates: Option[] = res.map((state) => ({
          name: state.name,
          value: state.name,
          id: state.id,
        }));
        setStates(convertedStates);
      }
    });
  };

  const callOptionAPIs = () => {
    FetchCountriesList().then((countriesExist) => {
      if (countriesExist) {
        const convertedCountries: Option[] = countriesExist.map((country) => ({
          name: country.name,
          id: country.id,
          value: country.name,
        }));
        setCountries(convertedCountries);
        fetchStates(countriesExist[0].id);
      }
    });
  };

  useEffect(() => {
    callOptionAPIs();
  }, []);

  return (
    <section className='container mx-auto mt-8 mb-8'>
      <Formik
        initialValues={su3_initialValues}
        onSubmit={handleFormikSubmit}
        validationSchema={_Signup3Schema}
      >
        {() => (
          <Form>
            <div className='w-full mx-auto max-w-7xl'>
              <div className='flex flex-wrap -mx-3 gap-y-6'>
                {_SU3_Fields.map((field: _SU3_Field) => (
                  <SU3_Input
                    name={field.name}
                    required={field.required}
                    label={field.label}
                    placeholder={field.placeholder}
                    type={field.type}
                    fetchStates={fetchStates}
                    options={
                      field.name === 'state'
                        ? [
                            { id: 0, name: 'Select State', value: '' },
                            ...states,
                          ]
                        : field.name === 'country'
                        ? [
                            { id: 0, name: 'Select Country', value: '' },
                            ...countries,
                          ]
                        : []
                    }
                  />
                ))}

                <div className='w-full lg:w-full px-3'>
                  <button type='submit' className='btn btn-primary'>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default SignUp_type3;
