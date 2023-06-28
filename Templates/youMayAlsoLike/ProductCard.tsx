import Price from '@appComponents/Price';
import NxtImage, {
  default as ImageComponent,
} from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import { _ProductsAlike } from '@definations/APIs/productDetail.res';
import { splitproductList } from '@definations/productList.type';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ProductCard = ({ product }: { product: _ProductsAlike }) => {
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const { mediaBaseUrl } = useTypedSelector_v2((state) => state.store);
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState({
    image: '',
    seName: '',
    name: '',
  });
  useEffect(() => {
    setSelectedProduct({
      seName: product.seName,
      image: product.image,
      name: product.name,
    });
  }, []);

  return (
    <div className='slide-item'>
      <div className='px-2'>
        <div className='flex text-center lg:w-auto mb-6'>
          <div className='relative pb-4 w-full'>
            <div className='w-full rounded-md overflow-hidden aspect-w-1 aspect-h-1'>
              <div className='relative cursor-pointer'>
                {/* Issue: Using functional components as child of <Link/> causes ref-warnings */}
                <Link href={`${selectedProduct.seName}.html`}>
                  <a>
                    <NxtImage
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className='max-h-[348px] !inline-black m-auto'
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className='mt-6'>
              <div className='mt-1 text-anchor hover:text-anchor-hover h-[42px] underline'>
                <Link
                  href={`${selectedProduct.seName}.html`}
                  className='text-anchor hover:text-anchor-hover underline  text-ellipsis overflow-hidden underline line-clamp-2 text-small-text bloc'
                >
                  {selectedProduct.name}
                </Link>
              </div>
              <div className='mt-3 text-[#000000] text-base tracking-wider'>
                <span className='font-[600]'>
                  {' '}
                  {customerId
                    ? __pagesText.productListing.PRICE
                    : __pagesText.productListing.MSRP}
                  <Price value={customerId ? product.lowPrice : product.msrp} />
                </span>
              </div>
            </div>
            <div>
              {product?.splitproductList && (
                <ul
                  role='list'
                  className='flex flex-wrap items-center mt-2 justify-center gap-[5px]'
                >
                  <li
                    key={product.id}
                    className={`w-7 h-7 border-2 ${
                      selectedProduct.seName === product.seName
                        ? 'border-primary'
                        : ''
                    } hover:border-primar`}
                    onClick={() => router.push(product.seName)}
                    onMouseEnter={() =>
                      setSelectedProduct({
                        image: product.image,
                        seName: product.seName,
                        name: product.name,
                      })
                    }
                    onMouseLeave={() =>
                      setSelectedProduct({
                        image: product.image,
                        seName: product.seName,
                        name: product.name,
                      })
                    }
                  >
                    <ImageComponent
                      src={mediaBaseUrl + product.image}
                      alt='no image'
                      className='max-h-full m-auto'
                      title={product.name}
                    />
                  </li>
                  {product?.splitproductList?.map(
                    (option: splitproductList) => (
                      <li
                        key={option.prodcutId}
                        className={`w-7 h-7 border-2 ${
                          selectedProduct.seName === option.seName
                            ? 'border-primary'
                            : ''
                        } hover:border-primar`}
                        onClick={() => router.push(option.seName)}
                        onMouseEnter={() =>
                          setSelectedProduct({
                            image: option.imageurl,
                            seName: option.seName,
                            name: option.name,
                          })
                        }
                        onMouseLeave={() =>
                          setSelectedProduct({
                            image: product.image,
                            seName: product.seName,
                            name: product.name,
                          })
                        }
                      >
                        <ImageComponent
                          src={mediaBaseUrl + option.imageurl}
                          alt='no image'
                          className='max-h-full m-auto'
                          title={option.colorName}
                        />
                      </li>
                    ),
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
