export interface ICategory {
  categoryId: number;
  name: string;
  imageUrl: string;
  backgroundColor: string;
}

export interface ICategoryResponse {
  categories: Array<ICategory>;
}
