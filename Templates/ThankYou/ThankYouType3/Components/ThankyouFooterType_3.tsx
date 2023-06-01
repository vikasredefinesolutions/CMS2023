import { __pagesText } from '@constants/pages.text';
import { _MyAcc_OrderBillingDetails } from '@definations/APIs/user.res';
import ThankYouSubTotal from './ThankYouSubTotal';
interface _props {
  billing: _MyAcc_OrderBillingDetails | null;
}
const ThankyouFooterType_3: React.FC<_props> = ({ billing }) => {
  return (
    <>
      <div className='flex flex-wrap justify-between text-medium-text'>
        <div className='lg:max-w-[500px] md:w-1/2 md:pr-[10px] w-full'>
          <div className='flex justify-between pt-[8px]'>
            <div>
              <div className='font-[600] pt-[15px]'>
                {__pagesText.ThankYouPage.Billing.BillTo}
              </div>
              <div className='pt-[8px]'>
                <span className='capitalize'>
                  {billing?.billingFirstName} {billing?.billingLastName}
                </span>
                <br />
                <span>
                  {billing?.billingAddress1}
                  {billing?.billingAddress2}
                </span>
                <br />
                <span>
                  {billing?.billingCity},{billing?.billingState}
                </span>
                <br />
                <span>{billing?.billingZip}</span>
              </div>
            </div>
            <div>
              <div className='font-[600] pt-[15px]'>
                {__pagesText.ThankYouPage.Billing.ShipTo}
              </div>
              <div className='pt-[8px]'>
                <span className='capitalize'>
                  {billing?.shippingFirstName} {billing?.shippingLastName}
                </span>
                <br />
                {billing?.shippingAddress1}
                {billing?.shippingAddress2}
                <br />
                {billing?.shippingCity},{billing?.shippingState}
                <br />
                {billing?.shippingZip}
              </div>
            </div>
          </div>
        </div>
        <ThankYouSubTotal billing={billing} />
        {/* <div className='lg:max-w-[400px] md:pl-[10px] md:w-1/2 w-full'>
          <dl className='pt-[15px]'>
            <div className='flex justify-between pt-[8px]'>
              <dt className='font-[600]'>Sub Total:</dt>
              <dd className=''>$21,133.00</dd>
            </div>
            <div className='flex justify-between pt-[8px]'>
              <dt className=''>Shipping:</dt>
              <dd className=''>$31.29</dd>
            </div>
            <div className='flex justify-between border-t mt-[8px] border-gray-border pt-[8px]'>
              <dt className='font-[600] pt-[8px]'>Grand Total:</dt>
              <dd className='font-[600] pt-[8px]'>$21,224.00</dd>
            </div>
          </dl>
        </div> */}
      </div>
    </>
  );
};
export default ThankyouFooterType_3;
