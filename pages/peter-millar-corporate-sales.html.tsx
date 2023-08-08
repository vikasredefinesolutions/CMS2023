import PetermillarHeader from '@templates/Header/petermillar__Header';
import PeterMillarCustomForm from '@templates/PeterMillarCustomForm/PeterMillarCustomForm';

import { NextPage } from 'next';

import { _GetPageType } from '@definations/slug.type';
import { getPageComponents } from '@services/home.service';
import { FetchPageType } from '@services/slug.service';

import SeoHead from '@appComponents/reUsable/SeoHead';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { _globalStore } from 'store.global';

interface _Props {
  accordian: any;
  metaData: any;
}

const CustomFormPeterMillar: NextPage<_Props> = (props) => {
  console.log(props);
  return (
    <>
      <SeoHead
          title={props?.metaData?.meta_Title}
          description={props?.metaData?.meta_Description}
          keywords={props?.metaData?.meta_Keywords}
        />    <div className='bg-light-gray'>
        <PetermillarHeader />
        <PeterMillarCustomForm />
      </div>
    </>

  );
};

export default CustomFormPeterMillar;


export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<GetServerSidePropsResult<_Props>> => {
  const { storeId, code } = _globalStore;
  let accordian: any = [];
  let pageMetaData: _GetPageType | null = null;

  pageMetaData = await FetchPageType({
      storeId: _globalStore.storeId!,
      slug: 'peter-millar-corporate-sales.html',
    });
  
  
  if (pageMetaData) {
    accordian = await getPageComponents({
      pageId: pageMetaData.id,
      type: pageMetaData.type,
    });

   
    

  
  }

  return {
    props: {
      accordian: accordian,
      metaData: pageMetaData,
    },
  };
};
