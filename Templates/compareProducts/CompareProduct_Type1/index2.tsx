import Price from '@appComponents/Price';
import { __LocalStorage } from '@constants/global.constant';
import { __ValidationText } from '@constants/validation.text';
import { _CompareProducts } from '@definations/compare';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { SendCompareLinkByEmail } from '@services/product.service';
import { ErrorMessage, Form, Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { _CompareProductprops } from '../CompareProduct';
import AllColors from './Components/AllColors';
import AllSizes from './Components/AllSizes';
import DisplayCompareImage from './Components/DisplayCompareImage';

const CompareProduct_Type2: React.FC<_CompareProductprops> = (props) => {
  console.log('this is working');

  const router = useRouter();
  const [products, setProducts] = useState<_CompareProducts | null>(
    props.products,
  );
  const { showModal, setShowLoader, hideModal, updateCompareDisplayImage } =
    useActions_v2();
  const { id } = useTypedSelector_v2((state) => state.user);
  const userEmail = useTypedSelector_v2((state) => state.user.customer?.email);
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(__ValidationText.email.required),
  });
  const images = useTypedSelector_v2((state) => state.compare.selectedImages);
  console.log('products ', products);

  const removeSkuFromQueryParams = (skuToKeep: string[] | 'REMOVE ALL') => {
    if (skuToKeep === 'REMOVE ALL') {
      router.replace({ pathname: router.pathname, query: '' }, undefined, {
        shallow: true,
      });
      return;
    }

    const querySkus = skuToKeep.toString();
    router.replace(`${router.pathname}?SKU=${querySkus}`);
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
      updateCompareDisplayImage({
        type: 'REMOVE',
        data: {
          index: indexToRemove,
        },
      });
      if (storedSKUs) {
        const skuStoredIdArr = JSON.parse(storedSKUs) as string[];

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
  const sendEmailHandler = async (values: { email: string }) => {
    const obj = {
      storeId: storeId,
      Email: id && userEmail ? userEmail : values.email,
      Link: encodeURIComponent(window.location.href),
    };
    setShowLoader(true);
    SendCompareLinkByEmail(obj)
      .then((res) => {
        if (res == true) {
          showModal({
            message: `Email Send Successfully `,
            title: `Success`,
          });
        } else {
          showModal({
            message: `${res}`,
            title: ``,
          });
        }
      })
      .catch((err) => {
        showModal({
          message: `${err} `,
          title: ``,
        });
      })
      .finally(() => setShowLoader(false));
  };

  const getCompareProductsText = useCallback(
    (productLength: number) => {
      if (productLength === 0)
        return ` Please select two or more products to Add to Compare to use this
    feature.`;

      //   if (productLength === 1)
      //     return ` Please select one more products to Add to Compare to use this
      // feature.`;
    },
    [products?.details?.length],
  );

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
        {products?.details && products.details.length <= 0 ? (
          <div className='relative overflow-auto border border-gray-border'>
            <div className='text-center pb-[10px] border-b-[1.4px] border-[#000000] relative '>
              {getCompareProductsText(products?.details?.length)}
            </div>
          </div>
        ) : null}
        {products?.details && products.details.length >= 1 ? (
          <>
            {' '}
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
                            (products.details &&
                              products.details[index].seName) ||
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
            <div className=' mt-[30px] mb-[30px]  gap-2 '>
              <Formik
                initialValues={{ email: userEmail ? userEmail : '' }}
                onSubmit={sendEmailHandler}
                validationSchema={validationSchema}
              >
                {({ values, handleChange }) => {
                  return (
                    <Form className='flex flex-wrap mt-[2px] text-center justify-center'>
                      {!userEmail ? (
                        <input
                          className='form-input sm:max-w-xs max-w-[200px]'
                          placeholder='Enter Email to get this link'
                          type='text'
                          name='email'
                          autoComplete='off'
                          value={values.email}
                          onChange={handleChange}
                        />
                      ) : (
                        <></>
                      )}

                      <button
                        type='submit'
                        className='btn btn-primary mx-[10px]'
                      >
                        SEND LINK
                      </button>
                      <button
                        type='button'
                        className='btn btn-primary'
                        onClick={() => {
                          navigator.clipboard
                            .writeText(window.location.href)
                            .then(() =>
                              showModal({
                                message: 'Link copy successfully.',
                                title: 'Information',
                              }),
                            );
                          setTimeout(() => hideModal(), 1000);
                        }}
                      >
                        COPY LINK
                      </button>

                      {!userEmail && (
                        <div className='mt-3 mx-2'>
                          <ErrorMessage
                            name={'email'}
                            className='text-rose-500'
                          />
                        </div>
                      )}
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default CompareProduct_Type2;
