import { __pagesText } from '@constants/pages.text';
import { _ProductInventory } from '@definations/APIs/inventory.res';
import { FetchInventoryById } from '@services/product.service';
import NxtImage from 'appComponents_v2/reUsable/Image';
import { useTypedSelector_v2 } from 'hooks_v2';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { _ModalProps } from '../modal.d';

const AvailableInventoryModal: React.FC<_ModalProps> = ({ modalHandler }) => {
  const {
    sizes,
    brand,
    colors,
    inventory,
    name: productName,
  } = useTypedSelector_v2((state) => state.product.product);
  const [availabelInventory, setAvailableInventory] = useState<
    _ProductInventory[]
  >([]);
  const [size, setSizes] = useState<string[]>([]);
  const showMessage = useRef(false);

  const fetchInventory = async () => {
    colors?.map((item) => {
      FetchInventoryById({
        productId: item.productId,
        attributeOptionId: [item.attributeOptionId],
      }).then((res) => {
        if (res !== null) {
          setAvailableInventory((prev) => [...prev, ...res.inventory]);
          setSizes(res?.sizes[0]?.sizeArr);
        }
      });
    });
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const currentInventory = (
    currentProduct: _ProductInventory,
    index: number,
  ) => {
    if (currentProduct.inventory) {
      if (currentProduct.inventory > 100) {
        return (
          <td key={index} className='px-2 py-3'>
            <div>100+</div>
          </td>
        );
      } else {
        return (
          <td key={index} className='px-2 py-3'>
            <div>{currentProduct.inventory}</div>
          </td>
        );
      }
    } else if (
      currentProduct.futureInventory &&
      moment(currentProduct.futureInventoryDate).format('DD/YY/YYYY') >=
        moment().format('DD/MM/YYYY')
    ) {
      showMessage.current = true;
      return (
        <td key={index} className='px-2 py-3 bg-primary text-white'>
          <p>In Stock({currentProduct.futureInventory})</p>
          <p>{currentProduct.futureInventoryDate}</p>
        </td>
      );
    } else {
      return (
        <td key={index} className='px-2 py-3'>
          <div>-</div>
        </td>
      );
    }
  };

  return (
    <div
      onClick={() => modalHandler(null)}
      id='availableinventoryModal'
      className=' overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0'
    >
      <div className='w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
        <div className='relative px-4 w-full max-w-3xl h-full md:h-auto'>
          <div className='relative bg-gray-200 shadow max-h-screen overflow-y-auto'>
            <div className='px-4 lg:px-10 bg-primary text-white'>
              <div className='flex flex-wrap items-center justify-between py-6'>
                <div className='pl-8  w-16 h-6'></div>
                <div className='uppercase font-semibold flex flex-wrap items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='white'
                    className=' w-6 h-6 mr-1'
                    viewBox='0 0 48 48'
                  >
                    <path d='M23.55 9.4Q24.45 9.4 25.1 8.75Q25.75 8.1 25.75 7.2Q25.75 6.3 25.1 5.65Q24.45 5 23.55 5Q22.65 5 22 5.65Q21.35 6.3 21.35 7.2Q21.35 8.1 22 8.75Q22.65 9.4 23.55 9.4ZM21.55 41.3H9Q7.8 41.3 6.9 40.4Q6 39.5 6 38.3V9.2Q6 8 6.9 7.1Q7.8 6.2 9 6.2H18.25Q18.55 4.55 20.05 3.275Q21.55 2 23.55 2Q25.55 2 27.075 3.275Q28.6 4.55 28.85 6.2H38.1Q39.3 6.2 40.2 7.1Q41.1 8 41.1 9.2V19.35H38.1V9.2Q38.1 9.2 38.1 9.2Q38.1 9.2 38.1 9.2H32.8V15.7H14.3V9.2H9Q9 9.2 9 9.2Q9 9.2 9 9.2V38.3Q9 38.3 9 38.3Q9 38.3 9 38.3H21.55ZM31 40.05 23 32.05 25.15 29.9 31 35.75 42.95 23.8 45.1 25.95Z' />
                  </svg>
                  <span className=''>
                    {
                      __pagesText.productInfo.availableInventoryModal
                        .availableInventory
                    }
                  </span>
                </div>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 lg:text-2xl bg-white p-4 px-8 border-b border-neutral-200'>
                {productName}
              </h3>
            </div>
            <div className='p-4 pb-2 lg:pb-4 lg:p-10 pt-0 lg:pt-0 bg-gray-200'>
              <div className='overflow-x-auto max-h-screen bg-white'>
                <table
                  cellPadding='0'
                  cellSpacing='0'
                  className='table-auto w-full text-xs text-center text-[#191919]'
                >
                  <thead className='text-xs font-semibold border-b border-neutral-200'>
                    <tr className='divide-x divide-slate-200'>
                      <th className='px-2 py-4 w-32'>
                        <div className=''>
                          {__pagesText.productInfo.startOrderModal.color}
                        </div>
                      </th>
                      {size.map((el, index) => (
                        <th className='px-2 py-4' key={index}>
                          <div className=''>{el}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className='divide-y divide-slate-200'>
                    {colors?.map((color) => (
                      <tr
                        className='divide-x divide-slate-200'
                        key={color.attributeOptionId}
                      >
                        <>
                          <td className='px-2 py-3'>
                            <div className='w-[40px] h-[40px] flex items-center justify-center mx-auto mb-1 border border-slate-200'>
                              <NxtImage
                                src={color.imageUrl}
                                alt={color.altTag}
                                className=''
                              />
                            </div>
                            <div>{color.name}</div>
                          </td>

                          {size.map((el, index) => {
                            const foundIt = availabelInventory.find(
                              (int) =>
                                int.name === el &&
                                int.colorAttributeOptionId ===
                                  color.attributeOptionId,
                            );
                            if (foundIt) {
                              return currentInventory(foundIt, index);
                            } else {
                              return (
                                <td key={index} className='px-2 py-3'>
                                  -
                                </td>
                              );
                            }

                            return <></>;
                          })}
                        </>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {showMessage.current && (
                <div className='text-center mt-2'>
                  <div className='text-default-text'>
                    Any dated noted above are estimated restocking dates.
                  </div>

                  <div className='text-default-text mb-[10px]'>
                    <a href='javascript:void(0);' className='text-anchor'>
                      Call us
                    </a>{' '}
                    or email{' '}
                    <a href='javascript:void(0);' className='text-anchor'>
                      support@corporategear.com
                    </a>{' '}
                    to palce any
                    <br /> order for incoming stock or review alternate options!
                  </div>
                </div>
              )}
            </div>

            <div className='flex items-center justify-end p-4 lg:p-10 pt-0 lg:pt-0'>
              <button
                onClick={() => {
                  setAvailableInventory([]);
                  showMessage.current = false;
                  modalHandler(null);
                }}
                type='button'
                className='p-2 px-3 btn btn-secondary text-white'
              >
                {__pagesText.productInfo.availableInventoryModal.close}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableInventoryModal;
