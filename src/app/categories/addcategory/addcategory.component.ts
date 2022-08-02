import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/Models/Category';
import { CategoryService } from 'src/app/Services/CategoryService';

@Component({
  selector: 'app-add-category',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css'],
})
export class AddCategoryComponent implements OnInit {
  getCategoriesSubscribrion: Subscription;
  categoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      categoryName: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      let addedCategory: Category = {
        categoryName: this.categoryForm.value.categoryName,
      };

      this.categoryService.AddCategory(addedCategory).subscribe(() => {
        this.getCategoriesSubscribrion = this.categoryService
          .GetAllCategories()
          .subscribe((categories) => {
            this.categoryService.categories.next(categories);
          });
        this.categoryForm.reset();
      });
    }
  }
}
