import { Component, Input, OnInit } from '@angular/core';

@Component({
        selector: 'app-category-card',
        templateUrl: './category-card.component.html',
        styleUrls: [
            './category-card.component.css'
        ]
})
export class CategoryCardComponent implements OnInit {
    @Input() categoryTitle = '';
    @Input() color = '';

    cardClass = 'po-text-center category-border';

    ngOnInit(): void {
        this.cardClass += ' category-' + this.color;
    }
}
