import { useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { _modals } from './modal';

const QuickHelpModal: React.FC<{
  modalHandler: (val: null | _modals | 'Display') => void;
}> = ({ modalHandler }) => {
  const isLoggedIn = useTypedSelector_v2((state) => state.user.customer);

  const router = useRouter();
  const [tabOpen, setTabOpen] = useState<string>('');

  const handleOpenCloseFunction = (tabStatus: string) => {
    setTabOpen(tabStatus);
    tabStatus === tabOpen && setTabOpen('');
  };

  return (
    <>
      <div
        id='QuickHelpModal'
        className=' overflow-y-auto overflow-x-hidden fixed z-100 justify-center items-center h-modal inset-0 text-default-text'
      >
        <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
          <div
            className={`relative px-[16px] w-full max-w-3xl h-full md:h-auto`}
          >
            <div className='relative bg-[#ffffff] shadow max-h-screen overflow-y-auto h-full rounded-md'>
              <div className='flex justify-between items-center p-[15px] rounded-t border-b sticky top-0 left-0 bg-[#ffffff] z-50'>
                <div className='font-[600] text-medium-text'>QUICK HELP</div>
                <button
                  type='button'
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] p-[6px] ml-auto inline-flex items-center'
                  onClick={() => modalHandler(null)}
                >
                  <svg
                    className='w-[24px] h-[24px]'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>

              <section className='mb-20'>
                <div className='container mx-auto'>
                  <ul className='mt-4'>
                    <li className='mb-1.5 overflow-hidden last:mb-0 border border-light-gray rounded-[3px]'>
                      <button
                        className='w-full flex justify-between items-center text-left font-bold font-heading bg-light-gray px-2 py-2 border-0 hover:border-0'
                        onClick={() =>
                          isLoggedIn
                            ? handleOpenCloseFunction('Pricing')
                            : modalHandler('login')
                        }
                      >
                        <div className='text-default-text'>
                          <h3>Pricing</h3>
                        </div>
                        {isLoggedIn && (
                          <span className='material-icons-outlined'>
                            {tabOpen === 'Pricing'
                              ? 'remove_circle_outline'
                              : 'add_circle_outline'}
                          </span>
                        )}
                      </button>
                      <div
                        className='text-default-text px-2 pt-2 border-t border-light-gray display:block'
                        style={{ display: tabOpen === 'Pricing' ? '' : 'none' }}
                      >
                        <div className=''>
                          <p>
                            <strong>Your Item</strong> - You receive a discount
                            off the retail price, based on the total number of
                            pieces in your order (regardless of mixed styles).
                            See below.
                          </p>
                          <p>
                            <strong>Add Your Logo</strong> - $5 per item (this
                            is a required charge)
                          </p>
                          <p>
                            <strong>Add Your Name</strong> - $10 per item (this
                            is optional).$5 for a second line of text.
                          </p>
                          <p>
                            <strong>Shipping</strong> - $3 per item
                          </p>
                          <p>
                            <strong>Tax</strong> - We charge sales tax in some
                            states where applicable. This will be waived if you
                            provide a valid Tax Exemption certificate from your
                            organization.
                          </p>
                          <div className='p-t-20'>
                            <p>
                              <strong>2019 Patagonia Pricing:</strong>
                            </p>
                          </div>
                          <p>
                            10-49 Units - 20% discount off original retail
                            prices
                          </p>
                          <p>
                            50-99 Units - 25% discount off original retail
                            prices
                          </p>
                          <p>
                            100+ Units - 30% discount off original retail prices
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className='mb-1.5 overflow-hidden last:mb-0 border border-light-gray rounded-[3px]'>
                      <button
                        className='w-full flex justify-between items-center text-left font-bold font-heading bg-light-gray px-2 py-2 border-0 hover:border-0'
                        onClick={() =>
                          handleOpenCloseFunction('minimunRequirement')
                        }
                      >
                        <div className='text-default-text'>
                          <h3>Minimum Requirements</h3>
                        </div>
                        <span className='material-icons-outlined'>
                          {tabOpen === 'minimunRequirement'
                            ? 'remove_circle_outline'
                            : 'add_circle_outline'}
                        </span>
                      </button>
                      <div
                        className='text-default-text px-2 pt-2 border-t border-light-gray'
                        style={{
                          display:
                            tabOpen === 'minimunRequirement' ? '' : 'none',
                        }}
                      >
                        <div className=''>
                          <p>
                            <strong>
                              The minimum per style is 4 pieces per color,
                            </strong>{' '}
                            which can be split across sizes. Your order must
                            have a minimum of 10 total pieces. We highly
                            recommend limiting the total number of styles
                            selected by your group.
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className='mb-1.5 overflow-hidden last:mb-0 border border-light-gray rounded-[3px]'>
                      <button
                        className='w-full flex justify-between items-center text-left font-bold font-heading bg-light-gray px-2 py-2 border-0 hover:border-0'
                        onClick={() => handleOpenCloseFunction('inventory')}
                      >
                        <div className='text-default-text'>
                          <h3>Inventory</h3>
                        </div>
                        <span className='material-icons-outlined'>
                          {tabOpen === 'inventory'
                            ? 'remove_circle_outline'
                            : 'add_circle_outline'}
                        </span>
                      </button>
                      <div
                        className='text-default-text px-2 pt-2 border-t border-light-gray'
                        style={{
                          display: tabOpen === 'inventory' ? '' : 'none',
                        }}
                      >
                        <div className=''>
                          <p>
                            The inventory displayed on this site is updated
                            daily and reflects the immediately available stock
                            from Patagonia’s Corporate line.{' '}
                            <strong>
                              Inventory is subject to change at any time,
                            </strong>{' '}
                            and placing your order online does not guarantee
                            inventory.
                          </p>
                          <p>
                            Orders for product backordered within 45 days will
                            be accepted, however your entire order will not ship
                            until all items are available. The ship date shown
                            on your order reflects the furthest-out availability
                            date, plus production time. We will not send split
                            shipments based on item availability date unless
                            separate orders are placed, each meeting minimum
                            order requirements and qualifying for their
                            appropriate discount levels.
                          </p>
                          <p className=''>
                            We access a separate inventory from Patagonia’s
                            retail website, so availability on patagonia.com
                            does not guarantee inventory for your PK health
                            order.
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className='mb-1.5 overflow-hidden last:mb-0 border border-light-gray rounded-[3px]'>
                      <button
                        className='w-full flex justify-between items-center text-left font-bold font-heading bg-light-gray px-2 py-2 border-0 hover:border-0'
                        onClick={() =>
                          handleOpenCloseFunction('yourLogoProofing')
                        }
                      >
                        <div className='text-default-text'>
                          <h3>Your Logo & Proofing</h3>
                        </div>
                        <span className='material-icons-outlined'>
                          {tabOpen === 'yourLogoProofing'
                            ? 'remove_circle_outline'
                            : 'add_circle_outline'}
                        </span>
                      </button>
                      <div
                        className='text-default-text px-2 pt-2 border-t border-light-gray'
                        style={{
                          display: tabOpen === 'yourLogoProofing' ? '' : 'none',
                        }}
                      >
                        <div className=''>
                          <p>
                            Please upload your logo during the ordering process,
                            or email it to{' '}
                            <a href=''>health@parsonskellogg.com</a> if it is
                            not able to be uploaded. Once your order is placed,
                            we will provide a photo of your logo embroidered on
                            a swatch of fabric for you to approve before the
                            order moves to production.
                          </p>
                          <p>
                            Note: Logos must be in one of the following formats
                            in order to be uploaded to our site: JPG, PNG, TIF,
                            BMP, GIF. If your logo preview shows a white box
                            around your logo, this will not actually appear on
                            your embroidered garment.
                          </p>
                          <p className=''>
                            <strong>
                              All items on your order must have the same logo in
                              the same location.
                            </strong>{' '}
                            If you’d like to order items with different logos
                            (ie. one logo on 10 pieces, and a different logo on
                            20 pieces), a separate order will need to be placed
                            for each variation.
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className='mb-1.5 overflow-hidden last:mb-0 border border-light-gray rounded-[3px]'>
                      <button
                        className='w-full flex justify-between items-center text-left font-bold font-heading bg-light-gray px-2 py-2 border-0 hover:border-0'
                        onClick={() => handleOpenCloseFunction('orderTimeline')}
                      >
                        <div className='text-default-text'>
                          <h3>Ordering Timeline</h3>
                        </div>
                        <span className='material-icons-outlined'>
                          {tabOpen === 'orderTimeline'
                            ? 'remove_circle_outline'
                            : 'add_circle_outline'}
                        </span>
                      </button>
                      <div
                        className='text-default-text px-2 pt-2 border-t border-light-gray'
                        style={{
                          display: tabOpen === 'orderTimeline' ? '' : 'none',
                        }}
                      >
                        <div className='panel-body'>
                          <div className=''>
                            <p>
                              <strong>Step 1:</strong> Prepare Your Order
                            </p>
                            <ul className='list-disc ml-4 mb-2'>
                              <li>Register for an account on PK health</li>
                              <li>
                                Read the FAQ page for additional information
                              </li>
                              <li>
                                Select the styles you will offer your group, and
                                gather orders from everyone
                              </li>
                            </ul>
                          </div>
                          <div className=''>
                            <p>
                              <strong>Step 2:</strong> Place Your Order
                            </p>
                            <ul className='list-disc ml-4 mb-2'>
                              <li>Add all items to your cart</li>
                              <li>Upload your logo for all items</li>
                              <li>
                                Add personalizations (if desired) within the
                                shopping cart. Be sure to enter names exactly as
                                you’d like them to appear. Personalizations must
                                be limited to 25 characters if going on the
                                chest, or 20 characters on the sleeve (including
                                spaces).
                              </li>
                              <li>
                                Enter your shipping address and payment
                                information, then submit the order
                              </li>
                            </ul>
                          </div>
                          <div className=''>
                            <p>
                              <strong>Step 3:</strong> Approve Your Order
                            </p>
                            <ul className='list-disc ml-4 mb-2'>
                              <li>
                                The PK health team will reach out with any
                                issues or questions on your order
                              </li>
                              <li>
                                The PK health team will provide a proof of your
                                logo. Production cannot begin until it is
                                approved.
                              </li>
                            </ul>
                          </div>
                          <div className=''>
                            <p>
                              <strong>Step 4:</strong> Hang Tight!
                            </p>
                            <ul className='list-disc ml-4 mb-2'>
                              <li>
                                Orders typically take 4-6 weeks from submission
                                to receipt of product.
                              </li>
                              <li>
                                When your order ships, you will be sent the
                                tracking number.
                              </li>
                            </ul>
                          </div>
                          <div className=''>
                            <p>
                              <strong>Step 5:</strong> Review Your Order
                            </p>
                            <ul className='list-disc ml-4 mb-2'>
                              <li>
                                Once you receive your order, be sure to count
                                and review all pieces for accuracy. If there are
                                any issues, contact the PK health team as soon
                                as possible.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <div className='flex justify-between items-center p-[15px] rounded-t border-b sticky top-0 left-0 bg-[#ffffff] z-50'>
                <button
                  className={'btn btn-l btn-primary text-center'}
                  onClick={() => router.push('/orderguidelines')}
                >
                  READ ALL ORDER GUIDELINES
                </button>

                <button
                  className={'btn btn-l btn-primary text-center'}
                  onClick={() => modalHandler(null)}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickHelpModal;
