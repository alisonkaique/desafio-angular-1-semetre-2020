import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/categories/category/category.service';

@Component({
        selector: 'app-task-card',
        templateUrl: './task-card.component.html',
        styleUrls: [
            './task-card.component.css'
        ]
})
export class TaskCardComponent implements OnInit {

    @Input() taskTitle = '';
    @Input() categoryId = 0;

    categoryColor: string;

    constructor(
        private categoryService: CategoryService
    ) {

    }

    cardClass = 'card border-light text-center category-border';

    ngOnInit(): void {

        this.categoryService
            .findById(this.categoryId)
                .subscribe(
                    (category) => {
                        this.categoryColor = category.color;
                        this.cardClass += ' category-' + this.categoryColor;
                    },
                    (err) => {
                        console.log(err);
                    }
                );
    }
}