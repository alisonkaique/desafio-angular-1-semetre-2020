import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';

@Component({
    selector: 'app-task-footer',
    templateUrl: './task-footer.component.html'
})
export class TaskFooterComponent implements OnInit {

    user$: Observable<User>;

    constructor(private userService: UserService) {

    }

    ngOnInit(): void {
        this.user$ = this.userService.getUser();
    }
}