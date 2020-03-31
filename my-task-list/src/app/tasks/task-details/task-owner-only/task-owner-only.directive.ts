import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

import { Task } from '../../task/task';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector: '[taskOwnerOnly]'
})
export class TaskOwnerOnlyDirective implements OnInit {
    @Input() ownedTask: Task;

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
                if (!user || user.id != this.ownedTask.userId) {
                    this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
                }
            });
    }
}
