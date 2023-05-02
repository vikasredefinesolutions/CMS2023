import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import Link from 'next/link';

const EmptyCart = () => {
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
              <a className='btn btn-md btn-secondary'>
                {' '}
                {__pagesText.cart.startShopping}
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmptyCart;
