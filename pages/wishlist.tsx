import { _defaultTemplates } from '@configs/template.config';
import { getServerSideProps } from '@controllers/getServerSideProps';
import BreadCrumb from '@templates/breadCrumb';
import Wishlist from '@templates/wishlist';

const WishlistPage = () => {
  return (
    <div className='pt-[30px]'>
      <BreadCrumb breadCrumbid={`${1}`} />
      <Wishlist id={_defaultTemplates.wishlist} />
    </div>
  );
};

export { getServerSideProps };

export default WishlistPage;
