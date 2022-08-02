import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/Models/Category';
import { CategoryService } from 'src/app/Services/CategoryService';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  categoryForm: FormGroup;
  oldCategory: Category;
  getCategoriesSubscribrion: Subscription;
  getCategorySubscribrion: Subscription;
  updateCategorySubscribrion: Subscription;

  constructor(
    private categoryService: CategoryService,
    private route: Router,
    private activeRout: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.getCategorySubscribrion.unsubscribe();
    if (this.updateCategorySubscribrion) {
      this.updateCategorySubscribrion.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      categoryName: new FormControl(null, Validators.required),
    });
    this.activeRout.params.subscribe((params) => {
      this.isLoading = true;
      this.getCategorySubscribrion = this.categoryService
        .GetCategory(params['ID'])
        .subscribe((category) => {
          this.oldCategory = category;
          this.categoryForm.patchValue({
            categoryName: this.oldCategory.categoryName,
          });
          this.isLoading = false;
        });
    });
  }
  onSubmit() {
    if (!this.categoryForm.valid) return;
    let updatedCategory: Category = {
      categoryId: this.oldCategory.categoryId,
      categoryName: this.categoryForm.value.categoryName,
    };
    this.updateCategorySubscribrion = this.categoryService
      .UpdateCategory(updatedCategory)
      .subscribe(() => {
        this.getCategoriesSubscribrion = this.categoryService
          .GetAllCategories()
          .subscribe((categories) => {
            this.categoryService.categories.next(categories);
          });
        this.route.navigate(['/Categories', updatedCategory.categoryId]);
      });
  }
}
