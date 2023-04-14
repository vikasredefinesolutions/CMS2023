import React from 'react';

export interface _WriteReviewProps {}

export interface _WriteReviewTemplates {
  type1: React.FC<_WriteReviewProps>;
  type2: React.FC<_WriteReviewProps>;
  type3: React.FC<_WriteReviewProps>;
  type4: React.FC<_WriteReviewProps>;
}

export interface ReviewFormValues {
  comment: string;
  commentHeading: string;
}
