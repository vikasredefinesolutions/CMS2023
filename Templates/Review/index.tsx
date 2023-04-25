import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import { _modals } from '@appComponents/modals/modal';
import { _defaultTemplates } from '@configs/template.config';
import { ProductReviewCounts } from '@services/review';
import { FetchProductReview } from '@services/review.service';
import { useTypedSelector_v2 } from 'hooks_v2';
import React, { useEffect, useState } from 'react';
import ReviewDetails_Type1 from './ReviewDetailsType1';
import ReviewDetails_Type2 from './ReviewDetailsType2';
import { _ReviewDetailsTemplates } from './review.d';

const ProductDetailTemplates: _ReviewDetailsTemplates = {
  type1: ReviewDetails_Type1,
  type2: ReviewDetails_Type2,
};
interface _props {
  productId: number;
  storeCode: string;
}
const Reviews: React.FC<_props> = ({ storeCode, productId }) => {
  const { id: userId } = useTypedSelector_v2((state) => state.user);
  const [reviewsCount, setReviewsCount] = useState<ProductReviewCounts>();
  const [openModal, setOpenModal] = useState<null | _modals>(null);

  useEffect(() => {
    if (productId) {
      FetchProductReview(productId).then((count) => setReviewsCount(count));
    }
  }, [productId]);

  const attributeId = useTypedSelector_v2(
    (state) => state.product.selected.color.attributeOptionId,
  );

  // const router = useRouter();

  const modalHandler = (param: null | _modals) => {
    if (param) {
      setOpenModal(param);
      return;
    }
    setOpenModal(null);
  };

  const ReviewDetails = ProductDetailTemplates[_defaultTemplates.review];
  return (
    <>
      <ReviewDetails
        productId={productId}
        attributeId={attributeId}
        modalHandler={modalHandler}
        userId={userId}
        storeCode={storeCode}
        reviewsCount={reviewsCount}
      />
      {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
      {openModal === 'forgot' && <ForgotModal modalHandler={modalHandler} />}
    </>
  );
};

export default Reviews;
