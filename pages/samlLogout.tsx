import { Logout } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SSOLogoutPage: NextPage = () => {
  const [showErroMsg, setErrorMsg] = useState<null | string>(null);
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const router = useRouter();
  const query = router.query;
  const { setWishListEmpty, logoutClearCart, logInUser } = useActions_v2();
  const logoutHandler = () => {
    setWishListEmpty([]);
    Logout(logInUser);
    logoutClearCart();
  };
  useEffect(() => {
    logoutHandler();
  }, []);

  return (
    <div className=''>
      <section className='container mx-auto text-center'>
        <div className='pt-[60px] pb-[30px] flex flex-col justify-center items-center '>
          <div className='text-center mb-[40px]'></div>
          <div className='mb-[30px] mt-[15px]'>Logout sucessfull</div>
        </div>
      </section>
    </div>
  );
};
export default SSOLogoutPage;
