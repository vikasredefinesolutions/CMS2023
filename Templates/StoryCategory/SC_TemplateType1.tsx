import SL_Stories from '@appComponents/common/StoriesList';
import { _Story } from '@definations/story';
import React from 'react';

interface _Props {
  list: _Story[];
}

const SC_TemplateType1: React.FC<_Props> = ({ list }) => {
  return (
    <>
      <section>
        <div className='container mx-auto px-[16px] pt-[40px] pb-[40px]'>
          <h1 className='text-2xl-text border-b pb-[40px]' role='heading'>
            {list[0].categoryName}
          </h1>
        </div>
      </section>
      <SL_Stories stories={list} showByDefault={12} buttonType='LoadMore' />
    </>
  );
};

export default SC_TemplateType1;
