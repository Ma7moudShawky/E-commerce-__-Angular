import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../Models/Product';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  AddProduct(product: FormData) {
    return this.http.post(`${environment.apiUrl}/Product`, product);
  }
  GetProduct(id: Number) {
    return this.http.get(`${environment.apiUrl}/Product/${id}`);
  }
  UpdateProduct(product: FormData, id: Number) {
    return this.http.put(`${environment.apiUrl}/Product/${id}`, product);
  }
}
