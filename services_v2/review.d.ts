export interface ProductReviewImage {
  id: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  reviewId: number;
  imageName: string;
  displayOrder: number;
  recStatus: string;
}

export interface ReviewModel {
  id: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  productId: string | number;
  customerId: number;
  storeId: number;
  commentHeading: string;
  rating: number;
  helpFullCount: number;
  notHelpFullCount: number;
  recStatus: string;
  images: ProductReviewImage[];
}

export interface ProductReviewType {
  reviewModel: ReviewModel;
}

export interface _ProductRatings {
  totalRatingCount: number;
  ratingAverage: number;
  fiveStarRatingCount: number;
  fourStarRatingCount: number;
  threeStarRatingCount: number;
  twoStarRatingCount: number;
  oneStarRatingCount: number;
}
export interface _ProductReview {
  reviewId: number;
  name: string;
  email: string;
  reviewDate: string;
  rating: number;
  commentHeading: number;
  comments: string;
  helpFullCount: number;
  notHelpFullCount: number;
  images: ReviewImages[];
}
export interface ReviewImages {
  DisplayOrder: number;
  ImageName: string | null;
}

export interface ReviewHelpfull {
  storeProductReviewCount: {
    id: number;
    rowVersion: string;
    location: string;
    ipAddress: string;
    macAddress: string;
    reviewId: number;
    storeid: number;
    yes: number;
    no: number;
    recStatus: string;
  };
}
