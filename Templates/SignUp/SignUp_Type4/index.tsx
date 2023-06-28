import { __UserMessages } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import AddressSection from './Components/AddressSection';
import OrganizationSection from './Components/OrganizationSection';
import PersonalSection from './Components/PersonalSection';
import {
  SignupFourSchema,
  handleSignupFour,
  signupFourInitialFormValues,
} from './SU4_Extras';

const SignUp_Type4 = () => {
  const router = useRouter();
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const userId = useTypedSelector_v2((state) => state.user.id);
  const { showModal } = useActions_v2();

  const handleSignup = async (values: any) => {
    const res = handleSignupFour(values, storeId);
    if (res === null) {
      showModal({
        message: res || __UserMessages.signUpPage.SomethingWentWrong,
        title: 'Error',
      });
      return;
    }
    showModal({
      message: __UserMessages.signUpPage.SuccessFullyAccountCreated,
      title: 'Success',
    });
    router.push(paths.HOME);
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
