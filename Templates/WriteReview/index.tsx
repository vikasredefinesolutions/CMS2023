import { _defaultTemplates } from '@configs/template.config';
import React from 'react';
import { _WriteReviewTemplates } from './WriteReview';
import WriteReviewTemplate_1 from './WriteReviewTemplate_1';
import WriteReviewTemplate_2 from './WriteReviewTemplate_2';
import WriteReviewTemplate_3 from './WriteReviewTemplate_3';
import WriteReviewTemplate_4 from './WriteReviewTemplate_4';

interface _props {
  id: string;
}
const ReviewTemplate: _WriteReviewTemplates = {
  type1: WriteReviewTemplate_1,
  type2: WriteReviewTemplate_2,
  type3: WriteReviewTemplate_3,
  type4: WriteReviewTemplate_4,
};

const WriteReview: React.FC<_props> = ({ id }) => {
  const ReviewTemplateSelected = ReviewTemplate[_defaultTemplates.writeReview];

  return <ReviewTemplateSelected />;
};

export default WriteReview;
