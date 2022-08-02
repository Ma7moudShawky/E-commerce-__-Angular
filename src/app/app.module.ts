import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './Categories/category/category.component';
import { HomeComponent } from './home/home.component';
import { AddCategoryComponent } from './categories/addcategory/addcategory.component';
import { CategoryService } from './Services/CategoryService';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { UpdateCategoryComponent } from './categories/update-category/update-category.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './Products/product/product.component';
import { AddProductComponent } from './Products/add-product/add-product.component';
import { UpdateProductComponent } from './Products/update-product/update-product.component';
import { ToHandleErrorInterceptor } from './Interceptors/to-handle-error.interceptor';
import { ErrorService } from './Services/ErrorService';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Product } from './Models/Product';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductService } from './Services/ProductService';

const appRouts: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'Categories',
    component: CategoriesComponent,
    children: [
      { path: 'New', component: AddCategoryComponent },
      { path: ':ID', component: CategoryComponent },
      { path: 'Edit/:ID', component: UpdateCategoryComponent },
    ],
  },
  {
    path: 'Products',
    component: ProductsComponent,
    children: [
      { path: '', component: ProductListComponent },
      { path: 'New', component: AddProductComponent },
      { path: ':ID', component: ProductComponent },
      { path: 'Edit/:ID', component: UpdateProductComponent },
    ],
  },
  { path: 'Not-Found', component: NotFoundComponent },
  { path: '**', redirectTo: '/Not-Found' },
];

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CategoryComponent,
    HomeComponent,
    AddCategoryComponent,
    LoadingSpinnerComponent,
    ErrorComponent,
    UpdateCategoryComponent,
    ProductsComponent,
    ProductComponent,
    AddProductComponent,
    UpdateProductComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRouts),
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    CategoryService,
    ProductService,
    ErrorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ToHandleErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
