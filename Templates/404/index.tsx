import React from 'react';
import { _PageNotFoundTemplates } from './pageNotFound';
import PageNotFoundType1 from './pageNotFoundType1';

const pageNotFoundTemplates: _PageNotFoundTemplates = {
  type1: PageNotFoundType1,
  type2: PageNotFoundType1,
};

const PageNotFound: React.FC<{ id: 'type1' }> = ({ id }) => {
  const Template = pageNotFoundTemplates[id];
  return <Template />;
};

export default PageNotFound;
