import MyAccountTabsType2 from '@appComponents/common/MyAccountTabsType2';
import { __pagesConstant } from '@constants/pages.constant';
import { paths } from '@constants/paths.constant';
import { _MyAcc_OrderBillingDetails } from '@definations/APIs/user.res';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import {
  FetchOrdersIdByCustomerId,
  FetchOrdersIdByCustomerUserId,
  OrderedBillingDetails,
} from '@services/user.service';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Orders_Type2: React.FC = () => {
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const userId = useTypedSelector_v2((state) => state.user.id);
  const customerRoleId = useTypedSelector_v2(
    (state) => state.user.customer?.customerRoleId,
  );
  const [orderDetails, setOrderDetails] =
    useState<Array<_MyAcc_OrderBillingDetails | null> | null>(null);
  const isAdmin = customerRoleId == 0 || customerRoleId == 2 ? true : false;

  const [showTab, setShowTab] = useState<'MyOwnOrders' | 'OtherUsersOrders'>(
    'MyOwnOrders',
  );

  const [itemsOrder, setItemsOrder] = useState<{
    order: 'orderDate' | 'orderNumber' | 'orderStatus';
    ascDesc: 'asc' | 'desc';
  } | null>(null);

  const [listMetaInfo, setListMetaInfo] = useState<{
    pageNumber: number;
    totalCounts: number;
    itemsCountToShow: number;
    startIndex: number;
    endIndex: number;
    totalPages: number;
  }>({
    pageNumber: 1,
    totalCounts: 0,
    startIndex: 0,
    endIndex: 0,
    itemsCountToShow: 10,
    totalPages: 1,
  });

  const handleItemsQtyChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newQty: number = +event.target.value;
    setListMetaInfo((prev) => ({
      ...prev,
      pageNumber: 1,
      itemsCountToShow: newQty,
      totalPages: Math.ceil(prev.totalCounts / newQty),
      startIndex: prev.totalCounts > 1 ? 1 : 0,
      endIndex: prev.totalCounts > newQty ? newQty : prev.totalCounts,
    }));
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= listMetaInfo.totalPages) {
      setListMetaInfo((prev) => ({
        ...prev,
        pageNumber: pageNumber,
        startIndex: prev.itemsCountToShow * (pageNumber - 1) + 1,
        endIndex:
          prev.itemsCountToShow * (pageNumber - 1) + prev.itemsCountToShow,
      }));
    }
  };

  const PageNumbersHTML = () => {
    const pageNumbers: JSX.Element[] = [];
    for (let index = 1; index <= listMetaInfo.totalPages; index++) {
      pageNumbers.push(
        <div
          onClick={() => handlePageChange(index)}
          className={`w-[30px] h-[30px] flex items-center justify-center ${
            listMetaInfo.pageNumber === index ? 'bg-light-gray' : ''
          }`}
        >
          {index}
        </div>,
      );
    }
    return pageNumbers;
  };

  const fetchMultipleBillingDetails = async (ids: number[] | null) => {
    if (ids === null) {
      setOrderDetails([]);
      return;
    }

    let orders: Array<_MyAcc_OrderBillingDetails | null> = [];
    const ordersToFetch = ids.map((id) => OrderedBillingDetails(id));

    await Promise.allSettled(ordersToFetch).then((values) => {
      values.map((value, index) => {
        orders[index] = value.status === 'fulfilled' ? value.value : null;
      });
    });

    setOrderDetails(orders);
    const defaultItemsToShowCount =
      __pagesConstant._myAccount.ordersSection.table.select
        .defaultSelectedOption;
    setListMetaInfo({
      pageNumber: 1,
      totalCounts: orders.length,
      itemsCountToShow: defaultItemsToShowCount,
      startIndex: orders?.length > 1 ? 1 : 0,
      endIndex:
        orders.length > defaultItemsToShowCount
          ? defaultItemsToShowCount
          : orders.length,
      totalPages: Math.ceil(orders.length / defaultItemsToShowCount),
    });
  };

  const handleOrder = (action: 'orderDate' | 'orderNumber' | 'orderStatus') => {
    const itemOrd = action;
    const itemAscDesc = itemsOrder?.order === action ? 'desc' : 'asc';

    setOrderDetails((orders) => {
      if (!orders) return [];

      if (itemOrd === 'orderDate') {
        return orders.sort((orderA, orderB) => {
          if (orderA!.orderDate > orderB!.orderDate) return -1;
          if (orderA!.orderDate < orderB!.orderDate) return 1;
          return 0;
        });
      }

      if (itemOrd === 'orderNumber') {
        return orders.sort((orderA, orderB) => {
          if (orderA!.id > orderB!.id) return -1;
          if (orderA!.id < orderB!.id) return 1;
          return 0;
        });
      }
      if (itemOrd === 'orderStatus') {
        return orders.sort((orderA, orderB) => {
          if (orderA!.orderStatus > orderB!.orderStatus) return -1;
          if (orderA!.orderStatus < orderB!.orderStatus) return 1;
          return 0;
        });
      }

      return orders;
    });

    setItemsOrder((prev) => {
      if (!prev) {
        return {
          order: action,
          ascDesc: 'asc',
        };
      }

      return {
        order: action,
        ascDesc: itemAscDesc,
      };
    });
  };

  useEffect(() => {
    setOrderDetails(null);
    if (storeId && userId) {
      if (showTab == 'MyOwnOrders') {
        FetchOrdersIdByCustomerId({
          storeId,
          userId,
        })
          .then((ids) => fetchMultipleBillingDetails(ids))
          .catch(() => setOrderDetails([]));
        return;
      }

      if (showTab === 'OtherUsersOrders') {
        FetchOrdersIdByCustomerUserId({
          storeId,
          userId,
        })
          .then((ids) => fetchMultipleBillingDetails(ids))
          .catch(() => setOrderDetails([]));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId, userId, showTab]);

  return (
    <MyAccountTabsType2>
      {orderDetails === null ? (
        <div id='root'>
          <div className='loader-wrapper'>
            <div className='loader'></div>
          </div>
        </div>
      ) : (
        <div className='w-4/4 lg:w-4/5'>
          <div className=''>
            <div className='flex flex-wrap items-center justify-between mb-[10px] gap-[10px] text-default-text'>
              <div className='flex flex-wrap items-center gap-[5px]'>
                <div className=''>Show</div>
                <div className=''>
                  <select
                    className='form-input'
                    onChange={handleItemsQtyChange}
                  >
                    {__pagesConstant._myAccount.ordersSection.table.select.options.map(
                      (num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ),
                    )}
                  </select>
                </div>
                <div className=''>entries</div>
              </div>
              {/* <div className=''>
                <input
                  placeholder='Search'
                  readOnly
                  className='form-input'
                  value=''
                />
              </div> */}
            </div>
            <div className='overflow-auto max-h-screen border border-gray-border'>
              <table className='table table-auto border-collapse border-gray-border w-full text-default-text text-left'>
                <thead className='bg-light-gray'>
                  <tr>
                    <th
                      className='p-[10px] border-r last:border-r-0 border-gray-border'
                      onClick={() => handleOrder('orderDate')}
                    >
                      <div className='font-semibold text-left w-48 flex items-center'>
                        <span>Order Date</span>
                        <div className='flex flex-col pl-2'>
                          <span
                            className={`material-icons-outlined text-sm h-2 leading-[10px] ${
                              itemsOrder?.order === 'orderDate' &&
                              itemsOrder?.ascDesc !== 'asc'
                                ? 'visible'
                                : 'invisible'
                            }`}
                          >
                            keyboard_arrow_up
                          </span>
                          <span
                            className={`material-icons-outlined text-sm h-2 leading-[10px] ${
                              itemsOrder?.order === 'orderDate' &&
                              itemsOrder?.ascDesc !== 'asc'
                                ? 'visible'
                                : 'invisible'
                            }`}
                          >
                            keyboard_arrow_down
                          </span>
                        </div>
                      </div>
                    </th>
                    <th
                      className='p-[10px] border-r last:border-r-0 border-gray-border'
                      onClick={() => handleOrder('orderNumber')}
                    >
                      <div className='font-semibold text-left w-48 flex items-center'>
                        <span>Order #</span>
                        <div className='flex flex-col pl-2'>
                          <span
                            className={`material-icons-outlined text-sm h-2 leading-[10px] ${
                              itemsOrder?.order === 'orderNumber' &&
                              itemsOrder?.ascDesc !== 'asc'
                                ? 'visible'
                                : 'invisible'
                            }`}
                          >
                            keyboard_arrow_up
                          </span>

                          <span
                            className={`material-icons-outlined text-sm h-2 leading-[10px] ${
                              itemsOrder?.order === 'orderNumber' &&
                              itemsOrder?.ascDesc !== 'asc'
                                ? 'visible'
                                : 'invisible'
                            }`}
                          >
                            keyboard_arrow_down
                          </span>
                        </div>
                      </div>
                    </th>
                    <th
                      className='p-[10px] border-r last:border-r-0 border-gray-border'
                      onClick={() => handleOrder('orderStatus')}
                    >
                      <div className='font-semibold text-left w-48 flex items-center'>
                        <span>Order Status</span>
                        <div className='flex flex-col pl-2'>
                          <span
                            className={`material-icons-outlined text-sm h-2 leading-[10px] ${
                              itemsOrder?.order === 'orderStatus' &&
                              itemsOrder?.ascDesc !== 'asc'
                                ? 'visible'
                                : 'invisible'
                            }`}
                          >
                            keyboard_arrow_up
                          </span>
                          <span
                            className={`material-icons-outlined text-sm h-2 leading-[10px] ${
                              itemsOrder?.order === 'orderStatus' &&
                              itemsOrder?.ascDesc !== 'asc'
                                ? 'visible'
                                : 'invisible'
                            }`}
                          >
                            keyboard_arrow_down
                          </span>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails
                    .slice(listMetaInfo.startIndex, listMetaInfo.endIndex)
                    .map((order, index) => {
                      if (!order) {
                        return null;
                      }
                      return (
                        <tr key={index}>
                          <td className='border-t border-r last:border-r-0 border-gray-border p-[10px]'>
                            <time>
                              {moment(order.orderDate).format(
                                __pagesConstant._myAccount.ordersSection
                                  .dateFormat,
                              )}
                            </time>
                          </td>
                          <td className='border-t border-r last:border-r-0 border-gray-border p-[10px]'>
                            <Link
                              href={`${paths.myAccount.order_details}?ordernumber=${order.id}`}
                            >
                              {order.id}
                            </Link>
                          </td>
                          <td className='border-t border-r last:border-r-0 border-gray-border p-[10px]'>
                            {order.orderStatus}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className='flex flex-wrap items-center justify-between mt-[10px] gap-[10px] text-default-text'>
              <div className=''>{`Showing ${listMetaInfo.startIndex} to ${listMetaInfo.endIndex} of ${listMetaInfo.totalCounts} entries`}</div>
              <div className='flex flex-wrap items-center gap-[5px]'>
                <div className='flex flex-wrap border border-gray-border divide-x divide-gray-border'>
                  <div
                    onClick={() =>
                      handlePageChange(listMetaInfo.pageNumber - 1)
                    }
                    className={`px-[10px] flex items-center justify-center ${
                      listMetaInfo.pageNumber === 1 ? `opacity-[0.5]` : ''
                    }`}
                  >
                    Previous
                  </div>
                  {PageNumbersHTML()}
                  <div
                    onClick={() =>
                      handlePageChange(listMetaInfo.pageNumber + 1)
                    }
                    className={`px-[10px] flex items-center justify-center ${
                      listMetaInfo.pageNumber === listMetaInfo.totalPages
                        ? `opacity-[0.5]`
                        : ''
                    }`}
                  >
                    Next
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MyAccountTabsType2>
  );
};

export default Orders_Type2;
