import { _defaultTemplates } from '@configs/template.config';
import WriteReview from '@templates/WriteReview';
import { NextPage } from 'next';

const WriteReviewPage: NextPage = () => {
  return <WriteReview id={_defaultTemplates.writeReview} />;
};

export default WriteReviewPage;
