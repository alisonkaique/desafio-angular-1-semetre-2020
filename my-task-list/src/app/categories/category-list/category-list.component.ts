import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];
  filter = '';
  hasMore = true;
  currentPage = 1;
  userName = '';

  // Injeção de Dependência
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private categoryService: CategoryService
    ) {  }

  ngOnInit(): void {
    this.userName = this.userService.getUserName();
    this.categories = this.activatedRoute.snapshot.data['categories'];
  }

  load() {
    this.categoryService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(categories => {
        this.filter = '';
        this.categories = this.categories.concat(categories);

        if (!categories.length) { this.hasMore = false; }
      });
  }
}
