import AddOTFItemNo from '@appComponents/modals/addOtfItem';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import { useState } from 'react';

const EmptyCart = () => {
  const [showOTF, setShowOTF] = useState<'OTF' | null>(null);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => !!state.employee.empId,
  );

  return (
    <div className=''>
      <section className='container mx-auto text-center'>
        <div className='py-[12%]'>
          <div className='text-2xl-text'>{__pagesText.cart.emptyCart}</div>
          <div className='text-title-text mt-[10px]'>
            {__pagesText.cart.emptyCartMessage1}
          </div>
          <div className='text-title-text mt-[10px]'>
            {__pagesText.cart.emptyCartMessage2}
          </div>
          <div className='mt-[20px]'>
            <Link title='' href={paths.HOME}>
              <a className='btn btn-md btn-primary'>
                {' '}
                {__pagesText.cart.startShopping}
              </a>
            </Link>
          </div>
          {isEmployeeLoggedIn && (
            <div className='mt-[20px]'>
              <div onClick={() => setShowOTF('OTF')}>
                <span className='btn btn-md btn-primary'>ADD OTF ITEMS</span>
              </div>
            </div>
          )}
        </div>
      </section>
      {showOTF === 'OTF' && (
        <AddOTFItemNo closeModal={() => setShowOTF(null)} />
      )}
    </div>
  );
};

export default EmptyCart;
