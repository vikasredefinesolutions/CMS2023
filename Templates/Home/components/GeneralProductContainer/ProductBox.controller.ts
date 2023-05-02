import {
  GetProductImageOptionList,
  newFetauredItemResponse,
} from '@definations/productList.type';
import { useEffect, useState } from 'react';

const ProductBoxController = ({
  product,
  colorChangeHandler,
}: {
  product: NonNullable<newFetauredItemResponse>;
  colorChangeHandler: (
    productid: number | undefined,
    seName: string | undefined,
    color: string | undefined | null,
  ) => void;
}) => {
  const [origin, setOrigin] = useState('');
  const firstImage = product?.moreImages;
  const [currentProduct, setCurrentProduct] = useState<
    GetProductImageOptionList | undefined
  >(firstImage ? firstImage[0] : undefined);

  useEffect(() => {
    setCurrentProduct(firstImage ? firstImage[0] : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return {
    currentProduct,
    origin,
    setCurrentProduct,
  };
};

export default ProductBoxController;
