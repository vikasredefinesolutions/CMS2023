import NxtImage from '@appComponents/reUsable/Image';
import { paths } from '@constants/paths.constant';
import Link from 'next/link';

const HeaderContactUs: React.FC = () => {
  return (
    <div className='flow-root relative pl-[15px]'>
      <Link href={paths.CONTACT_US}>
        <a className='text-primary hover:text-secondary group flex items-center relative pt-[8px] pb-[8px]'>
          <NxtImage
            src='/assets/images/homedepot/support.svg'
            className='h-[30px] w-[30px]'
            alt=''
            useNextImage={false}
            isStatic={true}
          />
        </a>
      </Link>
    </div>
  );
};

export default HeaderContactUs;
