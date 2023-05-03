import config from '@configs/api.config';
import { __pagesConstant } from '@constants/pages.constant';
import { _Story } from '@definations/story';
import React, { useEffect, useState } from 'react';
import SD_TemplateType1 from './SD_TemplateType1';

interface _Props {
  id: 'type1';
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
}

const SD_Templates: _StoryTemplates = {
  type1: SD_TemplateType1,
};

const StoryDetailsTemplate: React.FC<_Props> = ({ id, ...rest }) => {
  const Template = SD_Templates[id];

  const [tillSecondRefresh, setTillSecondRefresh] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (tillSecondRefresh === null) {
      setTillSecondRefresh('done first');
      return;
    }

    const script = document.createElement('script');

    script.src = `${config.baseUrl.klaviyo}?company_id=${__pagesConstant._document.klaviyoKey2}`;
    script.async = true;

    document.head.appendChild(script);
  }, [tillSecondRefresh]);

  return <Template {...rest} />;
};

export default StoryDetailsTemplate;
