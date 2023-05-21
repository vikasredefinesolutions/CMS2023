import React from 'react';
const Br_Faq: React.FC = () => {
  return (
    <section
      className='relative overflow-hidden pt-[80px] mt-[0px] mb-[20px] sm:h-[800px] max-h-[6400px] h-auto bg-cover'
      style={{
        backgroundImage: `url(/faq-bg.png)`,
        backgroundAttachment: 'fixed',
      }}
    >
      <div className='flex justify-center items-center flex-wrap'>
        <div className='container'>
          <div className='absolute top-[40%] left-[0px] right-[0px] text-center'>
            <div className='flex justify-center items-center max-w-4xl mx-auto'>
              <div className='text-white text-[20px] lg:text-[96px] sm:text-[40px] mb-[8px] font-semibold'>
                Brand FAQ
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Br_Faq;
