import { __Cookie_Expiry } from '@constants/common.constant';
import { __Cookie, __UserMessages } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import {
  deleteCookie,
  extractCookies,
  KlaviyoScriptTag,
  setCookie,
} from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { updateCartByNewUserId } from '@services/cart.service';
import { GetStoreCustomer, signInUser } from '@services/user.service';
import { getWishlist } from '@services/wishlist.service';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import AddressSection from './Components/AddressSection';
import OrganizationSection from './Components/OrganizationSection';
import PersonalSection from './Components/PersonalSection';
import {
  handleSignupFour,
  signupFourInitialFormValues,
  SignupFourSchema,
} from './SU4_Extras';

const SignUp_Type4 = () => {
  const router = useRouter();
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const userId = useTypedSelector_v2((state) => state.user.id);
  const {
    showModal,
    updateWishListData,
    setShowLoader,
    updateCustomer,
    logInUser,
  } = useActions_v2();
  const handleSignup = async (values: any) => {
    const res = await handleSignupFour(values, storeId);
    if (res?.data === null) {
      showModal({
        message: __UserMessages.signUpPage.SomethingWentWrong,
        title: 'Error',
      });
      return;
    }
    showModal({
      message: __UserMessages.signUpPage.SuccessFullyAccountCreated,
      title: 'Success',
    });
    try {
      await signInUser({
        userName: values.email,
        password: values.password,
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
    } catch (err) {}
    router.push(paths.HOME);
    // router.push(paths.HOME);
  };

  if (userId) {
    router.push(paths.HOME);
  }

  return (
    <section className='container mx-auto mt-8 mb-8'>
      <Formik
        validationSchema={SignupFourSchema}
        onSubmit={handleSignup}
        initialValues={signupFourInitialFormValues}
      >
        {() => (
          <Form>
            <PersonalSection />
            <OrganizationSection />
            <AddressSection />
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default SignUp_Type4;
