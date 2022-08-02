import { Category } from './Category';

export class Product {
  productId?: Number;
  Name: string;
  Price: Number;
  Quantity: Number;
  CategoryId: Number;
  Category?: Category;
}
