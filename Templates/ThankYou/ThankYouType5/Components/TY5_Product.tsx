import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { _MyAcc_OrderProductDetails } from '@definations/APIs/user.res';
import Link from 'next/link';
import React from 'react';

type _Props = _MyAcc_OrderProductDetails;

const TY5_Product: React.FC<_Props> = (product) => {
  return (
    <li className='flex flex-wrap py-[20px] -mx-[10px]'>
      <div className='w-full md:w-1/4 px-[10px] md:mb-0 mb-[10px]'>
        <Link href={`/${product.seName}.html`} title=''>
          <a>
            <NxtImage
              src={product.colorImage}
              alt={product.productName}
              className=''
            />
          </a>
        </Link>
      </div>
      <div className='w-full md:w-3/4 px-[10px] flex flex-wrap lg:justify-between'>
        <div className='text-sub-text font-semibold'>
          <Link
            href={`/${product.seName}.html`}
            className='text-black hover:text-secondary'
          >
            <a>{product.productName}</a>
          </Link>
        </div>
        <div className='w-full flex flex-wrap'>
          <div className='lg:w-2/3 w-full mt-[10px]'>
            <div className='flex justify-between'>
              <div className='text-default-text'>
                <span className='font-semibold'>SKU :</span> {product.sku}
              </div>
            </div>
            <div className='mt-[5px] flex'>
              <div className='text-default-text'>
                <span className='font-semibold'>Color :</span>
                {product.attributeOptionValue}
              </div>
            </div>
            <div className='mt-[40px]'>
              <div className='text-default-text font-semibold border-b border-b-gray-border pb-[10px]'>
                Item Details
              </div>
              <div className='flex justify-between py-[10px]'>
                <div className='text-default-text font-semibold w-28'>Size</div>
                <div className='text-default-text font-semibold w-16 text-center'>
                  Qty
                </div>
                <div className='text-default-text font-semibold w-20 text-right'>
                  Price
                </div>
              </div>
              {product.shoppingCartItemDetailsViewModels.map((item) => {
                return (
                  <div className='flex justify-between py-[10px]'>
                    <div className='text-default-text w-28'>
                      {item.attributeOptionValue}
                    </div>
                    <div className='text-default-text w-16 text-center'>
                      {item.qty}
                    </div>
                    <div className='text-default-text w-20 text-right'>
                      <Price value={item.price} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='mt-[10px] lg:w-1/3 w-full'>
            <div className='font-bold text-medium-text text-right'>
              <span className=''>
                Item Total:
                <br />
                <Price value={product.totalPrice} />
              </span>
            </div>
          </div>
        </div>
        <div className='w-full mt-[20px] text-default-text'>
          <div className='font-semibold pb-[10px] gap-[10px] text-medium-text text-left'>
            <div className=''>Custom Field</div>
          </div>
          <table className='w-full border border-gray-border border-collapse'>
            <thead>
              <tr>
                <th className='border border-gray-border p-[5px]'>
                  Field Name
                </th>
                <th className='border border-gray-border p-[5px]'>
                  Field Value
                </th>
                <th className='border border-gray-border p-[5px]'>
                  Charge Type
                </th>
                <th className='border border-gray-border p-[5px]'>Price</th>
                <th className='border border-gray-border p-[5px]'>Qty</th>
                <th className='border border-gray-border p-[5px]'>Sub Total</th>
              </tr>
            </thead>
            <tbody>
              {product.shoppingCartItemsCustomFieldViewModel.map((item) => {
                return (
                  <tr>
                    <td className='border border-gray-border p-[5px]'>
                      {item.storeProductCustomFieldName}
                    </td>
                    <td className='border border-gray-border p-[5px]'>
                      {item.storeProductCustomFieldValue}
                    </td>
                    <td className='border border-gray-border p-[5px]'>
                      {item.isChargePerCharacter
                        ? 'Charge Per Character'
                        : 'Fixed'}
                    </td>
                    <td className='border border-gray-border p-[5px]'>
                      <Price value={item.subTotal / item.quantity} />
                    </td>
                    <td className='border border-gray-border p-[5px]'>
                      {item.quantity}
                    </td>
                    <td className='border border-gray-border p-[5px]'>
                      <Price value={item.subTotal} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className='font-semibold pb-[10px] gap-[10px] text-sub-text text-right mt-5'>
            {' '}
            Total :{' '}
            <span className=''>
              <Price value={product.totalCustomFieldsCharges} />
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TY5_Product;
