import SeoHead from '@appComponents/reUsable/SeoHead';
import { _defaultTemplates } from '@configs/template.config';
import { __Error, __pageTypeConstant } from '@constants/global.constant';
import { __SuccessErrorText } from '@constants/successError.text';
import { _GetPageType } from '@definations/slug.type';
import { _Story } from '@definations/story';
import { highLightError } from '@helpers/console.helper';
import { useActions_v2 } from '@hooks_v2/index';
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
import React, { useEffect } from 'react';
import { _globalStore } from 'store.global';
interface _StoryCategoryProps {
  data: {
    id: string;
    pageType: __pageTypeConstant.stories;
    list: _Story[] | null;
  };
  metaData: _GetPageType;
}

interface _StoryDetailsProps {
  data: {
    id: string;
    pageType: __pageTypeConstant.blog;
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
      type: __pageTypeConstant.blog;
      slug: string;
    };
    productSku: string;
  };
  metadata: _GetPageType;
}

interface _Something_WentWrong {
  error: __Error.noPageTypeFound;
}

const Story: React.FC<
  _StoryCategoryProps | _StoryDetailsProps | _Something_WentWrong
> = (props) => {
  const { topic_set_isCMS, updatePageType } = useActions_v2();

  useEffect(() => {
    if ('metadata' in props) {
      updatePageType(props.metadata);
    }
  }, []);

  useEffect(() => {
    topic_set_isCMS(true);
    return () => {
      topic_set_isCMS(false);
    };
  }, []);

  if ('error' in props) {
    const { error } = props;
    return <>{error}</>;
  }

  if (props.data.pageType === __pageTypeConstant.stories) {
    return (
      <>
        <SeoHead title={'Stories'} keywords={''} description={''} />
        <StoryCategoryTemplate
          list={props.data.list || []}
          id={_defaultTemplates.storyCategory}
        />
      </>
    );
  }

  if (props.data.pageType === __pageTypeConstant.blog) {
    return (
      <>
        <SeoHead title={'Story'} keywords={''} description={''} />
        <StoryDetailsTemplate
          list={props.data.list || []}
          id={_defaultTemplates.storyDetails}
          banner={props.data.banner || []}
          story={props.data.story}
          page={props.data.page}
          productSku={props.data.productSku}
        />
      </>
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

  // pageMetaData?.type === __pageTypeConstant.blog; // For testing purpose

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
    data: {
      id: _defaultTemplates.storyCategory,
      pageType: __pageTypeConstant.stories,
      list: null,
    },
    metaData: pageMetaData,
  };

  const detailsProps: _StoryDetailsProps = {
    data: {
      id: _defaultTemplates.storyDetails,
      pageType: __pageTypeConstant.blog,
      productSku: '',
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
    },
    metadata: pageMetaData,
  };

  // ------------------------Page check --------------------------------------
  if (pageMetaData.type === __pageTypeConstant.stories) {
    // stories ===>  category Page
    categoryProps.data.list = await GetStoriesByCategoryURL({
      storeId: _globalStore.storeId!,
      pageType: __pageTypeConstant.stories,
      categoryurl: storySlug,
    });

    return { props: categoryProps };
  }

  if (pageMetaData.type === __pageTypeConstant.blog) {
    // Blog ===> Individual Story page
    detailsProps.data.list = await GetStoryList({
      pageType: __pageTypeConstant.blog,
      storeId: _globalStore.storeId!,
    });

    detailsProps.data.page.accordionContent = await getPageComponents({
      pageId: pageMetaData.id,
      type: __pageTypeConstant.blog,
    });

    const { banner, prevNext, category, productSku } =
      await GetNextStoryByStoryID({
        storiesId: pageMetaData.id,
      });

    detailsProps.data.page = {
      ...detailsProps.data.page,
      type: pageMetaData.type,
      slug: pageMetaData.slug,
    };
    detailsProps.data.banner = banner;
    detailsProps.data.productSku = productSku;
    detailsProps.data.story = {
      ...prevNext,
      title: pageMetaData.name,
      category: {
        name: category.name,
        url: category.url,
      },
    };

    return { props: detailsProps };
  }

  return {
    notFound: true,
  };
};
