import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/Category';
import { Product } from 'src/app/Models/Product';
import { CategoryService } from 'src/app/Services/CategoryService';
import { ProductService } from 'src/app/Services/ProductService';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  productImage: File;
  isLoading: boolean = false;
  allCategories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.categoryService.GetAllCategories().subscribe((categories) => {
      this.isLoading = false;
      this.allCategories = categories;
    });
    this.productForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      productPrice: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
      productQuantity: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      productCategory: new FormControl(null, Validators.required),
      productImage: new FormControl(null, Validators.required),
    });
  }
  fileChange(event) {
    this.productImage = event.target.files[0];
  }
  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('Image', this.productImage, this.productImage.name);
      formData.append('CategoryId', this.productForm.value.productCategory);
      formData.append('Name', this.productForm.value.productName);
      formData.append('Price', this.productForm.value.productPrice);
      formData.append('Quantity', this.productForm.value.productQuantity);
      this.productService.AddProduct(formData).subscribe(() => {
        this.productForm.reset();
        this.router.navigate(['/Products']);
      });
    }
  }
}
