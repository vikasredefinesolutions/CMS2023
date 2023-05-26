import { CG_STORE_CODE } from '@constants/global.constant';
import {
  GoogleAnalyticsTrackerForAllStore,
  GoogleAnalyticsTrackerForCG,
} from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface _props {
  title: string;
  url: string;
}

const Topic: React.FC<_props> = ({ title, url }) => {
  const router = useRouter();
  const { toggleSideMenu } = useActions_v2();
  const { id: customerId } = useTypedSelector_v2((state) => state.user);
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  // --------------------------------------------------------------
  // const storeLayout = useTypedSelector_v2((state) => state.store.layout);
  const view = useTypedSelector_v2((state) => state.store.view);

  // --------------------------------------------------------------
  // const [focus, setFocus] = useState<boolean>(false);
  const captureGTMEvent = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sale': {
        const payload = {
          storeId: storeId,
          customerId: customerId,
          contentGroup: 'SALE',
          view: 'SALE',
          pageTitle: 'SALE',
          category: 'SALE',
        };
        if (storeId === CG_STORE_CODE)
          GoogleAnalyticsTrackerForCG(
            'GetGTDynamicDataLayerForAnyPage',
            storeId,
            payload,
          );
        else
          GoogleAnalyticsTrackerForAllStore(
            'GetGTDynamicDataLayerForAnyPage',
            storeId,
            payload,
          );
        break;
      }
      case 'faq': {
        const payload = {
          storeId: storeId,
          customerId: customerId,
          contentGroup: 'FAQ',
          view: 'FAQ',
          pageTitle: 'FAQ',
          category: 'FAQ',
        };
        if (storeId === CG_STORE_CODE)
          GoogleAnalyticsTrackerForCG(
            'GetGTDynamicDataLayerForAnyPage',
            storeId,
            payload,
          );
        else
          GoogleAnalyticsTrackerForAllStore(
            'GetGTDynamicDataLayerForAnyPage',
            storeId,
            payload,
          );
        break;
      }
      case 'consultation': {
        const payload = {
          storeId: storeId,
          customerId: customerId,
          contentGroup: 'Consultation',
          view: 'Consultation',
          pageTitle: 'Consultation',
          category: 'Consultation',
        };
        if (storeId === CG_STORE_CODE)
          GoogleAnalyticsTrackerForCG(
            'GetGTDynamicDataLayerForAnyPage',
            storeId,
            payload,
          );
        else
          GoogleAnalyticsTrackerForAllStore(
            'GetGTDynamicDataLayerForAnyPage',
            storeId,
            payload,
          );
        break;
      }
      default:
        return;
    }
  };
  if (view === 'MOBILE') {
    return (
      <div className='text-sm border-b border-gray-300'>
        <div className='flex items-center justify-between py-3 px-2 pl-8'>
          <div className=''>
            <button
              title={title}
              onClick={() => {
                toggleSideMenu('CLOSE');
                captureGTMEvent(title);
                router.push(`/${url}.html`);
              }}
              className=''
            >
              {title}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'DESKTOP') {
    return (
      <Link href={`/${url}.html`} className='flex'>
        <div className=''>
          <button
            title={title}
            // onMouseOver={() => setFocus(true)}
            // onMouseOut={() => setFocus(false)}
            type='button'
            onClick={() => captureGTMEvent(title)}
            className={`relative text-[12px] xl:text-[14px] mt-[5px] xl:ml-[10px] xl:mr-[10px] ml-[5px] mr-[5px] tracking-[1px] z-10 flex items-center font-[600] border-0 border-b-2 pt-[10px] pb-[10px] border-transparent hover:border-[#003a70] text-primary`}
          >
            <span
              className='uppercase text-primary'
              style={{ textTransform: 'uppercase' }}
            >
              {title}
            </span>
          </button>
        </div>
      </Link>
    );
  }

  return <></>;
};

export default Topic;
