import NxtImage from '@appComponents/reUsable/Image';
import { _ProductColor } from '@definations/APIs/colors.res';

interface _props {
  product: _ProductColor;
}

const ColorImage_Type3: React.FC<_props> = ({ product }) => {
  return (
    <NxtImage
      title={`${product.name}`}
      src={product.imageUrl}
      alt={product.altTag}
      className='m-auto cursor-pointer max-h-full'
    />
  );
};
export default ColorImage_Type3;
