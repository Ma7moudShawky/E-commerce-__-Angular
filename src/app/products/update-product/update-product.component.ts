import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/Models/Category';
import { Product } from 'src/app/Models/Product';
import { CategoryService } from 'src/app/Services/CategoryService';
import { ProductService } from 'src/app/Services/ProductService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  productForm: FormGroup;
  productImage: File;
  isLoading: boolean = false;
  allCategories: Category[] = [];
  currentId: number;
  imgSrc: string;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private activatedRout: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.categoryService.GetAllCategories().subscribe((categories) => {
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
      productImage: new FormControl(null),
    });
    this.activatedRout.params.subscribe((params) => {
      this.currentId = +params['ID'];
      this.productService
        .GetProduct(+params['ID'])
        .subscribe((product: Product) => {
          this.productForm.patchValue({
            productName: product.name,
            productPrice: +product.price,
            productQuantity: +product.quantity,
            productCategory: product.category.categoryId,
          });
          this.isLoading = false;
          this.imgSrc = `${environment.apiBase}${product.imagePath}`;
        });
    });
  }
  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      if (this.productImage) {
        formData.append('Image', this.productImage, this.productImage.name);
      }
      formData.append('CategoryId', this.productForm.value.productCategory);
      formData.append('Name', this.productForm.value.productName);
      formData.append('Price', this.productForm.value.productPrice);
      formData.append('Quantity', this.productForm.value.productQuantity);
      this.productService
        .UpdateProduct(formData, this.currentId)
        .subscribe(() => {
          this.productForm.reset();
          this.router.navigate(['/Products']);
        });
    }
  }
  fileChange(event) {
    this.productImage = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event) => {
      this.imgSrc = event.target.result.toString();
    };
    reader.readAsDataURL(this.productImage);
  }
  Cancel() {
    this.router.navigate(['/Products']);
  }
}
