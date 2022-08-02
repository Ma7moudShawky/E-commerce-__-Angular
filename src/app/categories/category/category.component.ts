import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/Models/Category';
import { CategoryService } from 'src/app/Services/CategoryService';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  category: Category;
  isLoading: boolean = false;
  getCategorySubscribtion: Subscription;
  getIDSubscribtion: Subscription;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnDestroy(): void {
    this.getIDSubscribtion.unsubscribe();
    this.getCategorySubscribtion.unsubscribe();
  }

  ngOnInit(): void {
    let ID: Number;
    this.getIDSubscribtion = this.route.params.subscribe((params) => {
      this.isLoading = true;
      ID = +params['ID'];
      this.GetCategory(ID);
    });
  }

  GetCategory(ID: Number) {
    this.getCategorySubscribtion = this.categoryService
      .GetCategory(ID)
      .subscribe((category) => {
        this.category = category;
        this.isLoading = false;
      });
  }
}
