import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  isLoading: boolean = false;
  products: Product[] = [];

  constructor() {}

  ngOnInit(): void {}
}
