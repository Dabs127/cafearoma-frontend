export interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  category: string;
}

export interface ItemResponse {
  items: Item[];
}

export interface ItemPostFields {
  name: string;
  description: string;
  price: number;
  image: File;
  category: string;
}
