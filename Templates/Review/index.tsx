import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import LoginModal_Type2 from '@appComponents/modals/loginModal/LoginModal_Type2';
import { _Store } from '@configs/page.config';
import { _defaultTemplates } from '@configs/template.config';
import { _modals } from '@definations/product.type';
import { _ProductRatings, _ProductReview } from '@services/review';
import { FetchProductRatings } from '@services/review.service';
import { useTypedSelector_v2 } from 'hooks_v2';
import React, { useEffect, useState } from 'react';
import ReviewDetails_Type1 from './ReviewDetailsType1';

interface _RatingNReviewProps {
  ratings: _ProductRatings | null;
  reviews: _ProductReview[] | null;
  productId: number;
  storeCode: string;
  attributeId: number;
  userId: number | null;
  // eslint-disable-next-line no-undef, no-unused-vars
  modalHandler: (val: null | _modals) => void;
}
interface _RatingsNreviewsTemplates {
  type1: React.FC<_RatingNReviewProps>;
}

const Templates: _RatingsNreviewsTemplates = {
  type1: ReviewDetails_Type1,
};
interface _props {
  productId: number;
  storeCode: string;
  reviews: _ProductReview[] | null;
  ratings: _ProductRatings | null;
}
const Reviews: React.FC<_props> = ({
  storeCode,
  productId,
  reviews,
  ratings,
}) => {
  const { id: userId } = useTypedSelector_v2((state) => state.user);
  const { code } = useTypedSelector_v2((state) => state.store);
  const [productRatings, setProductRatings] = useState<_ProductRatings | null>(
    ratings,
  );
  const [openModal, setOpenModal] = useState<null | _modals>(null);

  useEffect(() => {
    if (productId) {
      FetchProductRatings(productId).then((response) =>
        setProductRatings(response),
      );
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

  const T = Templates[_defaultTemplates.review];

  return (
    <>
      <T
        productId={productId}
        reviews={reviews}
        attributeId={attributeId}
        modalHandler={modalHandler}
        userId={userId}
        storeCode={storeCode}
        ratings={productRatings}
      />
      {openModal === 'login' &&
        (code === _Store.type2 ? (
          <LoginModal_Type2 modalHandler={modalHandler} />
        ) : (
          <LoginModal modalHandler={modalHandler} />
        ))}
      {openModal === 'forgot' && <ForgotModal modalHandler={modalHandler} />}
    </>
  );
};

export default Reviews;
