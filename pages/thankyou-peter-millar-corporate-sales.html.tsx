import PetermillarHeader from '@templates/Header/petermillar__Header';

const ThankYouPage = () => {
  return (
    <div className='bg-light-gray'>
      <PetermillarHeader />
      <section className='pt-[35px] pb-[35px]'>
        <div className='container mx-auto'>
          <div className='max-w-[800px] bg-white mx-auto pt-[35px] pb-[35px] pl-[26px] sm:pl-[40px] lg:pl-[40px] pr-[26px] sm:pr-[40px] lg:pr-[40px] text-center'>
            <div className='font-palatino text-title-text font-semibold mb-[10px]'>
              We Got Your Message!
            </div>
            <div className='text-default-text mb-[70px]'>
              Thanks for providing us with your information. Our team has
              received your new customer account request. Please allow 1-2
              business days for review and approval. Our team may reach out to
              learn more about your request, and your interests in Peter Millar
              Corporate Gear.
            </div>
            <div className='font-palatino text-title-text font-semibold mb-[10px]'>
              Peter Millar Customization
            </div>
            <div className='text-default-text mb-[70px]'>
              Corporate Gear is proud to be the exclusive Peter Millar
              Customization Partner for Corporate Branded Apparel and Gear.
              Peter Millar authorizes customization on an approval-basis for
              every order. For approved customer accounts, place your order and
              our team will reach out if we have any questions.
            </div>
            <div className='font-palatino text-title-text font-semibold mb-[10px]'>
              Contact Us
            </div>
            <div className='text-default-text mb-[70px]'>
              If your request is time sensitive, you can contact Peter Millar
              Corporate Gear.
              <br />
              e: petermillar@corporategear.com
              <br />
              p: (888) 293-5648
            </div>
            <div className='text-center'>
              <div className='block md:inline-block pl-[15px] pr-[15px] md:border-r border-slate-800 border-b border-b-black md:border-b-0 last:border-b-0 pt-[10px] pb-[10px] md:pt-[0px] md:pb-[0px]'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons text-2xl-text'>
                    local_shipping
                  </span>
                  <div className='ml-[10px] text-left text-small-text'>
                    <div className=''>FREE SHIPPING</div>
                    <div>ORDERS OVER $4K</div>
                  </div>
                </div>
              </div>
              <div className='block md:inline-block pl-[15px] pr-[15px] border-b border-b-black md:border-b-0 last:border-b-0 pt-[10px] pb-[10px] md:pt-[0px] md:pb-[0px]'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons text-2xl-text'>style</span>
                  <div className='ml-[10px] text-left text-small-text'>
                    <div className=''>1ST LOGO FREE</div>
                    <div>UP TO 10,000 STITCHES</div>
                  </div>
                </div>
              </div>
              <div className='block md:inline-block pl-[15px] pr-[15px] md:border-l border-slate-800 border-b border-b-black md:border-b-0 last:border-b-0 pt-[10px] pb-[10px] md:pt-[0px] md:pb-[0px]'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons text-2xl-text'>verified</span>
                  <div className='ml-[10px] text-left text-small-text'>
                    <div className=''>FREE PROOF</div>
                    <div>ON ALL ORDERS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThankYouPage;
