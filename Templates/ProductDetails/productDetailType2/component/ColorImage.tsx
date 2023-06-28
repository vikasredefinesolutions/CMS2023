import NxtImage from '@appComponents/reUsable/Image';
import { _ProductColor } from '@definations/APIs/colors.res';

interface _props {
  product: _ProductColor;
}

const ColorImage: React.FC<_props> = ({ product }) => {
  return (
    <>
      {' '}
      <NxtImage
        title={`${product.name}`}
        src={product.imageUrl}
        alt={product.altTag}
        className='max-h-full m-auto'
      />
    </>
  );
};
export default ColorImage;
