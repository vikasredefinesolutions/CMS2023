import AddOTFItemNo from '@appComponents/modals/addOtfItem';
import { BACARDI, _Store_CODES } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { extractCookies } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import { useState } from 'react';

const EmptyCart = () => {
  const storeCode = useTypedSelector_v2((store) => store.store.code);
  const [showOTF, setShowOTF] = useState<'OTF' | null>(null);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => !!state.employee.empId,
  );

  const selectedBacardiStor = extractCookies(
    'BacardiSelectedStore',
    'browserCookie',
  ).BacardiSelectedStore;

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
            <Link
              title=''
              href={
                storeCode == BACARDI
                  ? selectedBacardiStor === 'Bacardi'
                    ? paths.bacardi.bacardi
                    : selectedBacardiStor === 'GreyGoose'
                    ? paths.bacardi.greyGoose
                    : paths.bacardi.bacardi
                  : paths.HOME
              }
            >
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
        {storeCode === _Store_CODES.USAAHEALTHYPOINTS && (
          <div className='footer' id='MainFooter'>
            <div>
              <div className='container mx-auto white-link'>
                <div className='bg-primary'>
                  <div className='border-t border-gray-border py-[25px]'>
                    <div>
                      <div className='text-center text-xs text-white'>
                        © 2023 ParsonsKellogg Store. All Rights Reserved
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      {showOTF === 'OTF' && (
        <AddOTFItemNo closeModal={() => setShowOTF(null)} />
      )}
    </div>
  );
};

export default EmptyCart;
