import Price from '@appComponents/Price';
import { __pagesConstant } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// eslint-disable-next-line import/named
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
  // eslint-disable-next-line import/named
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';

import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import OL_ItemDetails from './OL_ItemDetails';
interface _props {
  billing: _MyAcc_OrderBillingDetails;
  product: _MyAcc_OrderProductDetails[];
}

const OL_UserOrderSummary: React.FC<_props> = (order) => {
  const router = useRouter();
  const viewDetailsHandler = (orderId: number | undefined) => {
    if (!orderId) {
      return;
    }
    router.push(`${paths.myAccount.order_details}?ordernumber=${orderId}`);
  };
  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      //   expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',

    // '& .MuiAccordionSummary-content': {
    //   marginLeft: theme.spacing(1),
    // },
  }));

  return (
    <div className='bg-[#ffffff] border-t border-b border-[#d2d2d2] sm:border '>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          className='newtestcalss'
        >
          <Typography className='w-full'>
            <div className='flex items-center  sm:grid sm:grid-cols-4 sm:gap-x-6 bg-gray-50'>
              <div className='flex-1 grid grid-cols-2 gap-x-6 text-default-text sm:col-span-4 sm:grid-cols-5 lg:col-span-3'>
                <div>
                  <dt className='text-sub-text font-[600] uppercase'>
                    {__pagesText.OrderPage.orderNumber}
                  </dt>
                  <dd className='mt-2 text-default-text'>
                    {order.billing?.id}
                  </dd>
                </div>
                <div>
                  <dt className='text-sub-text font-[600] uppercase'>
                    {__pagesText.OrderPage.userName}
                  </dt>
                  <dd className='mt-2 text-default-text'>
                    {capitalizeFirstLetter(order.billing.firstName)}{' '}
                    {capitalizeFirstLetter(order.billing.lastName)}
                  </dd>
                </div>
                <div className='hidden sm:block'>
                  <dt className='text-sub-text font-[600] uppercase'>
                    {__pagesText.OrderPage.dateOfOrder}
                  </dt>
                  <dd className='mt-2 text-default-text'>
                    <time>
                      {moment(order.billing?.orderDate).format(
                        __pagesConstant._myAccount.ordersSection.dateFormat,
                      )}
                    </time>
                  </dd>
                </div>
                <div>
                  <dt className='text-sub-text font-[600] uppercase'>
                    {__pagesText.OrderPage.totalPrice}
                  </dt>
                  <dd className='mt-2 font-[600] text-default-text'>
                    <Price value={order.billing?.orderTotal} />
                  </dd>
                </div>
                <div>
                  <dt className='text-sub-text font-[600] uppercase'>
                    {__pagesText.OrderPage.orderStatus}
                  </dt>
                  <dd className='mt-2 text-default-text'>
                    {order.billing?.orderStatus}
                  </dd>
                </div>
              </div>
              <div className='hidden lg:col-span-1 lg:flex lg:items-center lg:justify-end lg:space-x-2'>
                <button
                  onClick={() => viewDetailsHandler(order.billing.id)}
                  className='btn btn-secondary btn-md'
                >
                  <span> {__pagesText.OrderPage.viewOrderDetails}</span>
                </button>
              </div>
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul role='list' className='divide-y divide-gray-200'>
              {order.product.map((item, index) => {
                return <OL_ItemDetails key={index} item={item} />;
              })}
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default OL_UserOrderSummary;
