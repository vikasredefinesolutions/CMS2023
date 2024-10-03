import Price from '@appComponents/reUsable/Price';
import { _Store } from '@configs/page.config';
import { _Store_CODES, __LocalStorage } from '@constants/global.constant';
import { thirdPartyLoginService } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { _shippingMethod } from '@controllers/checkoutController';
import SummarryController from '@controllers/summarryController';
import { punchoutCheckout } from '@services/checkout.service';
import { fetchThirdpartyservice } from '@services/thirdparty.service';
import {
  GetCartTotals,
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from 'hooks_v2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

interface _props {
  selectedShippingModel: _shippingMethod;
}

const CartSummarryType4: FC<_props> = ({ selectedShippingModel }) => {
  const { update_CheckoutEmployeeLogin } = useActions_v2();
  const router = useRouter();
  const couponDetails = useTypedSelector_v2((state) => state.cart.discount);
  const { code: storeCode, id: storeId } = useTypedSelector_v2(
    (state) => state.store,
  );
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => !!state.employee.empId,
  );
  const { id: loggedIn } = useTypedSelector_v2((state) => state.user);
  const thirdPartyLogin = useTypedSelector_v2(
    (state) => state.store.thirdPartyLogin,
  );
  const { showModal } = useActions_v2();
  const customerId = GetCustomerId();

  const currentPage = useTypedSelector_v2((state) => state.store.currentPage);
  const { el: employeeLogin } = useTypedSelector_v2((state) => state.checkout);
  const [textOrNumber, setTextOrNumber] = useState<'number' | 'text'>('text');
  const [showCheckoutButton, setShowCheckoutButton] = useState(true);

  useEffect(() => {
    const service = localStorage.getItem('thirdPartyServices');
    if (service === thirdPartyLoginService.punchoutLogin) {
      setShowCheckoutButton(false);
    }
  }, []);

  // Functions
  const {
    coupon,
    successMessage,
    setCoupon,
    applyCouponHandler,
    removeCouponCodeHandler,
  } = SummarryController();
  const {
    totalPrice,
    subTotal,
    logoSetupCharges,
    smallRunFee,
    salesTax,
    totalLogoCharges,
    totalLineCharges,
    sewOutTotal,
  } = GetCartTotals();
  const SamlloginHandler = () => {
    fetchThirdpartyservice({ storeId }).then((ThirdpartyServices) => {
      try {
        ThirdpartyServices.map((service) => {
          if (
            service.thirdPartyServiceName.toLocaleLowerCase() ==
            thirdPartyLoginService.oktaLogin.toLocaleLowerCase()
          ) {
            localStorage.setItem(
              __LocalStorage.thirdPartyServiceName,
              service.thirdPartyServiceName,
            );
            service.url && router.push(service.url);
          } else if (
            service.thirdPartyServiceName.toLocaleLowerCase() ==
            thirdPartyLoginService.samlLogin.toLocaleLowerCase()
          ) {
            const jsonDate = new Date().toJSON();
            const datejson = jsonDate.split('.')[0] + 'Z';
            // console.log(datejson, 'datejson', jsonDate);
            return router.push(service.url + encodeURIComponent(datejson));
          }
        });
      } catch (error) {
        showModal({
          message: `something wents wrong`,
          title: 'Error',
        });
      }
    });
  };
  const cartItems = useTypedSelector_v2((state) => state.cart.cart);
  const couponAmt = couponDetails?.amount || 0;
  const calculateSubTotal = () => {
    let subTotal = 0;
    if (!cartItems) return 0;

    cartItems.forEach((item) => {
      subTotal += item.totalPrice + item.totalCustomFieldsCharges;
    });

    return subTotal;
  };
  const calculateCouponAmount = () => {
    const subTotal = calculateSubTotal();

    if (couponAmt > subTotal) {
      return subTotal;
    }

    return couponAmt;
  };
  const cost = {
    subTotal: calculateSubTotal(),
    couponDiscount: calculateCouponAmount(),

    totalToShow: function () {
      const toAdd = this.subTotal;
      const toSubtract = this.couponDiscount;

      const estimated = toAdd - toSubtract;
      return estimated > 0 ? estimated : 0;
    },
  };
  // const { cartQty } = useTypedSelector_v2((state) => state.cart);
  // const { fetchShipping } = CheckoutController();
  // useEffect(() => {
  //   if (cartQty) {
  //     fetchShipping(subTotal);
  //   }
  // }, [subTotal]);
  const getNewShippingCost = (shippingCost: number): number => {
    if (isEmployeeLoggedIn) {
      return employeeLogin.shippingPrice;
    }

    return shippingCost;
  };

  const postData = (path: string, params: { [key: string]: string }) => {
    console.log(path, params, '<======>');
    // const hidden_form = document.createElement('form');
    // hidden_form.method = 'POST';
    // hidden_form.action = path;
    // hidden_form.onsubmit = (e) => {
    //   e.preventDefault();
    //   console.log(e, 'ye this is ');
    // };
    // for (const key in params) {
    //   if (params.hasOwnProperty(key)) {
    //     const hidden_input = document.createElement('input');
    //     hidden_input.type = 'hidden';
    //     hidden_input.name = key;
    //     hidden_input.value = params[key];
    //     hidden_form.appendChild(hidden_input);
    //   }
    // }
    // document.body.appendChild(hidden_form);
    // hidden_form.submit();
  };

  const punchoutHandler = async () => {
    const SID = localStorage.getItem('P_SID');
    if (SID) {
      const sessionId = atob(SID);
      const punchoutResponse = await punchoutCheckout({
        sessionId,
        customerId,
      });
      console.log(punchoutResponse);
      postData(punchoutResponse.actionUrl, {
        'cxml-urlencoded': `<!DOCTYPE cXML SYSTEM 'http://xml.cxml.org/schemas/cXML/1.1.009/cXML.dtd'><cXML payloadID='200308221150.1061578208432.5888140454604746680@punchout2go.com' timestamp='2003-08-22T11:50:27'><Header><From><Credential domain='DUNS'><Identity>1085</Identity></Credential></From><To><Credential domain='NetworkId'><Identity>1085</Identity></Credential></To><Sender><Credential domain='https://humanadev.parsonskellogg.com/ '><Identity>testing@punchout2go.com</Identity></Credential><UserAgent>PunchOut2Go Test Client v1</UserAgent></Sender></Header><Message><PunchOutOrderMessage><BuyerCookie>pI64e3281d099d5</BuyerCookie><PunchOutOrderMessageHeader operationAllowed='edit'><Total><Money currency='USD'>28.00</Money></Total></PunchOutOrderMessageHeader><ItemIn quantity='14'><ItemID><SupplierPartID>77277</SupplierPartID><SupplierPartAuxiliaryID>orderid=1500707#CustomerID=77277#Color:Peppermint Polo#Size:SM</SupplierPartAuxiliaryID></ItemID><ItemDetail><UnitPrice><Money currency='USD'>100.00</Money></UnitPrice><Description xml:lang='en'>Men's Peter Millar Drum Performance Jersey Polo</Description><UnitOfMeasure>EA</UnitOfMeasure><Classification domain='UNSPSC'>80141605</Classification><ManufacturerName>Peter Millar</ManufacturerName></ItemDetail></ItemIn><ItemIn quantity='14'><ItemID><SupplierPartID>77277</SupplierPartID><SupplierPartAuxiliaryID>orderid=1500707# CustomerID=77277#Color:Peppermint Polo#Size:SM</SupplierPartAuxiliaryID></ItemID><ItemDetail><UnitPrice><Money currency='USD'>100.00</Money></UnitPrice><Description xml:lang='en'>Men's Peter Millar Drum Performance Jersey Polo</Description><UnitOfMeasure>EA</UnitOfMeasure><Classification domain='UNSPSC'>80141605</Classification><ManufacturerName>Peter Millar</ManufacturerName></ItemDetail></ItemIn></PunchOutOrderMessage></Message></cXML>`,
        Aribauser: 'AribaUser',
      });
    }
  };

  return (
    <div className='border border-gray-border bg-white p-[15px]'>
      <div
        className={`${
          storeCode !== _Store_CODES.USAAHEALTHYPOINTS && 'bg-light-gray'
        } w-full text-sub-text font-medium px-[15px] py-[15px]`}
      >
        {__pagesText.CheckoutPage.orderSummary.OrderSummary}
      </div>
      <div className='px-[15px] py-[15px]'>
        <dl className='space-y-2'>
          <div className='flex items-center justify-between pt-[10px]'>
            <dt className='text-normal-text'>Subtotal:</dt>
            <dd className='text-normal-text'>
              <Price value={subTotal + totalLogoCharges} />
            </dd>
          </div>
          {couponDetails?.amount != 0 && couponDetails?.amount != undefined && (
            <div className='flex items-center justify-between pt-[10px] pb-[20px]'>
              <dt className='text-base'>
                Promo{' '}
                <span
                  className='text-anchor cursor-pointer'
                  onClick={() => removeCouponCodeHandler()}
                >
                  (Remove)
                </span>
              </dt>
              <dd className='text-base font-medium text-gray-900 '>
                - <Price value={couponDetails?.amount} />
              </dd>
            </div>
          )}

          <div className='border-t border-t-gray-border pt-[10px] flex items-center justify-between'>
            <dt className='text-normal-text'>
              <span
                className={`${
                  storeCode === _Store_CODES.USAAHEALTHYPOINTS &&
                  '!font-semibold'
                }`}
              >
                Estimated Total
              </span>
            </dt>
            <dd className='text-normal-text font-medium'>
              <Price value={cost.totalToShow()} />
            </dd>
          </div>
        </dl>
      </div>
      {storeCode != _Store.type6 && storeCode !== _Store_CODES.UNITi && (
        <div
          className={`flex justify-between items-center ${
            storeCode !== _Store_CODES.USAAHEALTHYPOINTS && 'bg-light-gray'
          } w-full text-sub-text font-bold px-[15px] py-[5px]`}
        >
          <div>Total:</div>
          <div>
            <Price
              value={
                totalPrice + getNewShippingCost(selectedShippingModel?.price)
              }
            />
          </div>
        </div>
      )}
      {!loggedIn && thirdPartyLogin ? (
        <div className='mt-[15px]'>
          <button
            className='btn btn-lg btn-secondary !flex items-center justify-center w-full'
            onClick={SamlloginHandler}
            type='button'
          >
            LOGIN VIA SAML
          </button>
        </div>
      ) : showCheckoutButton ? (
        <div className='mt-4'>
          <Link className='' href={paths.CHECKOUT}>
            <a className='btn btn-lg btn-secondary !flex items-center justify-center w-full'>
              <span className='material-icons text-lg mr-[2px]'>
                shopping_cart
              </span>
              CHECKOUT NOW
            </a>
          </Link>
        </div>
      ) : (
        <button
          onClick={punchoutHandler}
          className='btn btn-lg btn-secondary !flex items-center justify-center w-full'
        >
          <span className='material-icons text-lg mr-[2px]'>shopping_cart</span>
          PUNCHOUT CHECKOUT
        </button>
      )}
    </div>
  );
};

export default CartSummarryType4;
