import React from 'react';

const Br_Faq: React.FC = () => {
  return (
    <section
      className='relative overflow-hidden pt-[80px] mt-[0px] mb-[20px] sm:h-[800px] h-auto bg-cover'
      style={{
        backgroundImage:
          "url('/images/brands-img/faq-bg.png'); background-attachment: fixed;",
      }}
    >
      <div className='flex justify-center items-center flex-wrap'>
        <div className='container'>
          <div className='absolute top-[40%] left-[0px] right-[0px] text-center'>
            <div className='flex justify-center items-center max-w-4xl mx-auto'>
              <div className='text-2xl-text text-white text-[20px] lg:text-[96px] sm:text-[40px] mb-[8px]'>
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
