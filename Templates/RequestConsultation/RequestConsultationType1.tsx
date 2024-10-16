import NxtImage from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchStoreConfigurations } from '@services/app.service';
import { _CartItem } from '@services/cart';
import YouMayAlsoLike from '@templates/youMayAlsoLike';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import RcFeatures from './Components/RcFeatures';
import RcForm from './Components/RcForm';
import RcOrderSummary from './Components/RcOrderSummary';
import { _RequestConsultationProps } from './requestConsultation';

const RequestConsultationType1: React.FC<_RequestConsultationProps> = ({
  details,
  color,
  alike,
  seo,
}) => {
  const router = useRouter();
  const cartItems = useTypedSelector_v2((state) => state.cart.cart);
  const [itemInCart, setItemInCart] = useState<null | _CartItem>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [youmayalsolikeId, setyoumayalsolikeId] = useState<string>('');
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  useEffect(() => {
    FetchStoreConfigurations({
      storeId: storeId,
      configname: 'productDetail',
    }).then((data) => {
      if (data) {
        const obj = JSON.parse(data?.config_value || '{}');
        setyoumayalsolikeId(obj.productDetailTemplateId);
      }
    });
  }, []);
  useEffect(() => {
    if (cartItems?.length && details?.id) {
      const product = cartItems?.find((item) => item.productId === details.id);
      if (product) {
        setItemInCart(product);
      }
    }
  }, [cartItems, details?.id]);
  return (
    <>
      <Head>
        <title>{seo?.pageTitle || details?.name || ''}</title>
        <meta
          name='description'
          content={seo?.metaDescription || details?.description || ''}
          key='desc'
        />
        <meta
          name='keywords'
          content={seo?.metaKeywords || details?.name || ''}
        />
      </Head>
      {details && (
        <section className='container pl-[15px] pr-[15px] mx-auto'>
          <div>
            <div className='font-bold text-2xl-text mb-[13px] text-center text tracking-[1.4px]'>
              {__pagesText.requestConsultation.heading}
            </div>
            <div className='border border-gray-400 pt-[12px] pb-[12px] px-[20px]'>
              <div className='flex flex-wrap -mx-[15px]'>
                <div className='w-full lg:w-4/12 md:w-full text-center pl-[15px] pr-[15px] mb-[30px]'>
                  <div className=''>
                    <NxtImage
                      src={color?.imageUrl || ''}
                      alt={details.name}
                      className='w-full object-center object-cover sm:rounded-lg'
                      title={details.name}
                    />
                  </div>
                  <div className='pt-[10px]'>
                    <button
                      className='text-medium-text font-bold'
                      onClick={() => router.back()}
                    >
                      {details.name}
                    </button>
                  </div>
                </div>
                <RcForm
                  productId={details.id}
                  attriubteOptionId={color?.attributeOptionId || 0}
                  formSubmit={formSubmitted}
                  setFormSubmit={setFormSubmitted}
                />
                <div className='w-full lg:w-4/12 px-[15px]'>
                  {itemInCart && !formSubmitted ? (
                    <RcOrderSummary item={itemInCart} />
                  ) : (
                    <RcFeatures />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            {youmayalsolikeId && (
              <YouMayAlsoLike product={alike} id={`${youmayalsolikeId}`} />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default RequestConsultationType1;
