import { __Error, __pageTypeConstant } from '@constants/global.constant';
import { __SuccessErrorText } from '@constants/successError.text';
import { _GetPageType } from '@definations/slug.type';
import { _Story } from '@definations/story';
import { highLightError } from '@helpers/console.helper';
import { getPageComponents } from '@services/home.service';
import { FetchPageType } from '@services/slug.service';
import {
  GetNextStoryByStoryID,
  GetStoriesByCategoryURL,
  GetStoryList,
} from '@services/story.service';
import StoryCategoryTemplate from '@templates/StoryCategory';
import StoryDetailsTemplate from '@templates/StoryDetails';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import React from 'react';
import { _globalStore } from 'store.global';
interface _StoryCategoryProps {
  id: string;
  pageType: 'stories';
  list: _Story[] | null;
}

interface _StoryDetailsProps {
  id: string;
  pageType: 'blog';
  list: _Story[] | null;
  story: {
    title: string;
    category: {
      name: string;
      url: string;
    };
    prev: string;
    next: string;
  };
  banner:
    | {
        name: string;
        urlType: string;
        url: string;
      }[]
    | null;
  page: {
    // @ts-ignore: Unreachable code error
    accordionContent: any;
    type: 'blog';
    slug: string;
  };
}

interface _Something_WentWrong {
  error: __Error.noPageTypeFound;
}

const Story: React.FC<
  _StoryCategoryProps | _StoryDetailsProps | _Something_WentWrong
> = (props) => {
  if ('error' in props) {
    const { error } = props;
    return <>{error}</>;
  }

  if (props.pageType === 'stories') {
    return (
      <StoryCategoryTemplate list={props.list || []} id={props.id || '1'} />
    );
  }

  if (props.pageType === 'blog') {
    return (
      <StoryDetailsTemplate
        list={props.list || []}
        id={props.id || '1'}
        banner={props.banner || []}
        story={props.story}
        page={props.page}
      />
    );
  }

  return <>{__SuccessErrorText.SomethingWentWrong}</>;
};

export default Story;

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////         SERVER    SIDE
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<
  GetServerSidePropsResult<
    _StoryCategoryProps | _StoryDetailsProps | _Something_WentWrong
  >
> => {
  let storySlug = '';
  let pageMetaData: _GetPageType | null = null;

  if (context.params) {
    storySlug = context.params['storyID'] as string;
  }

  pageMetaData = await FetchPageType({
    storeId: _globalStore.storeId!,
    slug: storySlug,
  });

  // pageMetaData?.type === 'blog'; // For testing purpose

  if (pageMetaData === null) {
    highLightError({
      error: __SuccessErrorText.noPageTypeFound,
      component: 'slug: getServerSideProps.tsx',
    });
    return {
      props: {
        error: __Error.noPageTypeFound,
      },
    };
  }

  if (pageMetaData.type === '404') {
    return { notFound: true };
  }

  // -----------------------Props Initialization--------------------------
  const categoryProps: _StoryCategoryProps = {
    id: '1',
    pageType: 'stories',
    list: null,
  };

  const detailsProps: _StoryDetailsProps = {
    id: '1',
    pageType: 'blog',
    list: null,
    story: {
      category: {
        url: '',
        name: '',
      },
      title: '',
      prev: '',
      next: '',
    },
    banner: null,
    page: {
      accordionContent: '',
      type: __pageTypeConstant.blog,
      slug: pageMetaData.slug,
    },
  };

  // ------------------------Page check --------------------------------------
  if (pageMetaData.type === __pageTypeConstant.stories) {
    // stories ===>  category Page
    categoryProps.list = await GetStoriesByCategoryURL({
      storeId: _globalStore.storeId!,
      pageType: __pageTypeConstant.blog,
      categoryurl: storySlug,
    });
  }

  if (pageMetaData.type === __pageTypeConstant.blog) {
    // Blog ===> Individual Story page
    detailsProps.list = await GetStoryList({
      pageType: __pageTypeConstant.blog,
      storeId: _globalStore.storeId!,
    });

    detailsProps.page.accordionContent = await getPageComponents({
      pageId: pageMetaData.id,
      type: '',
    });

    const { banner, prevNext } = await GetNextStoryByStoryID({
      storiesId: pageMetaData.id,
    });

    detailsProps.page = {
      ...detailsProps.page,
      type: pageMetaData.type,
      slug: pageMetaData.slug,
    };
    detailsProps.banner = banner;
    detailsProps.story = {
      ...prevNext,
      title: pageMetaData.name,
      category: {
        name: 'missing',
        url: 'missing',
      },
    };
  }

  const props = pageMetaData.type === 'stories' ? categoryProps : detailsProps;

  return {
    props: props,
  };
};
