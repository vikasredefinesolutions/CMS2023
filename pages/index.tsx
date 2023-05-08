import SeoHead from '@appComponents/reUsable/SeoHead';
import { getServerSideProps } from '@controllers/getServerSideProps';
import { cLog } from '@helpers/console.helper';

import { _defaultTemplates } from '@configs/template.config';
import PageNotFound from '@templates/404';
import Home from '@templates/Home';
import { NextPage } from 'next';
import {
  _SlugServerSideProps,
  _SlugServerSide_WentWrong,
  _TopicHomeProps,
} from './[slug]/slug';

const TopicHome: NextPage<_SlugServerSideProps | _SlugServerSide_WentWrong> = (
  props,
) => {
  if ('error' in props) {
    const { error } = props;
    return <>{error}</>;
  }

  const { pageMetaData, page, _store } = props;

  if (!_store || !pageMetaData || !page) {
    cLog('THome: No page data found', '404');
    return <PageNotFound id={_defaultTemplates[404]} />;
  }

  if (pageMetaData?.type === '404') {
    cLog('THome: 404', '404');
    return (
      <>
        <SeoHead
          title={pageMetaData?.meta_Title || '404: No Page found'}
          description={pageMetaData?.meta_Description || ''}
          keywords={pageMetaData?.meta_Keywords || 'Branded Promotional'}
        />
        <PageNotFound id={_defaultTemplates[404]} />
      </>
    );
  }

  if (pageMetaData?.type === 'topic') {
    const tprops: _TopicHomeProps = {
      pageData: page.topicHome,
      pageType: pageMetaData?.type,
      slug: pageMetaData?.slug,
    };

    return (
      <>
        <SeoHead
          title={pageMetaData?.meta_Title ? pageMetaData?.meta_Title : 'Home'}
          description={
            pageMetaData?.meta_Description ? pageMetaData?.meta_Description : ''
          }
          keywords={
            pageMetaData?.meta_Keywords
              ? pageMetaData?.meta_Keywords
              : 'Branded Promotional'
          }
        />
        <Home props={tprops} />
      </>
    );
  }

  return (
    <>
      <SeoHead
        title={'No Matches found'}
        description={''}
        keywords={'Branded Promotional'}
      />
      {cLog('No match found', '404')}
      <PageNotFound id={_defaultTemplates[404]} />
    </>
  );
};

export default TopicHome;

export { getServerSideProps };
