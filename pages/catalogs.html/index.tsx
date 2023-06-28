import { _defaultTemplates } from '@configs/template.config';
import { _GetPageType } from '@definations/slug.type';
import { getPageComponents } from '@services/home.service';
import { FetchPageType } from '@services/slug.service';
import CatalogDisplayBrands from '@templates/Catalogs';
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import { _globalStore } from 'store.global';

interface _Props {
  accordian: any;
  metaData: any
}
const ShowCatalogs: NextPage = (props) => {
  return <CatalogDisplayBrands id={_defaultTemplates.catalogs} props={props} />;
};

export default ShowCatalogs;


export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<GetServerSidePropsResult<_Props>> => {
  const { storeId } = _globalStore;
  let accordian: any = [];
  let pageMetaData: _GetPageType | null = null;

  pageMetaData = await FetchPageType({
    storeId: _globalStore.storeId!,
    slug: 'catalogs',
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
      metaData: pageMetaData
    },
  };
};

