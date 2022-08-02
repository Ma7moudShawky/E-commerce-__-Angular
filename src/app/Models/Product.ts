import { Category } from './Category';

export class Product {
  productId?: Number;
  name: string;
  price: Number;
  quantity: Number;
  categoryId: Number;
  category?: Category;
  imagePath?: string;
}
