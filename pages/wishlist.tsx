import { _defaultTemplates } from '@configs/template.config';
import Wishlist from '@templates/wishlist';

const WishlistPage = () => {
  return (
    <div className='pt-[30px]'>
      {/* <BreadCrumb breadCrumbid={`${1}`} /> */}
      <Wishlist id={_defaultTemplates.wishlist} />
    </div>
  );
};

export default WishlistPage;
