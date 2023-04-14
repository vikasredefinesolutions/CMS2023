import { __SuccessErrorText } from '@constants/successError.text';
import { _Story } from '@definations/story';
import React from 'react';
import SC_TemplateType1 from './SC_TemplateType1';

interface _Props {
  id: string;
  list: _Story[];
}

const SC_Templates = {
  type1: SC_TemplateType1,
  type2: SC_TemplateType1,
};

const StoryCategoryTemplate: React.FC<_Props> = ({ id, list }) => {
  const Template = SC_Templates[`type${id}` as 'type1' | 'type2'];

  if (list.length === 0) {
    return <>{__SuccessErrorText.noStoriesFound}</>;
  }

  return <Template list={list} />;
};

export default StoryCategoryTemplate;
