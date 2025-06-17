export interface Promotion {
  _id: string;
  authenticationRequired: boolean;
  title: string;
  longDescription: string;
  shortDescription: string;
  imgUrl: string;
  startDate: Date;
  endDate: Date;
}

export interface PromotionResponse {
  promotions: Promotion[];
}

export interface PromotionPostFields {
  endDate: string;
  image: File;
  longDescription: string;
  shortDescription: string;
  startDate: string;
  authenticationRequired: boolean;
  title: string;
}
