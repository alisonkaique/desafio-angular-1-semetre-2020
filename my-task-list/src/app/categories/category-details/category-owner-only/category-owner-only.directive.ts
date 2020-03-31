import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

import { Category } from '../../category/category';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector: '[categoryOwnerOnly]'
})
export class CategoryOwnerOnlyDirective implements OnInit {
    @Input() ownedCategory: Category;

    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer2,
        private userService: UserService
    ) {

    }

    ngOnInit(): void {
        this.userService
            .getUser()
            .subscribe(user => {
                if (!user || user.id != this.ownedCategory.userId) {
                    this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
                }
            });
    }
}
