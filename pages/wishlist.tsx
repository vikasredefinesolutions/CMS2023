import { getServerSideProps } from '@controllers/getServerSideProps';
import Wishlist from '@templates/wishlist';

const WishlistPage = () => {
  return (
    <>
      <Wishlist id='1' />
    </>
  );
};

export { getServerSideProps };

export default WishlistPage;
