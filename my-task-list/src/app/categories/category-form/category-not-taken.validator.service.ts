import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

import { CategoryService } from '../category/category.service';

@Injectable()
export class CategoryNotTakenValidatorService {

    constructor(private categoryService: CategoryService) {

    }

    checkCategoryToken() {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(description => {
                    return this.categoryService.checkCategoryTaken(description);
                }))
                .pipe(map(isTaken => {
                    return isTaken ? { categoryTaken: true} : null;
                }))
                .pipe(first());
        }
    }
}
