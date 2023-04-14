import { _Story } from '@definations/story';
import React from 'react';
import SD_TemplateType1 from './SD_TemplateType1';

interface _Props {
  id: string;
  list: _Story[];
  banner: {
    name: string;
    urlType: string;
    url: string;
  }[];
  story: {
    title: string;
    category: {
      name: string;
      url: string;
    };
    prev: string;
    next: string;
  };
  page: {
    accordionContent: any;
    type: 'blog';
    slug: string;
  };
}

type templateType1 = Omit<_Props, 'id'>;

interface _StoryTemplates {
  type1: React.FC<templateType1>;
  type2: React.FC<templateType1>;
}

const SD_Templates: _StoryTemplates = {
  type1: SD_TemplateType1,
  type2: SD_TemplateType1,
};

const StoryDetailsTemplate: React.FC<_Props> = ({ id, ...rest }) => {
  const Template = SD_Templates[`type${id}` as 'type1' | 'type2'];
  return <Template {...rest} />;
};

export default StoryDetailsTemplate;
