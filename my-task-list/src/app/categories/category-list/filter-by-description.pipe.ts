import { Pipe, PipeTransform } from '@angular/core';

import { Category } from '../category/category';

@Pipe({ name: 'filterByDescription'})
export class FilterByDescription implements PipeTransform {

    transform(categories: Category[], descriptionQuery: string) {
        descriptionQuery = descriptionQuery
            .trim()
            .toLowerCase();

        if (descriptionQuery) {
            return categories
                    .filter(category =>
                        category.description.toLowerCase().includes(descriptionQuery)
                    );
        } else {
            return categories;
        }
    }

}