import SeoHead from '@appComponents/reUsable/SeoHead';
import { _defaultTemplates } from '@configs/template.config';
import { __pageTypeConstant } from '@constants/global.constant';
import { __SuccessErrorText } from '@constants/successError.text';
import { _Brand } from '@definations/brand';
import { _Story } from '@definations/story';
import { useActions_v2 } from '@hooks_v2/index';
import { FetchBrands } from '@services/header.service';
import { GetStoryList } from '@services/story.service';
import StoryList_Template from '@templates/StoryList';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import React, { useEffect } from 'react';
import { _globalStore } from 'store.global';

interface _Props {
  id: string;
  list: _Story[] | null;
  brands: _Brand[] | null;
}

const Stories: React.FC<_Props> = (props) => {
  const { store_CurrentPage } = useActions_v2();

  useEffect(() => {
    store_CurrentPage('STORIES');

    return () => {
      store_CurrentPage(null);
    };
  }, []);

  if (!props.list || !props.id) {
    return <>{__SuccessErrorText.tryRefreshingThePage}</>;
  }

  if (props.list.length === 0) {
    return <>{__SuccessErrorText.noStoriesFound}</>;
  }

  return (
    <>
      <SeoHead
        title='Custom Embroidery | Branded Promotional & Corporate Clothing'
        description='Corporate Gear offers custom-embroidered corporate apparel, branded clothing, & accessories. Get YOUR logo printed on top-tier brands. Order today!'
        keywords=''
      />
      <StoryList_Template
        list={props.list}
        brands={props.brands || []}
        id={_defaultTemplates.storyList}
      />
    </>
  );
};

export default Stories;

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<_Props>
> => {
  const list = await GetStoryList({
    pageType: __pageTypeConstant.blog,
    storeId: _globalStore.storeId!,
  });
  1;
  const brands = await FetchBrands({ storeId: _globalStore.storeId! })
    .then((res) => {
      return res?.brands || null;
    })
    .catch(() => null);

  return {
    props: {
      id: _defaultTemplates.storyList,
      list: list,
      brands: brands,
    },
  };
};
