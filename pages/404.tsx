import { _defaultTemplates } from '@configs/template.config';
import PageNotFound from '@templates/404';
import { NextPage } from 'next';

const Custom404: NextPage = () => {
  return <PageNotFound id={_defaultTemplates[404]} />;
};

export default Custom404;
