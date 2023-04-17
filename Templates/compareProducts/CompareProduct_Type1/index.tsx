import Price from '@appComponents/Price';
import { __LocalStorage } from '@constants/global.constant';
import { _CompareProducts } from '@definations/compare';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { _CompareProductprops } from '../CompareProduct';
import AllColors from './Components/AllColors';
import AllSizes from './Components/AllSizes';
import DisplayCompareImage from './Components/DisplayCompareImage';

const CompareProduct_Type1: React.FC<_CompareProductprops> = (props) => {
  const router = useRouter();
  const [products, setProducts] = useState<_CompareProducts | null>(
    props.products,
  );

  const removeSkuFromQueryParams = (skuToKeep: string[] | 'REMOVE ALL') => {
    if (skuToKeep === 'REMOVE ALL') {
      router.replace({ pathname: router.pathname, query: '' }, undefined, {
        shallow: true,
      });
      return;
    }

    const querySkus = skuToKeep.toString();

    router.replace({ pathname: router.pathname, query: querySkus }, undefined, {
      shallow: true,
    });
  };

  const removeSkuFromLocalStorage = (skuToKeep: string[] | 'REMOVE ALL') => {
    if (skuToKeep === 'REMOVE ALL') {
      localStorage.setItem(__LocalStorage.compareProducts, JSON.stringify([]));
      return;
    }

    localStorage.setItem(
      __LocalStorage.compareProducts,
      JSON.stringify(skuToKeep),
    );
  };

  const removeProductFromTable = (
    prods: _CompareProducts | null,
    indexToRemove: number,
  ) => {
    if (prods === null) {
      return prods;
    }

    const updated: _CompareProducts = {
      details:
        prods.details?.filter((detail, index) => index !== indexToRemove) ||
        null,
      colors:
        prods.colors?.filter((color, index) => index !== indexToRemove) || null,
      inventory:
        prods.inventory?.filter((detail, index) => index !== indexToRemove) ||
        null,
    };

    return updated;
  };

  const removeHandler = (indexToRemove: number) => {
    const skuToRemove = products?.details?.find(
      (detail, index) => index === indexToRemove,
    );

    if (skuToRemove) {
      const storedSKUs = localStorage.getItem(__LocalStorage.compareProducts);

      if (storedSKUs) {
        const skuStoredIdArr = JSON.parse(storedSKUs) as string[];

        if (skuStoredIdArr.length === 0) {
          removeSkuFromQueryParams('REMOVE ALL');
          removeSkuFromLocalStorage('REMOVE ALL');
          setProducts(null);
          return;
        }

        const skuToKeep = skuStoredIdArr.filter(
          (sku) => sku !== skuToRemove.sku,
        );

        if (skuToKeep) {
          removeSkuFromQueryParams(skuToKeep);
          removeSkuFromLocalStorage(skuToKeep);
          setProducts((prods: any) =>
            removeProductFromTable(prods, indexToRemove),
          );
          return;
        }
      }
    }
  };

  return (
    <section className='pt-[20px]'>
      <Head>
        <title>{'Compare Products'}</title>
        {/* <meta name="description" content={_SEO.desc} key="desc" />
      <meta name="keywords" content={_SEO.keywords} /> */}
      </Head>
      <div className='container mx-auto'>
        <div className='text-center pb-[60px] border-b-[1.4px] border-[#000000] relative mb-[60px]'>
          <span className='sm:text-large-text text-title-text font-[400] uppercase bg-[#ffffff] sm:px-[20px] px-[10px] sm:max-w-lg max-w-sm absolute left-0 right-0 m-auto sm:top-[40px] top-[10px]'>
            Compare Products
          </span>
        </div>
        <div className='relative overflow-auto border border-gray-border'>
          <table className='w-full'>
            {products?.details && products.details.length > 0 ? (
              <tbody className='divide-y divide-y-gray-border'>
                <DisplayCompareImage onRemove={removeHandler} />
                <tr className='divide-x divide-x-gray-border text-center text-default-text'>
                  <td style={{ verticalAlign: 'top' }}>
                    <div className='p-[8px]'>Title</div>
                  </td>
                  {products?.details?.map((product, index) => (
                    <td
                      key={index}
                      className=''
                      style={{ verticalAlign: 'top' }}
                    >
                      <div className='p-[8px]'>
                        <a href={product.seName} title={product.name}>
                          {product.name}
                        </a>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className='divide-x divide-x-gray-border text-center text-default-text'>
                  <td className=''>
                    <div className='p-[8px]'>SKU</div>
                  </td>
                  {products?.details?.map((product, index) => (
                    <td key={index} className=''>
                      <div className='p-[8px]'>{product.sku}</div>
                    </td>
                  ))}
                </tr>
                <tr className='divide-x divide-x-gray-border text-center text-default-text'>
                  <td className=''>
                    <div className='p-[8px]'>Price</div>
                  </td>
                  {products?.details?.map((product, index) => (
                    <td key={index} className=''>
                      <div className='p-[8px]'>
                        MSRP{' '}
                        <Price
                          value={undefined}
                          prices={{
                            msrp: +product.msrp,
                            salePrice: +product.salePrice,
                          }}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className='divide-x divide-x-gray-border text-center text-default-text'>
                  <td className=''>
                    <div className='p-[8px]'>Color</div>
                  </td>
                  {products?.colors?.map((colors, index) => (
                    <AllColors
                      key={index}
                      color={colors}
                      index={index}
                      seName={
                        (products.details && products.details[index].seName) ||
                        '/'
                      }
                    />
                  ))}
                </tr>
                <tr className='divide-x divide-x-gray-border text-center text-default-text'>
                  <td className=''>
                    <div className='p-[8px]'>Size</div>
                  </td>
                  {products?.inventory?.map((inventory, index) => {
                    if (inventory === null) {
                      return (
                        <td key={index} className=''>
                          <div className='p-2 flex flex-wrap gap-2 justify-center'>
                            "-"
                          </div>
                        </td>
                      );
                    }
                    return inventory.sizes.map((sizes, sIndex) => (
                      <AllSizes key={sIndex} index={index} sizes={sizes} />
                    ));
                  })}
                </tr>
                <tr className='divide-x divide-x-gray-border text-center text-default-text'>
                  <td className='pb-[10px]'>
                    <div className='p-[8px]'>Description</div>
                  </td>
                  {products?.details?.map((product, index) => (
                    <td key={index} className='pb-[10px]'>
                      <div
                        className='p-[8px]'
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      ></div>
                    </td>
                  ))}
                </tr>
              </tbody>
            ) : (
              <h3>No Result(s) Found.</h3>
            )}
          </table>
        </div>
        <div className='text-center mt-[30px] mb-[30px] flex gap-2 justify-center'>
          <input
            className='form-input sm:max-w-xs max-w-[200px]'
            placeholder='Enter Email to get this link'
            value=''
          />
          <button type='button' className='btn btn-primary'>
            SEND LINK
          </button>
        </div>
      </div>
    </section>
  );
};

export default CompareProduct_Type1;
