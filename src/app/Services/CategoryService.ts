import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../Models/Category';

@Injectable()
export class CategoryService {
  categories: Subject<Category[]> = new Subject<Category[]>();
  constructor(private http: HttpClient) {}
  GetAllCategories() {
    return this.http.get<Category[]>(`${environment.apiUrl}/category`);
  }
  GetCategory(id: Number) {
    return this.http.get<Category>(`${environment.apiUrl}/category/${id}`);
  }
  DeleteCategory(id: Number) {
    return this.http.delete(`${environment.apiUrl}/category/${id}`);
  }
  AddCategory(category: Category) {
    return this.http.post(`${environment.apiUrl}/category/`, category);
  }
  UpdateCategory(category: Category) {
    return this.http.put(
      `${environment.apiUrl}/category/${category.categoryId}`,
      category
    );
  }
}
