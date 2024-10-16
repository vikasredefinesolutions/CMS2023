import CustomizeLogoSteps from '@appComponents/CustomizeLogo/CustomizeLogoSteps';
import LogosToPrint from '@appComponents/CustomizeLogo/LogosToPrint';
import NxtImage from '@appComponents/reUsable/Image';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchLogoLocationByProductId } from '@services/product.service';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface logocharges {
  isFirstLogoFree: boolean;
  isLogoSetupCharges: boolean;
  logoSetupCharges: number;
  isLinepersonalization: boolean;
  firstLineCharges: number;
  secondLineCharges: number;
  isSmallRun: boolean;
  smallRunLimit: number;
  smallRunFeesCharges: number;
  productId: number;
}

const CustomizeLogo: NextPage = () => {
  const [firstLogoFree, setFirstLogoFree] = useState<boolean>(true);
  const { sizeQtys } = useTypedSelector_v2((state) => state.product.toCheckout);
  const [showLogoComponent, setShowLogoComponent] = useState<boolean>(false);
  const availableLocation = useTypedSelector_v2(
    (state) => state.product.toCheckout.availableOptions,
  );
  const { name: productName } = useTypedSelector_v2(
    (state) => state.product.product,
  );
  const [logoCharges, setLogoCharges] = useState<logocharges>({
    isFirstLogoFree: false,
    isLogoSetupCharges: false,
    logoSetupCharges: 0,
    isLinepersonalization: false,
    firstLineCharges: 0,
    secondLineCharges: 0,
    isSmallRun: false,
    smallRunLimit: 0,
    smallRunFeesCharges: 0,
    productId: 0,
  });

  const router = useRouter();
  const { customizeId } = router?.query ?? 0;
  const { color: productColor } = useTypedSelector_v2(
    (state) => state.product.selected,
  );
  const [showOrSelect, setShowOrSelect] = useState<'SHOW' | 'SELECT'>('SELECT');

  const { clearLogoUploadHistory } = useActions_v2();

  useEffect(() => {
    if (customizeId) {
      FetchLogoLocationByProductId({ productId: +customizeId }).then((res) => {
        if (res) {
          setLogoCharges({
            isFirstLogoFree: res.isFirstLogoFree,
            isLogoSetupCharges: res.isLogoSetupCharges,
            logoSetupCharges: res.logoSetupCharges,
            isLinepersonalization: res.isLinepersonalization,
            firstLineCharges: res.firstLineCharges,
            secondLineCharges: res.secondLineCharges,
            isSmallRun: res.isSmallRun,
            smallRunLimit: res.smallRunLimit,
            smallRunFeesCharges: res.smallRunFeesCharges,
            productId: res.productId,
          });
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className='mainsection mb-[40px]'>
        <div className='container mx-auto'>
          <div className='px-[40px] py-[15px] bg-light-gray'>
            <div className='flex items-center justify-center text-title-text'>
              Apply Logo(s)
            </div>
          </div>
        </div>
      </section>
      <section className='mainsection pt-5'>
        <div className='container mx-auto'>
          <div className='border-gray border w-full p-[15px]'>
            <div className='flex flex-wrap mx-[-15px]'>
              <div className='w-full md:w-2/12 sm:w-3/12 px-[15px] mb-[15px]'>
                <div className=''>
                  <NxtImage
                    src={productColor.imageUrl}
                    alt={productColor.name}
                    className='max-h-[110px] w-auto border border-gray'
                  />
                </div>
              </div>
              <div className='w-full md:w-10/12 sm:w-9/12 px-[15px] mb-[15px]'>
                <div className='font-semibold text-sub-text mb-[10px]'>
                  {productName}
                </div>
                <div className='mb-[10px]'>
                  Color:{' '}
                  <span className='font-semibold'>{productColor.name}</span>
                </div>
                {sizeQtys !== null && (
                  <div className='mb-[10px]'>
                    Size:{' '}
                    <span className='font-semibold'>{`${sizeQtys[0].size} - ${sizeQtys[0].qty}`}</span>
                  </div>
                )}
                {sizeQtys !== null &&
                  sizeQtys.length > 1 &&
                  sizeQtys.map((sizeQty, index) => {
                    if (index === 0) return <></>;
                    return (
                      <div key={index} className='mb-[10px]'>
                        <span className='font-semibold ml-10'>{`${sizeQty.size} - ${sizeQty.qty}`}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
            {availableLocation && availableLocation?.length > 0 && (
              <div>
                {showOrSelect === 'SELECT' && (
                  <CustomizeLogoSteps
                    setShowOrSelect={setShowOrSelect}
                    firstLogoFree={logoCharges.isFirstLogoFree}
                    setShowLogoComponent={setShowLogoComponent}
                  />
                )}
                {showOrSelect === 'SHOW' && (
                  <LogosToPrint
                    setShowOrSelect={setShowOrSelect}
                    setShowLogoComponent={setShowLogoComponent}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomizeLogo;
