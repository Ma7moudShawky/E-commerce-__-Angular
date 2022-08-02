import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../Models/Category';
import { CategoryService } from '../Services/CategoryService';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  categories: Category[] = [];
  getAllSubscribtion: Subscription;
  deleteSubscribtion: Subscription;
  categoriesChanged: Subscription;

  currentPage: number = 1;

  constructor(
    private categoryService: CategoryService,
    private route: Router
  ) {}

  ngOnDestroy(): void {
    this.getAllSubscribtion.unsubscribe();
    this.categoriesChanged.unsubscribe();
    this.deleteSubscribtion?.unsubscribe();
  }

  ngOnInit(): void {
    this.GetAllCategories();
    this.categoriesChanged = this.categoryService.categories.subscribe(
      (categories) => {
        this.categories = categories;
      }
    );
  }

  GetAllCategories() {
    this.isLoading = true;
    this.getAllSubscribtion = this.categoryService
      .GetAllCategories()
      .subscribe((respose) => {
        this.categories = respose;
        this.isLoading = false;
      });
  }

  Delete(id: Number) {
    this.deleteSubscribtion = this.categoryService
      .DeleteCategory(id)
      .subscribe(() => {
        this.GetAllCategories();
        if (this.GetCurrentid() == id) {
          this.route.navigate(['/Categories']);
        }
      });
  }
  GetCurrentid() {
    let url = this.route.url.split('/');
    let id = +url[url.length - 1];
    return id;
  }
  Edit(id: Number) {
    this.route.navigate(['Categories', 'Edit', id]);
  }
}
