import { paths } from '@constants/paths.constant';
import Link from 'next/link';

const EmptyCart = () => {
  return (
    <div className=''>
      <section className='container mx-auto text-center'>
        <div className='py-[12%]'>
          <div className='text-2xl-text'>Your Cart is Empty.</div>
          <div className='text-title-text mt-[10px]'>
            There's nothing in your cart.
          </div>
          <div className='text-title-text mt-[10px]'>
            Not to worry: we have lots of other great finds.
          </div>
          <div className='mt-[20px]'>
            <Link title='' href={paths.HOME}>
              <a className='btn btn-md btn-secondary'>START SHOPPING</a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmptyCart;
