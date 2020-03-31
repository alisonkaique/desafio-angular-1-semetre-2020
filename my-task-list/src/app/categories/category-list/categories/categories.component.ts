import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from '../../category/category';
import { CategoryService } from '../../category/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnChanges {

  // inbound property
  @Input() categories: Category[] = [];
  rows = [];
  anchorClass = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.categories) {
      this.rows = this.groupColumns(this.categories);
    }
  }

  groupColumns(categories: Category[]): any[] {
    const newRows = [];

    for (let index = 0; index < categories.length; index += 3) {
      newRows.push(categories.slice(index, index + 3));
    }

    return newRows;
  }

}
