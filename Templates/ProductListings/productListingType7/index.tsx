import { scrollToTop } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { GetlAllProductList } from '../ProductListingType';
import PL7_Products from './components/PL7_Products';

interface _Props {
  categories: {
    category: string;
    products: GetlAllProductList[];
  }[];
}

const ProductListingType7: React.FC<_Props> = ({ categories }) => {
  const messages = useTypedSelector_v2((state) => state.sbStore.messages);

  return (
    <section id='' className=''>
      <div className='container mx-auto'>
       
        {categories.map((item) => {
          if (!item.category || item.products.length === 0) {
            return null;
          }

          return (
            <>
              <div className='bg-tertiary border-b border-gray-border px-[15px] py-[12px] my-[30px] flex items-center justify-between flex-wrap'>
                <div className='!font-bold text-normal-text'>
                  <h2>{item.category.toUpperCase()}</h2>
                </div>
                <div onClick={() => scrollToTop()} className=''>
                  <button className='text-small-text'>RETURN TO TOP</button>
                </div>
              </div>
              <ul
                role='list'
                className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4 mb-[30px]'
              >
                {item.products.map((product) => {
                  return <PL7_Products product={product} />;
                })}
              </ul>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default ProductListingType7;
