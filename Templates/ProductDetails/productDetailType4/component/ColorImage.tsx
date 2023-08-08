import NxtImage from '@appComponents/reUsable/Image';
import { _ProductColor } from '@definations/APIs/colors.res';

interface _props {
  product: _ProductColor;
}

const ColorImage: React.FC<_props> = ({ product }) => {
  return (
    <NxtImage
      title={`${product.name}`}
      src={product.imageUrl}
      alt={product.altTag}
      // className='w-full object-center object-cover cursor-pointer'
      className='max-h-full m-auto cursor-pointer'
    />
  );
};
export default ColorImage;
