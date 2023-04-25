import { _defaultTemplates } from '@configs/template.config';
import { getServerSideProps } from '@controllers/getServerSideProps';
import Wishlist from '@templates/wishlist';

const WishlistPage = () => {
  return (
    <>
      <Wishlist id={_defaultTemplates.wishlist} />
    </>
  );
};

export { getServerSideProps };

export default WishlistPage;
