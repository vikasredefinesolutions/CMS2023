import { _Store } from '@configs/page.config';
import { THD_STORE_CODE, _Store_CODES } from '@constants/global.constant';
import { __pagesConstant } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { _ProductColor } from '@definations/APIs/colors.res';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ColorImage_Type3 from './ColorImage_Type3';

// import ColorImage from './ColorImage';
const AvailableColors_Type3: React.FC = () => {
  const store_Code = useTypedSelector_v2((state) => state.store.code);
  const router = useRouter();
  const { setColor, clearToCheckout } = useActions_v2();
  const selectedColor = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );
  const [showAllColors, setShowAllColors] = useState(false);
  const colors = useTypedSelector_v2((state) => state.product.product.colors);
  const handleChooseColor = (product: _ProductColor) => {
    if (
      (!product.productSEName ||
        product.productSEName === '' ||
        selectedColor.productSEName == product.productSEName) &&
      selectedColor.attributeOptionId !== product.attributeOptionId
    ) {
      clearToCheckout();
      setColor(product);
    }
  };
  if (colors === null) return <></>;
  const colorsCount = colors.length;
  const showAllColorsButton =
    colorsCount > __pagesConstant._productDetails.imagesInRow;

  return (
    <>
      <div className='flex align-top mb-[15px] items-center'>
        <div
          className={`w-[128px] ${
            store_Code == _Store.type6 ? 'text-sm' : ' text-default-text'
          }`}
        >
          <span
            className={`${
              store_Code == _Store.type6 ? 'text-sm' : ''
            }  font-bold`}
          >
            {' '}
            {__pagesText.productInfo.availableColors.colors}
          </span>
        </div>
        <div
          className={`flex flex-wrap gap-1 ${
            store_Code == _Store.type6 ? 'text-sm' : 'text-default-text'
          } text-center`}
        >
          {colors.map((product, index) => {
            const show =
              showAllColors ||
              index < __pagesConstant._productDetails.imagesInRow;
            const highlight =
              product.attributeOptionId === selectedColor?.attributeOptionId
                ? 'border-secondary'
                : 'border-slate-200 border-gray-border';
            return (
              <>
                {show ? (
                  <button
                    className={` ${
                      store_Code === THD_STORE_CODE ||
                      store_Code === _Store_CODES.USAAPUNCHOUT
                        ? 'border-2'
                        : 'border'
                    } hover:border-quaternary p-[1px] w-[32px] h-[32px] cursor-pointer 111 ${highlight}`}
                    key={product.attributeOptionId}
                    onClick={(e) => {
                      e.preventDefault();
                      handleChooseColor(product);
                    }}
                  >
                    <ColorImage_Type3 product={product} />
                  </button>
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </div>
        {showAllColorsButton && (
          <div className='text-right text-anchor hover:text-anchor-hover ml-[10px]'>
            <button
              onClick={() => setShowAllColors((showAll) => !showAll)}
              className=' underline'
            >
              {showAllColors ? (
                <span className='span1'>
                  {__pagesText.productInfo.availableColors.showless}
                </span>
              ) : (
                <>
                  <span className='span1'>
                    {__pagesText.productInfo.availableColors.seeAll}
                  </span>
                  <span className='span2'> {colorsCount} </span>
                  <span className='span3'>
                    {__pagesText.productInfo.availableColors.colors}
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AvailableColors_Type3;
