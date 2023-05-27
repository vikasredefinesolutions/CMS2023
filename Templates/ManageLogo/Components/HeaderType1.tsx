import { __pagesText } from '@constants/pages.text';

const HeaderType1 = () => {
  return (
    <>
      <tr>
        <th
          className='bg-[#f5f5f6] text-center py-[14px] border-r border-[#ddd]'
          align='center'
        >
          {__pagesText.ManageLogo.Logo}
        </th>
        <th
          className='bg-[#f5f5f6] text-center py-[14px] border-r border-[#ddd]'
          align='center'
        >
          {__pagesText.ManageLogo.ApprovedLogo}
        </th>
        <th
          className='bg-[#f5f5f6] text-center py-[14px] border-r border-[#ddd]'
          align='center'
        >
          {__pagesText.ManageLogo.LogoName}
        </th>
        <th
          className='bg-[#f5f5f6] text-center py-[14px] border-r border-[#ddd]'
          align='center'
        >
          {__pagesText.ManageLogo.LogoNumber}
        </th>
        <th
          className='bg-[#f5f5f6] text-center py-[14px] border-r border-[#ddd]'
          align='center'
        >
          {__pagesText.ManageLogo.LogoSize}
        </th>
        <th
          className='bg-[#f5f5f6] text-center py-[14px] border-r border-[#ddd]'
          align='center'
        >
          {__pagesText.ManageLogo.ProductType}
        </th>
        <th
          className='bg-[#f5f5f6] text-center py-[14px] border-r border-[#ddd]'
          align='center'
        >
          {__pagesText.ManageLogo.LogoPosition}
        </th>
        <th
          className='bg-[#f5f5f6] text-center py-[14px] border-r border-0'
          align='center'
        >
          {__pagesText.ManageLogo.Status}
        </th>
      </tr>
    </>
  );
};

export default HeaderType1;
