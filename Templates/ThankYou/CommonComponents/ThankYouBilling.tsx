import { __pagesText } from "@constants/pages.text";
import { _MyAcc_OrderBillingDetails } from "@definations/APIs/user.res";
import { _ThankYouProps } from "@templates/ThankYou/ThankYou";
import React from "react";

interface _props {
    billing: _MyAcc_OrderBillingDetails | null;
}


const ThankYouBilling : React.FC <_props> =( {billing}) =>{
 return  <>
 <div className="flex justify-start text-medium-text">
    <div className="md:max-w-[500px] w-full">
        <div className="flex justify-between pt-[8px]">
            <div>
                <div className="font-[600]">{__pagesText.ThankYouPage.Billing.BillTo}</div>
                <div className="">
                    <span className="capitalize">{billing?.billingFirstName}{' '}{billing?.billingLastName}</span>
                    <br />
                    <span>{billing?.billingAddress1}{billing?.billingAddress2}</span>
                    <br />
                    <span>{billing?.billingCity}{billing?.billingState}</span>
                    <br />
                    <span>{billing?.billingZip}</span>
                </div>
            </div>
            <div>
                <div className="font-[600]">{__pagesText.ThankYouPage.Billing.ShipTo}</div>
            <div className="">
                    <span className="capitalize">{billing?.shippingFirstName}{' '}{billing?.shippingLastName}</span>
                    <br />
                    <span>{billing?.shippingAddress1}{billing?.shippingAddress2}</span>
                    <br />
                    <span>{billing?.shippingCity}{billing?.shippingState}</span>
                    <br />
                    <span>{billing?.shippingZip}</span>
                </div>
            </div>
        </div>
    </div>
 </div>
 </>
}

export default ThankYouBilling