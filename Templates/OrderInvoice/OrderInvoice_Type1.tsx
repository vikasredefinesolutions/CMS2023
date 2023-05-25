import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { CustomizeLaterMain } from '@constants/common.constant';
import { CustomizeLater } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import moment from 'moment';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { _propsOrder } from './orderInvoice';

const OrderInvoice_type1: React.FC<_propsOrder> = ({ order }) => {
  // console.log('order value', order);
  const { logoUrl, mediaBaseUrl } = useTypedSelector_v2((state) => state.store);
  // console.log();

  return (
    <>
      <table width={'100%'} cellPadding={'10'} cellSpacing={'0'} border={1}>
        <tbody>
          <tr>
            <td>
              <table width='800px' align='center'>
                <tbody>
                  <tr>
                    <td className='text-right'>
                      <button className='' title='Print Invoice'>
                        <NxtImage
                          src={'/images/print-invoice.png'}
                          className=''
                          alt={'print invoice'}
                        />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <table
                      width='100%'
                      align='center'
                      style={{ padding: 0, border: '1px solid #c2c2c2' }}
                      cellPadding='0'
                      cellSpacing='0'
                    >
                      <tbody>
                        <tr>
                          <td
                            align='center'
                            style={{
                              padding: '10px 0',
                              textAlign: 'center',
                              borderBottom: '1px solid #c2c2c2',
                            }}
                          >
                            <Link href={'/'}>
                              <div title=''>
                                <img
                                  src={
                                    logoUrl ? `${mediaBaseUrl}${logoUrl}` : ''
                                  }
                                  className=''
                                  alt={'logo'}
                                />
                              </div>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td height='10'></td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              fontFamily:
                                "'open sans',Arial, Helvetica, sans-serif",
                              fontSize: '16px',
                              fontWeight: 'bold',
                              lineHeight: '30px',
                              color: '#000',
                              padding: '0 15px 5px 15px',
                            }}
                          >
                            {`Dear ${order.billing?.firstName},`}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              fontFamily:
                                "'open sans',Arial, Helvetica, sans-serif",
                              fontSize: '14px',
                              fontWeight: 'normal',
                              lineHeight: '30px',
                              color: '#000',
                              padding: '0 15px 5px 15px',
                              borderBottom: '1px solid #c2c2c2',
                            }}
                          >
                            <strong>
                              {__pagesText.ThankYouPage.OrderNumber}
                            </strong>
                            {order.billing?.id}

                            {`- ${moment(order.billing?.orderDate).format(
                              'DD/MM/YYYY HH:mm:ss',
                            )}`}
                          </td>
                        </tr>
                        {/* loop  */}
                        {order.product?.map((product, index) => (
                          <Fragment key={index}>
                            <tr>
                              <td style={{ padding: '0 15px' }}>
                                <table
                                  cellPadding={0}
                                  cellSpacing={0}
                                  width={'100%'}
                                >
                                  <tbody>
                                    <tr>
                                      <td width={'25%'}>
                                        <NxtImage
                                          src={product.colorImage}
                                          alt={product.productName}
                                          className=''
                                        />
                                      </td>
                                      <td width={'75%'}>
                                        <table
                                          cellPadding={0}
                                          cellSpacing={0}
                                          width={'100%'}
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                colSpan={3}
                                                style={{
                                                  fontFamily:
                                                    "'open sans',Arial, Helvetica, sans-serif",
                                                  fontSize: '20px',
                                                  fontWeight: 'bold',
                                                  lineHeight: '30px',
                                                  color: '#000',
                                                  padding: '10px 0px 10px 0px',
                                                  borderBottom:
                                                    '1px solid #c2c2c2',
                                                }}
                                              >
                                                {product.productName}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style={{
                                                  fontFamily:
                                                    "'open sans',Arial, Helvetica, sans-serif",
                                                  fontSize: '14px',
                                                  fontWeight: 'normal',
                                                  lineHeight: '30px',
                                                  color: '#000',
                                                  padding: '10px 15px 0px 15px',
                                                }}
                                              >
                                                <strong>
                                                  {
                                                    __pagesText.ThankYouPage
                                                      .TotalSummary.Sku
                                                  }
                                                </strong>
                                                {product.sku}
                                              </td>
                                              <td
                                                style={{
                                                  fontFamily:
                                                    "'open sans',Arial, Helvetica, sans-serif",
                                                  fontSize: '14px',
                                                  fontWeight: 'normal',
                                                  lineHeight: '30px',
                                                  color: '#000',
                                                  padding: '10px 15px 0px 15px',
                                                }}
                                              >
                                                <strong>
                                                  {
                                                    __pagesText.ThankYouPage
                                                      .TotalSummary.Color
                                                  }
                                                </strong>
                                                {product.attributeOptionValue}
                                              </td>
                                            </tr>
                                            {product.shoppingCartItemDetailsViewModels.map(
                                              (prod, index) => (
                                                <Fragment key={index}>
                                                  <tr>
                                                    <td
                                                      style={{
                                                        fontFamily:
                                                          "'open sans',Arial, Helvetica, sans-serif",
                                                        fontSize: '14px',
                                                        fontWeight: 'normal',
                                                        lineHeight: '30px',
                                                        color: '#000',
                                                        padding:
                                                          '10px 15px 0px 15px',
                                                      }}
                                                    >
                                                      <strong>Size </strong>
                                                      {
                                                        prod.attributeOptionValue
                                                      }
                                                    </td>
                                                    <td
                                                      style={{
                                                        fontFamily:
                                                          "'open sans',Arial, Helvetica, sans-serif",
                                                        fontSize: '14px',
                                                        fontWeight: 'normal',
                                                        lineHeight: '30px',
                                                        color: '#000',
                                                        padding:
                                                          '10px 15px 0px 15px',
                                                      }}
                                                    >
                                                      <strong>Qty </strong>
                                                      {prod.qty}
                                                    </td>
                                                    <td
                                                      style={{
                                                        fontFamily:
                                                          "'open sans',Arial, Helvetica, sans-serif",
                                                        fontSize: '14px',
                                                        fontWeight: 'normal',
                                                        lineHeight: '30px',
                                                        color: '#000',
                                                        padding:
                                                          '10px 15px 0px 15px',
                                                      }}
                                                    >
                                                      <strong>Price </strong>
                                                      <Price
                                                        value={prod.price}
                                                      />
                                                    </td>
                                                  </tr>
                                                </Fragment>
                                              ),
                                            )}
                                            {product.shoppingCartLogoPersonViewModels.map(
                                              (item: any, index: number) => {
                                                return item.logoName ===
                                                  'Customize Later' ? (
                                                  <tr>
                                                    <td
                                                      style={{
                                                        fontFamily:
                                                          "'open sans',Arial, Helvetica, sans-serif",
                                                        fontSize: '14px',
                                                        fontWeight: 'normal',
                                                        lineHeight: '30px',
                                                        color: '#000',
                                                        padding:
                                                          '10px 15px 0px 15px',
                                                      }}
                                                    >
                                                      <span className='material-icons text-[60px] mr-3'>
                                                        support_agent
                                                      </span>
                                                    </td>
                                                    <td
                                                      style={{
                                                        fontFamily:
                                                          "'open sans',Arial, Helvetica, sans-serif",
                                                        fontSize: '14px',
                                                        fontWeight: 'normal',
                                                        lineHeight: '24px',
                                                        color: '#000',
                                                        padding:
                                                          '10px 15px 0px 15px',
                                                      }}
                                                    >
                                                      <strong>
                                                        {CustomizeLaterMain}{' '}
                                                      </strong>
                                                      <br />
                                                      {CustomizeLater}
                                                    </td>
                                                  </tr>
                                                ) : (
                                                  <tr key={`${item}-${index}`}>
                                                    <td
                                                      style={{
                                                        fontFamily:
                                                          "'open sans',Arial, Helvetica, sans-serif",
                                                        fontSize: '14px',
                                                        fontWeight: 'normal',
                                                        lineHeight: '30px',
                                                        color: '#000',
                                                        padding:
                                                          '10px 15px 0px 15px',
                                                      }}
                                                    >
                                                      {item.logoImagePath ===
                                                      '' ? (
                                                        <img
                                                          className='w-14 h-12'
                                                          src='/assets/images/logo-to-be-submitted.webp'
                                                          title=''
                                                          alt={
                                                            item.logoPositionImage
                                                          }
                                                        />
                                                      ) : (
                                                        <img
                                                          className='w-14 h-12'
                                                          src={`${mediaBaseUrl}${item.logoImagePath}`}
                                                          title=''
                                                          alt={
                                                            item.logoImagePath
                                                          }
                                                        />
                                                      )}
                                                    </td>
                                                    <td
                                                      style={{
                                                        fontFamily:
                                                          "'open sans',Arial, Helvetica, sans-serif",
                                                        fontSize: '14px',
                                                        fontWeight: 'normal',
                                                        lineHeight: '24px',
                                                        color: '#000',
                                                        padding:
                                                          '10px 15px 0px 15px',
                                                      }}
                                                    >
                                                      {item.logoName ===
                                                      'Add Logo Later' ? (
                                                        <strong>
                                                          {
                                                            __pagesText
                                                              .ThankYouPage
                                                              .LogoToBe
                                                          }
                                                          <br />
                                                          {
                                                            __pagesText
                                                              .ThankYouPage
                                                              .Submitted
                                                          }
                                                        </strong>
                                                      ) : (
                                                        <strong>
                                                          {
                                                            __pagesText
                                                              .ThankYouPage.Logo
                                                          }
                                                          <br />
                                                          {
                                                            __pagesText
                                                              .ThankYouPage
                                                              .Submitted
                                                          }
                                                        </strong>
                                                      )}
                                                    </td>
                                                  </tr>
                                                );
                                              },
                                            )}
                                            <tr>
                                              <td
                                                colSpan={3}
                                                style={{
                                                  fontFamily:
                                                    "'open sans',Arial, Helvetica, sans-serif",
                                                  fontSize: '14px',
                                                  fontWeight: 'normal',
                                                  lineHeight: '20px',
                                                  color: '#000',
                                                  padding: '10px 15px 0px 15px',
                                                }}
                                              >
                                                <strong>Item Notes </strong>
                                                {product.itemNote}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td
                                colSpan={2}
                                style={{
                                  height: '1px',
                                  borderBottom: '1px solid #c2c2c2',
                                }}
                              >
                                &nbsp;
                              </td>
                            </tr>
                          </Fragment>
                        ))}
                        <tr className='break-before'>
                          <td>
                            <table
                              cellPadding={0}
                              cellSpacing={0}
                              width={'100%'}
                            >
                              <tbody>
                                <tr>
                                  <td
                                    width={'70%'}
                                    style={{
                                      fontFamily:
                                        "'open sans',Arial, Helvetica, sans-serif",
                                      fontSize: '14px',
                                      fontWeight: 'normal',
                                      lineHeight: '24px',
                                      color: '#000',
                                      padding: '15px 15px 0px 15px',
                                      textAlign: 'right',
                                    }}
                                  >
                                    {
                                      __pagesText.ThankYouPage.TotalSummary
                                        .SubTotal
                                    }
                                  </td>
                                  <td
                                    width={'30%'}
                                    style={{
                                      fontFamily:
                                        "'open sans',Arial, Helvetica, sans-serif",
                                      fontSize: '14px',
                                      fontWeight: 'normal',
                                      lineHeight: '24px',
                                      color: '#000',
                                      padding: '15px 15px 0px 15px',
                                      textAlign: 'right',
                                    }}
                                  >
                                    <Price
                                      value={order.billing?.orderSubtotal}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    width={'70%'}
                                    style={{
                                      fontFamily:
                                        "'open sans',Arial, Helvetica, sans-serif",
                                      fontSize: '14px',
                                      fontWeight: 'normal',
                                      lineHeight: '24px',
                                      color: '#000',
                                      padding: '15px 15px 0px 15px',
                                      textAlign: 'right',
                                    }}
                                  >
                                    {
                                      __pagesText.ThankYouPage.TotalSummary
                                        .customizationCost
                                    }
                                  </td>
                                  <td
                                    width={'30%'}
                                    style={{
                                      fontFamily:
                                        "'open sans',Arial, Helvetica, sans-serif",
                                      fontSize: '14px',
                                      fontWeight: 'normal',
                                      lineHeight: '24px',
                                      color: '#000',
                                      padding: '15px 15px 0px 15px',
                                      textAlign: 'right',
                                    }}
                                  >
                                    <Price value={order.billing?.orderTax} />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    width={'70%'}
                                    style={{
                                      fontFamily:
                                        "'open sans',Arial, Helvetica, sans-serif",
                                      fontSize: '14px',
                                      fontWeight: 'normal',
                                      lineHeight: '24px',
                                      color: '#000',
                                      padding: '15px 15px 0px 15px',
                                      textAlign: 'right',
                                    }}
                                  >
                                    {
                                      __pagesText.ThankYouPage.TotalSummary
                                        .ShippingHandling
                                    }
                                  </td>
                                  <td
                                    width={'30%'}
                                    style={{
                                      fontFamily:
                                        "'open sans',Arial, Helvetica, sans-serif",
                                      fontSize: '14px',
                                      fontWeight: 'normal',
                                      lineHeight: '24px',
                                      color: '#000',
                                      padding: '15px 15px 0px 15px',
                                      textAlign: 'right',
                                    }}
                                  >
                                    <Price
                                      value={order.billing?.orderShippingCosts}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    width={'70%'}
                                    style={{
                                      fontFamily:
                                        "'open sans',Arial, Helvetica, sans-serif",
                                      fontSize: '14px',
                                      fontWeight: 'normal',
                                      lineHeight: '24px',
                                      color: '#000',
                                      padding: '15px 15px 0px 15px',
                                      textAlign: 'right',
                                    }}
                                  >
                                    {
                                      __pagesText.ThankYouPage.TotalSummary
                                        .Yousave
                                    }
                                  </td>
                                  <td
                                    width={'30%'}
                                    style={{
                                      fontFamily:
                                        "'open sans',Arial, Helvetica, sans-serif",
                                      fontSize: '14px',
                                      fontWeight: 'normal',
                                      lineHeight: '24px',
                                      color: '#000',
                                      padding: '15px 15px 0px 15px',
                                      textAlign: 'right',
                                    }}
                                  >
                                    <Price
                                      value={
                                        order.billing?.couponDiscountAmount
                                      }
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    width={'70%'}
                                    style={{
                                      fontFamily:
                                        "'open sans',Arial, Helvetica, sans-serif",
                                      fontSize: '16px',
                                      fontWeight: 'bold',
                                      lineHeight: '24px',
                                      color: '#000',
                                      padding: '10px 15px 0px 15px',
                                      textAlign: 'right',
                                    }}
                                  >
                                    {
                                      __pagesText.ThankYouPage.TotalSummary
                                        .GrandTotals
                                    }
                                  </td>
                                  <td
                                    width={'30%'}
                                    style={{
                                      fontFamily:
                                        "'open sans',Arial, Helvetica, sans-serif",
                                      fontSize: '16px',
                                      fontWeight: 'bold',
                                      lineHeight: '24px',
                                      color: '#000',
                                      padding: '10px 15px 0px 15px',
                                      textAlign: 'right',
                                    }}
                                  >
                                    <Price value={order.billing?.orderTotal} />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={3}
                            style={{
                              height: '1px',
                              borderBottom: '1px solid #c2c2c2',
                            }}
                          >
                            &nbsp;
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table
                              width={'100%'}
                              cellPadding={0}
                              cellSpacing={0}
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      fontFamily:
                                        "'open sans',Arial, Helvetica, sans-serif",
                                      fontSize: '14px',
                                      fontWeight: 'normal',
                                      lineHeight: '24px',
                                      color: '#000',
                                      padding: '10px 15px',
                                    }}
                                  >
                                    <strong style={{ fontSize: '16px' }}>
                                      {__pagesText.ThankYouPage.Billing.BillTo}
                                    </strong>
                                    <br />
                                    {order.billing?.firstName}{' '}
                                    {order.billing?.lastName}
                                    <br />
                                    {order.billing?.billingAddress1}
                                    <br />
                                    {order.billing?.billingAddress2 &&
                                    order.billing?.billingAddress2.trim() !=
                                      '' ? (
                                      <>
                                        {order.billing?.billingAddress2}
                                        <br />
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                    {[
                                      order.billing?.billingCity,
                                      order.billing?.billingState,
                                      order.billing?.billingZip,
                                    ].join(', ')}
                                    <br />
                                    {order.billing?.billingCountry}
                                    <br />
                                    {order.billing?.billingPhone}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily:
                                        "'open sans',Arial, Helvetica, sans-serif",
                                      fontSize: '14px',
                                      fontWeight: 'normal',
                                      lineHeight: '24px',
                                      color: '#000',
                                      padding: '10px 15px',
                                    }}
                                  >
                                    <strong style={{ fontSize: '16px' }}>
                                      {__pagesText.ThankYouPage.Billing.ShipTo}
                                    </strong>
                                    <br />
                                    {order.billing?.firstName}{' '}
                                    {order.billing?.lastName}
                                    <br />
                                    {order.billing?.shippingAddress1}
                                    <br />
                                    {order.billing?.shippingAddress2 &&
                                    order.billing?.shippingAddress2.trim() !=
                                      '' ? (
                                      <>
                                        {order.billing?.shippingAddress2}
                                        <br />
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                    {[
                                      order.billing?.shippingCity,
                                      order.billing?.shippingCity,
                                      order.billing?.shippingZip,
                                    ].join(', ')}
                                    <br />
                                    {order.billing?.shippingCountry}
                                    <br />
                                    {order.billing?.shippingPhone}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              fontFamily:
                                "'open sans',Arial, Helvetica, sans-serif",
                              fontSize: '14px',
                              fontWeight: 'bold',
                              lineHeight: '24px',
                              color: '#000',
                              padding: '10px 15px',
                            }}
                          >
                            {__pagesText.ThankYouPage.ThankYouLabel}
                            <br />
                            {'Corporate Gear'}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              fontFamily:
                                "'open sans',Arial, Helvetica, sans-serif",
                              fontSize: '14px',
                              fontWeight: 'bold',
                              lineHeight: '24px',
                              color: '#000',
                              padding: '10px 15px',
                              textAlign: 'center',
                              backgroundColor: '#ececec',
                            }}
                          >
                            © 2023 Corporate Gear All Rights Reserved
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OrderInvoice_type1;
