import React from 'react';
import { _PageNotFoundTemplates } from './pageNotFound';
import PageNotFoundType1 from './pageNotFoundType1';

const pageNotFoundTemplates: _PageNotFoundTemplates = {
  type1: PageNotFoundType1,
  type2: PageNotFoundType1,
};

const PageNotFound: React.FC<{ id: string }> = ({ id }) => {
  const Template = pageNotFoundTemplates[`type${id}` as 'type1' | 'type2'];
  return <Template />;
};

export default PageNotFound;
