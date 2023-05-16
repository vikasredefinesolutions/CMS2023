import { _defaultTemplates } from '@configs/template.config';
import { getServerSideProps } from '@controllers/getServerSideProps';
import BreadCrumb from '@templates/breadCrumb';
import Wishlist from '@templates/wishlist';

const WishlistPage = () => {
  return (
    <>
      <BreadCrumb breadCrumbid={`${1}`} />
      <Wishlist id={_defaultTemplates.wishlist} />
    </>
  );
};

export { getServerSideProps };

export default WishlistPage;
