import { categories } from "@/schemas/menuItem/CreateNewMenuItemFormSchema";

export type Category = typeof categories[number];

export interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  category: Category;
}

export interface ItemResponse {
  items: Item[];
}

export interface ItemPostFields {
  name: string;
  description: string;
  price: number;
  image: File;
  category: Category;
}
