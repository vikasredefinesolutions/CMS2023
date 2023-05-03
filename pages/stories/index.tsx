import { _defaultTemplates } from '@configs/template.config';
import { __pageTypeConstant } from '@constants/global.constant';
import { __SuccessErrorText } from '@constants/successError.text';
import { _Brand } from '@definations/brand';
import { _Story } from '@definations/story';
import { FetchBrands } from '@services/header.service';
import { GetStoryList } from '@services/story.service';
import StoryList_Template from '@templates/StoryList';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import React from 'react';
import { _globalStore } from 'store.global';

interface _Props {
  id: string;
  list: _Story[] | null;
  brands: _Brand[] | null;
}

const Stories: React.FC<_Props> = (props) => {
  if (!props.list || !props.id) {
    return <>{__SuccessErrorText.tryRefreshingThePage}</>;
  }

  if (props.list.length === 0) {
    return <>{__SuccessErrorText.noStoriesFound}</>;
  }

  return (
    <StoryList_Template
      list={props.list}
      brands={props.brands || []}
      id={_defaultTemplates.storyList}
    />
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
