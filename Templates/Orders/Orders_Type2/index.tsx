import MyAccountTabsType2 from '@appComponents/common/MyAccountTabsType2';
import { __pagesConstant } from '@constants/pages.constant';
import { paths } from '@constants/paths.constant';
import { _OrderDetailInList } from '@definations/APIs/user.res';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchOrdersList } from '@services/user.service';
import { debounce } from 'lodash';
import moment from 'moment';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

const Orders_Type2: React.FC = () => {
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const userId = useTypedSelector_v2((state) => state.user.id);
  const customerRoleId = useTypedSelector_v2(
    (state) => state.user.customer?.customerRoleId,
  );
  const roles = useTypedSelector_v2((state) => state.user.roles);

  const [orderDetails, setOrderDetails] = useState<_OrderDetailInList[] | []>(
    [],
  );
  const isAdmin =
    customerRoleId == 0 || customerRoleId == +roles.adminId ? true : false;

  const [searchText, setSearchText] = useState<string>('');

  const [itemsOrder, setItemsOrder] = useState<{
    order: 'orderDate' | 'orderNumber' | 'orderStatus';
    ascDesc: 'asc' | 'desc';
  } | null>(null);
  const [sortAsc, setSortAsc] = useState<string>('desc');
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
  const handleDebounceFn = (inputValue: string) => {
    FetchOrdersList({
      args: {
        pageIndex: 0,
        pageSize: 0,
        pagingStrategy: 0,
        sortingOptions: [
          {
            field: '',
            direction: 0,
            priority: 0,
          },
        ],
        filteringOptions: [
          {
            field: inputValue ? 'orderNumber' : '',
            operator: 0,
            value: inputValue,
          },
        ],
      },
      storeID: storeId,
      customerId: userId || 0,
    }).then((res) => {
      setOrderDetails(res?.items);
      const defaultItemsToShowCount =
        __pagesConstant._myAccount.ordersSection.table.select
          .defaultSelectedOption;
      setListMetaInfo({
        pageNumber: 1,
        totalCounts: res.items.length,
        itemsCountToShow: defaultItemsToShowCount,
        startIndex: res.items?.length > 1 ? 1 : 0,
        endIndex:
          res.items.length > defaultItemsToShowCount
            ? defaultItemsToShowCount
            : res.items.length,
        totalPages: Math.ceil(res.items.length / defaultItemsToShowCount),
      });
    });
  };

  const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);

  const handleChange = (event: any) => {
    setSearchText(event.target.value);
    debounceFn(event.target.value);
  };

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

  const handleOrder = (
    action: 'orderDate' | 'orderNumber' | 'orderStatus',
    type?: 'asc' | 'desc',
  ) => {
    const itemOrd = action;
    // const itemAscDesc = itemsOrder?.order === action ? 'desc' : 'asc';
    const itemAscDesc = type === 'asc' ? 'asc' : 'desc';

    if (orderDetails.length > 0) {
    }

    setOrderDetails((orders) => {
      if (!orders) return [];

      if (itemOrd === 'orderDate') {
        // const mainOrder = orders.sort((orderA, orderB) => {
        //   if (moment(orderA!.orderDate) < moment(orderB!.orderDate)) return 1;
        //   if (moment(orderA!.orderDate) > moment(orderB!.orderDate)) return -1;
        //   return 1;
        // });
        return orders.sort((orderA, orderB) => {
          if (type === 'asc') {
            if (moment(orderA!.orderDate) > moment(orderB!.orderDate)) {
              return 1;
            } else if (moment(orderB!.orderDate) > moment(orderA!.orderDate)) {
              return -1;
            } else {
              return 0;
            }
          } else if (type === 'desc') {
            if (moment(orderA!.orderDate) < moment(orderB!.orderDate)) {
              return 1;
            } else if (moment(orderB!.orderDate) < moment(orderA!.orderDate)) {
              return -1;
            } else {
              return 0;
            }
          } else {
            return 0;
          }
        });
      }

      if (itemOrd === 'orderNumber') {
        return orders.sort((orderA, orderB) => {
          if (type === 'asc') {
            if (orderA!.orderNumber > orderB!.orderNumber) {
              return 1;
            } else if (orderB!.orderNumber > orderA!.orderNumber) {
              return -1;
            } else {
              return 0;
            }
          } else if (type === 'desc') {
            if (orderA!.orderNumber < orderB!.orderNumber) {
              return 1;
            } else if (orderB!.orderNumber < orderA!.orderNumber) {
              return -1;
            } else {
              return 0;
            }
          } else {
            return 0;
          }
        });
      }
      if (itemOrd === 'orderStatus') {
        return orders.sort((orderA, orderB) => {
          if (type === 'asc') {
            if (orderA!.orderStatus > orderB!.orderStatus) {
              return 1;
            } else if (orderB!.orderStatus > orderA!.orderStatus) {
              return -1;
            } else {
              return 0;
            }
          } else if (type === 'desc') {
            if (orderA!.orderStatus < orderB!.orderStatus) {
              return 1;
            } else if (orderB!.orderStatus < orderA!.orderStatus) {
              return -1;
            } else {
              return 0;
            }
          } else {
            return 0;
          }
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
    setOrderDetails([]);
    if (storeId && userId) {
      FetchOrdersList({
        args: {
          pageIndex: 0,
          pageSize: 0,
          pagingStrategy: 0,
          sortingOptions: [
            {
              field: '',
              direction: 0,
              priority: 0,
            },
          ],
          filteringOptions: [
            {
              field: '',
              operator: 0,
              value: '',
            },
          ],
        },
        storeID: storeId,
        customerId: userId,
      }).then((res) => {
        setOrderDetails(res?.items);
        const defaultItemsToShowCount =
          __pagesConstant._myAccount.ordersSection.table.select
            .defaultSelectedOption;
        setListMetaInfo({
          pageNumber: 1,
          totalCounts: res.items.length,
          itemsCountToShow: defaultItemsToShowCount,
          startIndex: res.items?.length > 1 ? 1 : 0,
          endIndex:
            res.items.length > defaultItemsToShowCount
              ? defaultItemsToShowCount
              : res.items.length,
          totalPages: Math.ceil(res.items.length / defaultItemsToShowCount),
        });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId, userId]);

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

              <div className=''>
                <input
                  type='text'
                  placeholder='Search'
                  onChange={(e) => handleChange(e)}
                  className='form-input'
                  value={searchText}
                />
              </div>
            </div>
            <div className='overflow-auto max-h-screen border border-gray-border'>
              <table className='table table-auto border-collapse border-gray-border w-full text-default-text text-left'>
                <thead className='bg-light-gray'>
                  <tr>
                    <th
                      className='p-[10px] border-r last:border-r-0 border-gray-border'
                      // onClick={() => handleOrder('orderDate')}
                    >
                      <div className='font-semibold text-left w-48 flex items-center'>
                        <span>Order Date</span>
                        <div className='flex flex-col pl-2'>
                          <span
                            className={`material-icons-outlined text-sm h-2 leading-[10px] cursor-pointer ${
                              itemsOrder?.order === 'orderDate' &&
                              itemsOrder?.ascDesc !== 'asc'
                                ? 'visible'
                                : 'visible'
                            }`}
                            onClick={() => handleOrder('orderDate', 'asc')}
                          >
                            keyboard_arrow_up
                          </span>
                          <span
                            className={`material-icons-outlined text-sm h-2 leading-[10px] cursor-pointer ${
                              itemsOrder?.order === 'orderDate' &&
                              itemsOrder?.ascDesc !== 'desc'
                                ? 'visible'
                                : 'visible'
                            }`}
                            onClick={() => handleOrder('orderDate', 'desc')}
                          >
                            keyboard_arrow_down
                          </span>
                        </div>
                      </div>
                    </th>
                    <th
                      className='p-[10px] border-r last:border-r-0 border-gray-border'
                      // onClick={() => handleOrder('orderNumber')}
                    >
                      <div className='font-semibold text-left w-48 flex items-center'>
                        <span>Order #</span>
                        <div className='flex flex-col pl-2'>
                          <span
                            className={`material-icons-outlined text-sm h-2 cursor-pointer leading-[10px] ${
                              itemsOrder?.order === 'orderNumber' &&
                              itemsOrder?.ascDesc !== 'asc'
                                ? 'visible'
                                : 'visible'
                            }`}
                            onClick={(e) => {
                              handleOrder('orderNumber', 'asc');
                            }}
                          >
                            keyboard_arrow_up
                          </span>

                          <span
                            className={`material-icons-outlined text-sm h-2 cursor-pointer leading-[10px] ${
                              itemsOrder?.order === 'orderNumber' &&
                              itemsOrder?.ascDesc !== 'desc'
                                ? 'visible'
                                : 'visible'
                            }`}
                            onClick={(e) => {
                              // setSortAsc('desc');
                              handleOrder('orderNumber', 'desc');
                            }}
                          >
                            keyboard_arrow_down
                          </span>
                        </div>
                      </div>
                    </th>
                    <th
                      className='p-[10px] border-r last:border-r-0 border-gray-border'
                      // onClick={() => handleOrder('orderStatus')}
                    >
                      <div className='font-semibold text-left w-48 flex items-center'>
                        <span>Order Status</span>
                        <div className='flex flex-col pl-2'>
                          <span
                            className={`material-icons-outlined text-sm h-2 cursor-pointer leading-[10px] ${
                              itemsOrder?.order === 'orderStatus' &&
                              itemsOrder?.ascDesc !== 'asc'
                                ? 'visible'
                                : 'visible'
                            }`}
                            onClick={() => handleOrder('orderStatus', 'asc')}
                          >
                            keyboard_arrow_up
                          </span>
                          <span
                            className={`material-icons-outlined text-sm h-2 cursor-pointer leading-[10px] ${
                              itemsOrder?.order === 'orderStatus' &&
                              itemsOrder?.ascDesc !== 'desc'
                                ? 'visible'
                                : 'visible'
                            }`}
                            onClick={() => handleOrder('orderStatus', 'desc')}
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
                              href={`${paths.myAccount.order_details}?ordernumber=${order.orderNumber}`}
                            >
                              <a className='!text-anchor hover:!text-anchor-hover font-bold'>
                                {order.orderNumber}
                              </a>
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
              <div className=''>{`Showing ${
                orderDetails.length > 0 ? 1 : 0
              } to ${listMetaInfo.endIndex} of ${
                listMetaInfo.totalCounts
              } entries`}</div>

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
